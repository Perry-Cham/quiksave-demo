# Issue 14: Improve Error Recovery & Cleanup in API Routes

**Title:** Add Resource Cleanup & Transaction Handling in API Routes

**Problem:** API routes don't handle partial failures well:
- Image uploaded, but product creation fails → orphaned file in ImageKit
- ImageKit deletion fails, but product deletion succeeds → broken image reference
- No rollback mechanism for multi-step operations
- **SoC violation** - resource cleanup logic mixed with business logic

**Affected Files:**
- `app/api/(POST)/addproduct/[category]/route.ts`
- `app/api/(PATCH)/updateproduct/[category]/[id]/route.ts`
- `app/api/(DELETE)/deleteproduct/[category]/[id]/route.ts`
- `app/api/(DELETE)/deletecategory/[category]/route.ts`

**Goal:** Implement proper error recovery and resource cleanup.  

**Acceptance Criteria:**

- ✅ Image deletion succeeds even if product deletion fails
- ✅ Orphaned images are cleaned up on failure
- ✅ Transactions for multi-step operations
- ✅ Clear error messages if cleanup fails
- ✅ No hanging resources on errors
- ✅ Tests verify cleanup happens

**Recommended Implementation:**

```typescript
// lib/transaction.ts
export interface Transaction {
  execute<T>(fn: () => Promise<T>): Promise<T>;
  onRollback(fn: () => Promise<void>): Transaction;
  getFailedSteps(): string[];
}

class SimpleTransaction implements Transaction {
  private rollbackFunctions: Array<() => Promise<void>> = [];
  private failedSteps: string[] = [];

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      this.failedSteps.push(fn.name || 'unknown');
      await this.rollback();
      throw error;
    }
  }

  onRollback(fn: () => Promise<void>): Transaction {
    this.rollbackFunctions.push(fn);
    return this;
  }

  private async rollback() {
    console.log('Rolling back transaction, executing rollback functions...');
    for (const fn of this.rollbackFunctions.reverse()) {
      try {
        await fn();
      } catch (error) {
        console.error('Rollback failed:', error);
        // Continue with other rollbacks
      }
    }
  }

  getFailedSteps(): string[] {
    return this.failedSteps;
  }
}

export function createTransaction(): Transaction {
  return new SimpleTransaction();
}
```

Usage in API route:

```typescript
// app/api/(POST)/addproduct/[category]/route.ts
import { createTransaction } from '@/lib/transaction';
import { uploadImage, deleteImage } from '@/lib/imagekit';
import { Products } from '@/models/product-model';

export async function POST(request: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  const transaction = createTransaction();
  let uploadedImageId: string | null = null;

  try {
    const { category } = await params;
    const formData = await request.formData();

    // Validate input
    const productData = productSchema.parse({...});

    // Upload image and register rollback
    if (imageFile) {
      uploadedImageId = await transaction.execute(async () => {
        const imageData = await uploadImage(
          fileBuffer,
          imageFile.name,
          `/Quicksave/product_images/${category}`
        );
        return imageData.id;
      });

      // If product creation fails, delete the image
      transaction.onRollback(async () => {
        if (uploadedImageId) {
          await deleteImage(uploadedImageId);
        }
      });
    }

    // Create product
    const newProduct = await transaction.execute(async () => {
      return await Products.create({
        ...productData,
        imageId: uploadedImageId,
      });
    });

    return successResponse(newProduct, 201);
  } catch (error) {
    logger.error('Product creation failed', error, { 
      category: (await params).category,
      uploadedImageId,
    });
    return errorResponse(
      ErrorCodes.INTERNAL_ERROR,
      'Failed to create product',
      500
    );
  }
}
```

Another example for delete:

```typescript
// app/api/(DELETE)/deleteproduct/[category]/[id]/route.ts
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string; category: string }> }) {
  const transaction = createTransaction();

  try {
    const { id } = await params;

    // Find product
    const product = await Products.findById(id);
    if (!product) {
      return errorResponse(ErrorCodes.NOT_FOUND, 'Product not found', 404);
    }

    // Delete image first
    if (product.imageId) {
      transaction.onRollback(async () => {
        // Note: If image delete fails during rollback, product delete hasn't happened yet
        // so we can try again or alert admin
      });

      await transaction.execute(async () => {
        await deleteImage(product.imageId);
      });
    }

    // Delete product
    await transaction.execute(async () => {
      await Products.findByIdAndDelete(id);
    });

    return successResponse({ message: 'Product deleted' });
  } catch (error) {
    logger.error('Product deletion failed', error, { id: (await params).id });
    return errorResponse(
      ErrorCodes.INTERNAL_ERROR,
      'Failed to delete product',
      500
    );
  }
}
```

**Benefits:**
- No orphaned resources on failures
- Clear error recovery path
- Testable transaction logic
- Better debugging (know which step failed)
- Data consistency
