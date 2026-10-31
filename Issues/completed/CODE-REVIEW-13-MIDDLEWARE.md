# Issue 13: Add Request/Response Validation Middleware

**Title:** Create Middleware for Request/Response Schema Validation

**Problem:** No centralized way to validate API responses. Response shape isn't enforced:
- Frontend doesn't know expected response format
- Response shapes vary between endpoints
- No way to validate before sending
- **SoC violation** - validation mixed with business logic

**Impact:**
- Frontend integration errors
- Breaking changes not caught
- Inconsistent error handling
- Type mismatch between client and server

**Goal:** Create middleware that validates requests/responses against schemas.

**Acceptance Criteria:**

- ✅ Create `lib/api-middleware.ts` with validation wrapper
- ✅ All requests validated before handler runs
- ✅ All responses validated before sending
- ✅ Validation errors return detailed message
- ✅ Middleware is reusable across all routes
- ✅ Swagger/OpenAPI documentation available
- ✅ Type-safe request/response handling

**Recommended Implementation:**

```typescript
// lib/api-middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { z, ZodSchema } from 'zod';

interface ApiHandlerOptions {
  requestSchema?: ZodSchema;
  responseSchema?: ZodSchema;
  requireAuth?: boolean;
}

export function withValidation(options: ApiHandlerOptions) {
  return (handler: (data: any, ctx: any) => Promise<any>) => {
    return async (request: NextRequest, context: any) => {
      const requestId = crypto.randomUUID();

      try {
        // Validate request if schema provided
        let validatedData = null;
        if (options.requestSchema) {
          const body = request.method !== 'GET' 
            ? await request.json().catch(() => ({}))
            : {};

          const validation = options.requestSchema.safeParse(body);
          if (!validation.success) {
            return NextResponse.json(
              {
                success: false,
                error: {
                  code: 'VALIDATION_ERROR',
                  message: 'Invalid request',
                  details: validation.error.errors,
                },
                requestId,
              },
              { status: 400 }
            );
          }
          validatedData = validation.data;
        }

        // Validate response if schema provided
        let response = await handler(validatedData, context);

        if (options.responseSchema && response instanceof NextResponse) {
          const responseBody = await response.json();
          const validation = options.responseSchema.safeParse(responseBody);
          if (!validation.success) {
            console.error('Response validation failed:', validation.error);
            // In development, fail loudly
            if (process.env.NODE_ENV === 'development') {
              return NextResponse.json(
                {
                  success: false,
                  error: {
                    code: 'RESPONSE_VALIDATION_ERROR',
                    message: 'Server response validation failed',
                    details: validation.error.errors,
                  },
                },
                { status: 500 }
              );
            }
          }
        }

        return response;
      } catch (error) {
        console.error(`[${requestId}] API Error:`, error);
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'INTERNAL_ERROR',
              message: 'Internal server error',
            },
            requestId,
          },
          { status: 500 }
        );
      }
    };
  };
}
```

Define schemas:

```typescript
// schemas/product.ts
import { z } from 'zod';

export const createProductRequestSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().positive(),
  subcategory: z.string().min(1),
  category: z.string().min(1),
});

export const createProductResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    _id: z.string(),
    name: z.string(),
    price: z.number(),
    category: z.string(),
  }),
  timestamp: z.string().datetime(),
});

export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.any().optional(),
  }),
  requestId: z.string().optional(),
  timestamp: z.string().datetime(),
});
```

Usage in route:

```typescript
// app/api/(POST)/addproduct/[category]/route.ts
import { withValidation } from '@/lib/api-middleware';
import { createProductRequestSchema, createProductResponseSchema } from '@/schemas/product';

const handler = async (validatedData: any, { params }: any) => {
  const { category } = await params;
  
  // validatedData is already validated
  const newProduct = await Products.create({
    ...validatedData,
    category,
  });

  return NextResponse.json({
    success: true,
    data: newProduct,
    timestamp: new Date().toISOString(),
  });
};

export const POST = withValidation({
  requestSchema: createProductRequestSchema,
  responseSchema: createProductResponseSchema,
  requireAuth: true,
})(handler);
```

**Benefits:**
- Type-safe request/response handling
- Validation errors caught early
- Consistent response format
- Self-documenting schemas
- Easy to generate OpenAPI docs
