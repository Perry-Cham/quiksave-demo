# Issue 10: Add Rate Limiting & API Protection

**Title:** Implement Rate Limiting on Public and Mutation Endpoints

**Problem:** No rate limiting exists on any endpoints:
- Public endpoints can be scraped/DDoS'd
- Mutation endpoints (POST, PATCH, DELETE) can be abused
- Brute force attacks possible on auth endpoints
- No protection against spam product uploads

**Impact:**
- Security risk (DDoS vulnerability)
- Unfair resource usage
- **SOLID Single Responsibility** - endpoints don't validate request frequency

**Affected Files:**
- All API routes

**Goal:** Implement rate limiting using Redis or in-memory store.

**Acceptance Criteria:**

- ✅ Create `lib/rate-limiter.ts` with rate limiting
- ✅ Different limits for authenticated vs public users
- ✅ `GET` endpoints: 100 req/minute per IP
- ✅ `POST` endpoints: 10 req/minute per IP (unauthenticated), 30 req/minute per user (authenticated)
- ✅ `PATCH/DELETE` endpoints: 10 req/minute per user (authenticated)
- ✅ Auth endpoints: 5 failed attempts per IP per 15 minutes
- ✅ Clear rate limit headers in response
- ✅ Return `429 Too Many Requests` when limited

**Recommended Implementation:**

```typescript
// lib/rate-limiter.ts
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

class InMemoryRateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private readonly maxRetries: Map<string, number> = new Map();

  isAllowed(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const entry = this.store.get(key);

    // Entry doesn't exist or window expired
    if (!entry || now > entry.resetAt) {
      this.store.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }

    // Under limit
    if (entry.count < limit) {
      entry.count++;
      return true;
    }

    // Over limit
    return false;
  }

  getRemainingRequests(key: string, limit: number): number {
    const entry = this.store.get(key);
    if (!entry || Date.now() > entry.resetAt) {
      return limit;
    }
    return Math.max(0, limit - entry.count);
  }

  getResetTime(key: string): number | null {
    const entry = this.store.get(key);
    return entry?.resetAt ?? null;
  }

  // Cleanup old entries every 5 minutes
  private startCleanup() {
    setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.store.entries()) {
        if (now > entry.resetAt) {
          this.store.delete(key);
        }
      }
    }, 5 * 60 * 1000);
  }

  constructor() {
    this.startCleanup();
  }
}

const limiter = new InMemoryRateLimiter();

export interface RateLimitConfig {
  limit: number;
  windowMs: number;
}

export const RATE_LIMITS = {
  GET_PUBLIC: { limit: 100, windowMs: 60 * 1000 },
  GET_AUTHENTICATED: { limit: 200, windowMs: 60 * 1000 },
  POST_PUBLIC: { limit: 5, windowMs: 60 * 1000 },
  POST_AUTHENTICATED: { limit: 30, windowMs: 60 * 1000 },
  MUTATION_AUTHENTICATED: { limit: 10, windowMs: 60 * 1000 },
  AUTH_SIGNUP: { limit: 3, windowMs: 60 * 1000 },
  AUTH_SIGNIN: { limit: 5, windowMs: 15 * 60 * 1000 },
};

export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetAt: number | null } {
  const allowed = limiter.isAllowed(key, config.limit, config.windowMs);
  const remaining = limiter.getRemainingRequests(key, config.limit);
  const resetAt = limiter.getResetTime(key);

  return { allowed, remaining, resetAt };
}
```

Middleware wrapper:

```typescript
// lib/api-rate-limit.ts
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, RateLimitConfig } from '@/lib/rate-limiter';

export function withRateLimit(config: RateLimitConfig) {
  return async (handler: (req: NextRequest, ctx: any) => Promise<NextResponse>) => {
    return (req: NextRequest, ctx: any) => {
      const ip = req.headers.get('x-forwarded-for') || 'unknown';
      const { allowed, remaining, resetAt } = checkRateLimit(ip, config);

      if (!allowed) {
        return NextResponse.json(
          { error: 'Too many requests, please try again later' },
          {
            status: 429,
            headers: {
              'Retry-After': resetAt ? Math.ceil((resetAt - Date.now()) / 1000) : '60',
              'X-RateLimit-Limit': String(config.limit),
              'X-RateLimit-Remaining': String(0),
            },
          }
        );
      }

      const response = await handler(req, ctx);
      response.headers.set('X-RateLimit-Limit', String(config.limit));
      response.headers.set('X-RateLimit-Remaining', String(remaining));
      if (resetAt) {
        response.headers.set('X-RateLimit-Reset', String(Math.ceil(resetAt / 1000)));
      }

      return response;
    };
  };
}
```

Usage in API route:

```typescript
// app/api/(POST)/addproduct/[category]/route.ts
import { withRateLimit, RATE_LIMITS } from '@/lib/api-rate-limit';

const postHandler = withRateLimit(RATE_LIMITS.POST_AUTHENTICATED)(
  async (request, { params }) => {
    // ... existing logic
  }
);

export const POST = postHandler;
```

**Benefits:**
- Protects against abuse and DDoS
- Separate limits for different user types
- Clear feedback to clients (retry-after header)
- Lightweight (no external dependency)
- Easy to adjust limits
