# Issue 12: Add Unit & Integration Tests

**Title:** Establish Testing Infrastructure & Add Comprehensive Tests

**Problem:** No test files exist in the project:
- No unit tests for utilities
- No integration tests for API routes
- No component tests for React components
- Changes can't be validated before deployment
- **SOLID Open/Closed** - untested code is risky to modify

**Impact:**
- Regression risk (changes break existing functionality)
- Poor code quality validation
- Difficult to refactor safely
- Documentation via tests missing

**Goal:** Set up testing infrastructure and create comprehensive test suites.

**Acceptance Criteria:**

- ✅ Install testing dependencies (Jest, React Testing Library)
- ✅ Create `__tests__` directories with test files
- ✅ Test all utility functions in `lib/`
- ✅ Test API routes (happy path + error cases)
- ✅ Test React components
- ✅ Achieve >80% code coverage on critical paths
- ✅ GitHub Actions CI runs tests on PR
- ✅ All tests pass before merge

**Setup Steps:**

```bash
# Install dependencies
pnpm add -D jest @testing-library/react @testing-library/jest-dom @types/jest ts-jest
```

Create `jest.config.js`:

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/__tests__/**/*.test.tsx',
  ],
}

module.exports = createJestConfig(customJestConfig)
```

Create `jest.setup.js`:

```javascript
import '@testing-library/jest-dom'
```

**Example Test Files:**

```typescript
// lib/__tests__/api-model-helper.test.ts
import { findCategory } from '@/lib/api-model-helper';

describe('api-model-helper', () => {
  describe('findCategory', () => {
    it('should find valid category', () => {
      expect(findCategory('beef')).toBe('beef');
    });

    it('should find category case-insensitively', () => {
      expect(findCategory('BEEF')).toBe('beef');
      expect(findCategory('BeEf')).toBe('beef');
    });

    it('should return undefined for invalid category', () => {
      expect(findCategory('invalid')).toBeUndefined();
    });

    it('should return undefined for non-string input', () => {
      expect(findCategory(123 as any)).toBeUndefined();
    });
  });
});
```

```typescript
// lib/__tests__/validation.test.ts
import { productSchema } from '@/lib/validation';
import { z } from 'zod';

describe('validation', () => {
  describe('productSchema', () => {
    it('should validate correct product data', () => {
      const data = {
        name: 'Prime Beef',
        price: 29.99,
        subcategory: 'Ribeye',
        category: 'beef',
      };

      expect(() => productSchema.parse(data)).not.toThrow();
    });

    it('should reject negative price', () => {
      const data = {
        name: 'Prime Beef',
        price: -10,
        subcategory: 'Ribeye',
        category: 'beef',
      };

      expect(() => productSchema.parse(data)).toThrow(z.ZodError);
    });

    it('should reject empty name', () => {
      const data = {
        name: '',
        price: 29.99,
        subcategory: 'Ribeye',
        category: 'beef',
      };

      expect(() => productSchema.parse(data)).toThrow(z.ZodError);
    });
  });
});
```

```typescript
// app/api/(POST)/addproduct/__tests__/route.test.ts
import { POST } from '../route';
import { connectDB } from '@/lib/db';
import { Products } from '@/models/product-model';
import { NextRequest } from 'next/server';

jest.mock('@/lib/db');
jest.mock('@/models/product-model');
jest.mock('@/lib/imagekit');

describe('POST /api/addproduct/[category]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if not authenticated', async () => {
    const request = new NextRequest('http://localhost:3000/api/addproduct/beef', {
      method: 'POST',
    });

    // Mock unauthenticated request
    const response = await POST(request, { params: Promise.resolve({ category: 'beef' }) });
    expect(response.status).toBe(401);
  });

  it('should create product with valid data', async () => {
    // Mock authenticated request
    const formData = new FormData();
    formData.append('name', 'Prime Beef');
    formData.append('price', '29.99');
    formData.append('subcategory', 'Ribeye');

    const request = new NextRequest('http://localhost:3000/api/addproduct/beef', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': 'Bearer token',
      },
    });

    // Mock MongoDB
    (Products.create as jest.Mock).mockResolvedValue({
      _id: '123',
      name: 'Prime Beef',
      price: 29.99,
    });

    const response = await POST(request, { params: Promise.resolve({ category: 'beef' }) });
    expect(response.status).toBe(201);
  });

  it('should return 400 with invalid data', async () => {
    const formData = new FormData();
    formData.append('name', '');
    formData.append('price', '-10');

    const request = new NextRequest('http://localhost:3000/api/addproduct/beef', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request, { params: Promise.resolve({ category: 'beef' }) });
    expect(response.status).toBe(400);
  });
});
```

Update `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

**Benefits:**
- Catch bugs before production
- Safe refactoring (tests validate changes)
- Documentation via test cases
- Regression prevention
- CI/CD integration ready
- Team confidence in code quality
