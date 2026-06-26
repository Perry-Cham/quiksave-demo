# Issue 6: Create Reusable Error Handling & Response Formatting Utilities

**Title:** Standardize Error Handling & API Response Format Across All Routes

**Problem:** Each API route has inconsistent error handling and response formats:
- Some return `{ error: string }`
- Some return `{ message: string }`
- Error logging is inconsistent
- No structured error responses
- Violates **Clean Code** and **SoC** principles

**Impact:**
- Difficult for frontend to handle errors consistently
- Poor debugging (generic error messages)
- Code duplication in error handling
- Inconsistent HTTP status codes

**Affected Files:**
- All files in `app/api/`

**Goal:** Create centralized error handling and response utilities.

**Acceptance Criteria:**

- ✅ Create `lib/api-response.ts` with utility functions
- ✅ All successful responses follow same format
- ✅ All error responses follow same format with error codes
- ✅ Request/response logging middleware is created
- ✅ Errors are logged with context (user ID, request ID)
- ✅ Client receives helpful error messages
- ✅ Server logs contain full error details

**Recommended Implementation:**

```typescript
// lib/api-response.ts
import { NextResponse } from 'next/server';

export interface ApiSuccess<T> {
  success: true;
  data: T;
  timestamp: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  timestamp: string;
  requestId?: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export function successResponse<T>(data: T, status = 200): NextResponse<ApiSuccess<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

export function errorResponse(
  code: string,
  message: string,
  status = 500,
  details?: Record<string, any>,
  requestId?: string
): NextResponse<ApiError> {
  return NextResponse.json(
    {
      success: false,
      error: { code, message, details },
      timestamp: new Date().toISOString(),
      requestId,
    },
    { status }
  );
}

export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  CONFLICT: 'CONFLICT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
};

export class ApiErrorException extends Error {
  constructor(
    public code: string,
    public message: string,
    public status: number = 500,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiErrorException';
  }
}
```

Usage in route:

```typescript
// app/api/(POST)/addproduct/[category]/route.ts
import { successResponse, errorResponse, ErrorCodes, ApiErrorException } from '@/lib/api-response';
import { productSchema } from '@/lib/validation';
import { z } from 'zod';

export async function POST(request: Request, { params }: { params: Promise<{ category: string }> }) {
  const requestId = crypto.randomUUID();

  try {
    const { category } = await params;
    const formData = await request.formData();

    // Validate input
    const productData = productSchema.parse({
      name: formData.get('name'),
      price: parseFloat(formData.get('price') as string),
      subcategory: formData.get('subcategory'),
      category,
    });

    // Create product...
    const newProduct = await Products.create(productData);

    return successResponse(newProduct, 201);
  } catch (error) {
    console.error(`[${requestId}] Error in POST /addproduct:`, error);

    if (error instanceof z.ZodError) {
      return errorResponse(
        ErrorCodes.VALIDATION_ERROR,
        'Invalid request data',
        400,
        { errors: error.errors },
        requestId
      );
    }

    if (error instanceof ApiErrorException) {
      return errorResponse(error.code, error.message, error.status, error.details, requestId);
    }

    return errorResponse(
      ErrorCodes.INTERNAL_ERROR,
      'An unexpected error occurred',
      500,
      {},
      requestId
    );
  }
}
```

**Benefits:**
- Consistent response format across API
- Better error messages for debugging
- Request ID tracking for logging
- Type-safe error handling
- Easier frontend integration
