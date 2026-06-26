# Issue 3: Implement Server-Side Input Validation & Sanitization

**Title:** Add Comprehensive Server-Side Validation for All API Endpoints

**Problem:** API routes lack server-side validation. Client-side Zod schemas exist only in `LoginForm`, but no validation occurs on the server. This creates security vulnerabilities and inconsistent data in the database.

**Impact:**
- SQL/NoSQL injection risks (though mitigated by Mongoose, still bad practice)
- Invalid data stored in database (negative prices, empty names, oversized files)
- Inconsistent error messages to clients
- Violates **Clean Code** principle (implicit assumptions about data validity)

**Affected Files:**
- `app/api/(POST)/addproduct/[category]/route.ts`
- `app/api/(POST)/addcategory/route.ts`
- `app/api/(PATCH)/updateproduct/[category]/[id]/route.ts`
- `app/api/(PATCH)/categories/[category]/route.ts`
- `app/api/(DELETE)/deleteproduct/[category]/[id]/route.ts`
- `app/api/(DELETE)/deletecategory/[category]/route.ts`

**Goal:** Create Zod schemas for all inputs and validate at the API boundary.

**Acceptance Criteria:**

- ✅ Create `lib/validation.ts` with Zod schemas
- ✅ All POST endpoints validate input before processing
- ✅ All PATCH endpoints validate input before processing
- ✅ Invalid requests return `400 Bad Request` with clear error messages
- ✅ File uploads are validated (size, type)
- ✅ Price and numeric fields are validated as positive numbers
- ✅ Category names are validated against allowed categories

**Recommended Implementation:**

```typescript
// lib/validation.ts
import { z } from 'zod';
import { ProductCategory } from '@/types/api';

export const ALLOWED_CATEGORIES: ProductCategory[] = ['beef', 'pork', 'processed', 'chicken'];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const productSchema = z.object({
  name: z.string()
    .min(1, 'Product name is required')
    .max(100, 'Product name must not exceed 100 characters')
    .trim(),
  price: z.number()
    .positive('Price must be greater than 0')
    .finite('Price must be a valid number')
    .multipleOf(0.01, 'Price must have at most 2 decimal places'),
  subcategory: z.string()
    .min(1, 'Subcategory is required')
    .max(100, 'Subcategory must not exceed 100 characters')
    .trim(),
  category: z.enum(ALLOWED_CATEGORIES as [ProductCategory, ...ProductCategory[]]),
});

export const categorySchema = z.object({
  category: z.enum(ALLOWED_CATEGORIES as [ProductCategory, ...ProductCategory[]]),
  content: z.string()
    .max(1000, 'Category description must not exceed 1000 characters')
    .optional()
    .default(''),
});

export const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: `File size must not exceed ${MAX_FILE_SIZE / 1024 / 1024}MB`,
  })
  .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), {
    message: `File type must be one of: ${ALLOWED_FILE_TYPES.join(', ')}`,
  })
  .optional();

export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
```

Usage in route:

```typescript
// app/api/(POST)/addproduct/[category]/route.ts
import { productSchema, fileSchema } from '@/lib/validation';

export async function POST(request: Request, { params }: { params: Promise<{ category: string }> }) {
  const formData = await request.formData();
  const { category } = await params;

  try {
    // Validate form data
    const productData = productSchema.parse({
      name: formData.get('name'),
      price: parseFloat(formData.get('price') as string),
      subcategory: formData.get('subcategory'),
      category,
    });

    // Validate optional file
    const imageFile = formData.get('imageFile') as File | null;
    if (imageFile) {
      await fileSchema.parseAsync(imageFile);
    }

    // ... rest of logic
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.errors.map(e => ({ path: e.path.join('.'), message: e.message })) },
        { status: 400 }
      );
    }
    throw error;
  }
}
```

**Notes:**
- Validate at the API boundary, not in components
- Use consistent validation schemas across routes
- Return detailed error messages for debugging
- Sanitize file names before storing
