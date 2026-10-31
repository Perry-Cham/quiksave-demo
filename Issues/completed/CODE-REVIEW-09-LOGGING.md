# Issue 9: Add Comprehensive Logging & Request Tracing

**Title:** Implement Structured Logging & Request Tracing

**Problem:** Logging is inconsistent and unstructured:
- `console.log()` scattered throughout without context
- No request IDs for tracing
- No log levels (info, warn, error)
- No timestamps in logs
- Difficult to debug production issues
- **SoC violation** - logging mixed with business logic

**Affected Files:**
- All API route files
- `lib/auth.ts`
- `lib/client-helper-functions.ts`

**Goal:** Create a centralized logging module with request context and structured output.

**Acceptance Criteria:**

- ✅ Create `lib/logger.ts` with structured logging
- ✅ All console logs replaced with logger calls
- ✅ Request ID middleware created for API tracing
- ✅ Log levels: debug, info, warn, error
- ✅ Sensitive data (passwords, tokens) never logged
- ✅ Production logs are JSON-formatted for easy parsing
- ✅ Each API response includes request ID

**Recommended Implementation:**

```typescript
// lib/logger.ts
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  requestId?: string;
  userId?: string;
  [key: string]: any;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV !== 'production';

  private formatMessage(level: LogLevel, message: string, context: LogContext) {
    const timestamp = new Date().toISOString();

    if (this.isDevelopment) {
      // Human-readable format for development
      const ctxStr = Object.keys(context).length > 0 ? JSON.stringify(context) : '';
      return `[${timestamp}] [${level.toUpperCase()}] ${message} ${ctxStr}`;
    }

    // JSON format for production (easy to parse/ingest)
    return JSON.stringify({
      timestamp,
      level: level.toUpperCase(),
      message,
      ...context,
    });
  }

  debug(message: string, context: LogContext = {}) {
    console.debug(this.formatMessage('debug', message, context));
  }

  info(message: string, context: LogContext = {}) {
    console.info(this.formatMessage('info', message, context));
  }

  warn(message: string, context: LogContext = {}) {
    console.warn(this.formatMessage('warn', message, context));
  }

  error(message: string, error?: Error | unknown, context: LogContext = {}) {
    const errorContext = {
      ...context,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    };

    console.error(this.formatMessage('error', message, errorContext));
  }
}

export const logger = new Logger();
```

Middleware for request tracing:

```typescript
// lib/api-middleware.ts
import { NextRequest } from 'next/server';

export function getRequestId(request: NextRequest): string {
  // Use x-request-id header if provided, otherwise generate
  return (request.headers.get('x-request-id') as string) || crypto.randomUUID();
}

export function getRequestContext(request: NextRequest) {
  return {
    requestId: getRequestId(request),
    method: request.method,
    path: request.nextUrl.pathname,
  };
}
```

Usage in API route:

```typescript
// app/api/(POST)/addproduct/[category]/route.ts
import { logger } from '@/lib/logger';
import { getRequestContext } from '@/lib/api-middleware';

export async function POST(request: NextRequest, { params }: { params: Promise<{ category: string }> }) {
  const context = getRequestContext(request);

  try {
    logger.info('Product creation request received', context);
    
    const { category } = await params;
    const formData = await request.formData();

    logger.debug('Form data received', { ...context, fields: Array.from(formData.keys()) });

    // ... validation and logic

    logger.info('Product created successfully', { 
      ...context, 
      productId: newProduct._id,
      category,
    });

    return successResponse(newProduct, 201);
  } catch (error) {
    logger.error('Failed to create product', error, context);
    return errorResponse(
      ErrorCodes.INTERNAL_ERROR,
      'Internal server error',
      500,
      {},
      context.requestId
    );
  }
}
```

**Benefits:**
- Structured, searchable logs
- Request tracing for debugging
- Log levels for filtering
- Consistent format across all code
- Sensitive data protection
- Better observability
