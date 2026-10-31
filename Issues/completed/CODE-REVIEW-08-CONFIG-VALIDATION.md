# Issue 8: Add Environment Variable Validation & Configuration Management

**Title:** Validate Environment Variables at Application Startup

**Problem:** Environment variables are accessed directly without validation:
- `process.env.MONGO_URI!` - silent non-null assertion
- `process.env.IMAGEKIT_PRIVATE_KEY` - undefined might not cause immediate errors
- Missing configuration variables cause runtime errors, not startup errors
- No centralized configuration management

**Impact:**
- Silent failures (only caught when feature is used)
- Difficult to debug deployment issues
- Poor developer experience
- **SoC violation** - configuration scattered across files

**Affected Files:**
- `lib/auth.ts`
- `lib/db.ts` (proposed)
- `lib/imagekit.ts` (proposed)
- All API routes

**Goal:** Create a validated configuration module that loads and validates all env vars at startup.

**Acceptance Criteria:**

- ✅ Create `lib/config.ts` with centralized config validation
- ✅ Validate all required env vars exist on app startup
- ✅ Throw clear error messages if validation fails
- ✅ Support optional env vars with defaults
- ✅ Export typed configuration object
- ✅ No scattered `process.env` calls in code

**Recommended Implementation:**

```typescript
// lib/config.ts
import { z } from 'zod';

const configSchema = z.object({
  // Database
  mongoUri: z.string().url().min(1, 'MONGO_URI is required'),

  // ImageKit
  imagekitPrivateKey: z.string().min(1, 'IMAGEKIT_PRIVATE_KEY is required'),

  // Authentication
  betterAuthSecret: z.string().optional().default('fallback-secret'),

  // Application
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  isDevelopment: z.boolean().default(true),
});

export type Config = z.infer<typeof configSchema>;

let config: Config | null = null;

export function loadConfig(): Config {
  if (config) {
    return config;
  }

  try {
    const raw = {
      mongoUri: process.env.MONGO_URI,
      imagekitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      betterAuthSecret: process.env.BETTER_AUTH_SECRET,
      nodeEnv: process.env.NODE_ENV,
      isDevelopment: process.env.NODE_ENV !== 'production',
    };

    config = configSchema.parse(raw);
    return config;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map((e) => `${e.path.join('.')}: ${e.message}`)
        .join('\n');
      
      throw new Error(`Invalid environment configuration:\n${missingVars}`);
    }
    throw error;
  }
}

export function getConfig(): Config {
  if (!config) {
    throw new Error('Configuration not loaded. Call loadConfig() first.');
  }
  return config;
}
```

Usage in entry point:

```typescript
// app/layout.tsx or a new lib/init.ts
import { loadConfig } from '@/lib/config';

// Load config at startup
try {
  loadConfig();
  console.log('Configuration loaded successfully');
} catch (error) {
  console.error('Failed to load configuration:', error);
  process.exit(1);
}
```

Usage in modules:

```typescript
// lib/db.ts
import { getConfig } from '@/lib/config';

export async function connectDB() {
  const config = getConfig();
  // Use config.mongoUri instead of process.env.MONGO_URI!
}

// lib/imagekit.ts
import { getConfig } from '@/lib/config';

export function getImageKit() {
  const config = getConfig();
  // Use config.imagekitPrivateKey
}
```

**Benefits:**
- Fail fast on startup with clear error messages
- Type-safe configuration
- Single source of truth
- Easier to manage different environments
- Better for Docker/Kubernetes deployments
