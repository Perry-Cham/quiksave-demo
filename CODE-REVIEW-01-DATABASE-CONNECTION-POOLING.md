# Issue 1: Implement Database Connection Pooling

**Title:** Implement Database Connection Pooling & Centralize MongoDB Connection Management

**Problem:** Every API route independently calls `mongoose.connect()` on each request, creating redundant connection overhead and potential connection pool exhaustion. This violates **DRY** (Don't Repeat Yourself) and **SoC** (Separation of Concerns) principles.

**Impact:**
- Performance degradation due to repeated connection initialization
- Connection pool exhaustion risk under high load
- Inconsistent error handling across routes
- Difficulty maintaining consistent connection strategy

**Affected Files:**
- `app/api/(GET)/categories/route.ts` // 
- `app/api/(GET)/categories/[category]/route.ts`
- `app/api/(GET)/getproducts/[category]/route.ts`
- `app/api/(POST)/addproduct/[category]/route.ts`
- `app/api/(PATCH)/updateproduct/[category]/[id]/route.ts`
- `app/api/(DELETE)/deleteproduct/[category]/[id]/route.ts`
- `app/api/(DELETE)/deletecategory/[category]/route.ts`
- `lib/client-helper-functions.ts`

**Goal:** Create a centralized database connection module that reuses mongoose connections and follows Node.js best practices.

**Acceptance Criteria:**

- ✅ Create `lib/db.ts` with singleton connection pattern
- ✅ Remove all `mongoose.connect()` calls from API routes
- ✅ Implement connection pooling with proper error handling
- ✅ All API routes use the centralized connection
- ✅ Tests confirm connections are reused (not recreated per request)
- ✅ Environment variable `MONGO_URI` is validated at startup

**Recommended Implementation:**

```typescript
// lib/db.ts
import mongoose from 'mongoose';

let cachedConnection: typeof mongoose | null = null;

export async function connectDB() {
  if (cachedConnection) {
    console.log('Using cached connection');
    return cachedConnection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is not defined');
  }

  try {
    cachedConnection = await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    return cachedConnection;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function disconnectDB() {
  if (cachedConnection) {
    await mongoose.disconnect();
    cachedConnection = null;
  }
}
```

Then update each route:

```typescript
// Before
await mongoose.connect(process.env.MONGO_URI!);

// After
import { connectDB } from '@/lib/db';
await connectDB();
```

**References:** [Mongoose Connection Pooling](https://mongoosejs.com/docs/connections.html)
