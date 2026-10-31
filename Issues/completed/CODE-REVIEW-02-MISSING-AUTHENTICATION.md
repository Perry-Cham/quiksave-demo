# Issue 2: Add Authentication & Authorization to Protected API Routes

**Title:** Enforce Authentication on All Mutation Endpoints (Create, Update, Delete)

**Problem:** All `POST`, `PATCH`, and `DELETE` endpoints lack authentication checks, allowing unauthorized users to modify products and categories. The application uses `better-auth` but doesn't protect API routes.

**Impact (Security Risk - HIGH):**
- Anyone can create, update, or delete products
- Anyone can modify category content
- No audit trail of who changed what
- Violates **SOLID Single Responsibility** principle (routes don't validate auth)

**Affected Files:**
- `app/api/(POST)/addproduct/[category]/route.ts`
- `app/api/(POST)/addcategory/route.ts`
- `app/api/(PATCH)/updateproduct/[category]/[id]/route.ts`
- `app/api/(PATCH)/categories/[category]/route.ts` (PATCH handler)
- `app/api/(DELETE)/deleteproduct/[category]/[id]/route.ts`
- `app/api/(DELETE)/deletecategory/[category]/route.ts`

**Goal:** Create an authentication middleware and apply it to all mutation endpoints. Keep `GET` endpoints public for read access.

**Acceptance Criteria:**

- ✅ Create `lib/auth-middleware.ts` with auth verification
- ✅ All `POST` routes require authenticated users
- ✅ All `PATCH` routes require authenticated users
- ✅ All `DELETE` routes require authenticated users
- ✅ `GET` routes remain public
- ✅ Unauthorized requests return `401 Unauthorized`
- ✅ Forbidden requests return `403 Forbidden`
- ✅ Auth user ID is logged for audit trail

**Recommended Implementation:**

```typescript
// lib/auth-middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function verifyAuth(request: NextRequest) {
  try {
    // Extract session from better-auth
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session?.user) {
      return {
        authenticated: false,
        user: null,
        error: NextResponse.json(
          { error: 'Unauthorized: Authentication required' },
          { status: 401 }
        ),
      };
    }

    return {
      authenticated: true,
      user: session.user,
      error: null,
    };
  } catch (error) {
    console.error('Auth verification failed:', error);
    return {
      authenticated: false,
      user: null,
      error: NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      ),
    };
  }
}
```

Usage in route:

```typescript
// app/api/(POST)/addproduct/[category]/route.ts
import { verifyAuth } from '@/lib/auth-middleware';

export async function POST(request: Request, { params }: { params: Promise<{ category: string }> }) {
  const { authenticated, user, error } = await verifyAuth(request as NextRequest);
  
  if (!authenticated) {
    return error;
  }

  // ... rest of logic
  console.log(`Product created by user: ${user?.id}`);
}
```

**Security Notes:**
- Use `request.headers` to pass authentication context to `better-auth`
- Log all mutations with user ID for audit purposes
- Consider role-based access control (RBAC) for admin-only operations
- Validate CSRF tokens if accepting form submissions
