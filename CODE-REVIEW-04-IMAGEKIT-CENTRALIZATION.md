# Issue 4: Centralize ImageKit Configuration & Error Handling

**Title:** Extract & Centralize ImageKit Client Configuration

**Problem:** `ImageKit` client is instantiated in multiple route files with the same configuration pattern. This violates **DRY** and **SoC** principles, making it hard to:
- Update configuration in one place
- Handle errors consistently
- Test image operations  

**Affected Files:**
- `app/api/(POST)/addproduct/[category]/route.ts`
- `app/api/(PATCH)/updateproduct/[category]/[id]/route.ts`
- `app/api/(DELETE)/deleteproduct/[category]/[id]/route.ts`
- `app/api/(DELETE)/deletecategory/[category]/route.ts`

**Goal:** Create a centralized ImageKit service module with consistent error handling.

**Acceptance Criteria:**

- ✅ Create `lib/imagekit.ts` with ImageKit singleton
- ✅ Environment variable `IMAGEKIT_PRIVATE_KEY` is validated at startup
- ✅ All image operations go through this module
- ✅ Upload, delete, and error handling are consistent
- ✅ Proper error logging without exposing sensitive data
- ✅ Graceful degradation if ImageKit fails (product still saved, but without image)

**Recommended Implementation:**

```typescript
// lib/imagekit.ts
import ImageKit from '@imagekit/nodejs';

let imagekitInstance: ImageKit | null = null;

export function getImageKit(): ImageKit {
  if (!imagekitInstance) {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    
    if (!privateKey) {
      throw new Error('IMAGEKIT_PRIVATE_KEY environment variable is not defined');
    }

    imagekitInstance = new ImageKit({ privateKey });
  }

  return imagekitInstance;
}

export async function uploadImage(
  fileBuffer: Buffer,
  fileName: string,
  folder: string
): Promise<{ url: string; id: string }> {
  const imagekit = getImageKit();
  
  try {
    const fileString = fileBuffer.toString('base64');
    const response = await imagekit.files.upload({
      file: fileString,
      fileName: sanitizeFileName(fileName),
      folder,
    });

    return {
      url: response.url,
      id: response.fileId,
    };
  } catch (error) {
    console.error('ImageKit upload failed:', error);
    throw new Error('Failed to upload image');
  }
}

export async function deleteImage(fileId: string): Promise<void> {
  const imagekit = getImageKit();

  try {
    await imagekit.files.delete(fileId);
  } catch (error) {
    // Log but don't throw - image deletion is non-critical
    console.error('ImageKit delete failed for file:', fileId, error);
  }
}

function sanitizeFileName(fileName: string): string {
  // Remove path separators and special characters
  return fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
}
```

Usage in route:

```typescript
// Before
const uploadResponse = await imagekit.files.upload({
  file: fileString,
  fileName: imageFile.name,
  folder: `/Quicksave/product_images/${category}`,
});
imageData.url = uploadResponse.url as string;
imageData.id = uploadResponse.fileId as string;

// After
import { uploadImage, deleteImage } from '@/lib/imagekit';

const imageData = await uploadImage(fileBuffer, imageFile.name, `/Quicksave/product_images/${category}`);
```

**Benefits:**
- Single point of configuration
- Consistent error handling
- Easier to mock in tests
- Sanitizes file names automatically
- Type-safe responses
