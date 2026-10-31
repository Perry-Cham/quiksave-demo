# Issue 11: Improve Type Safety & Remove String Literals

**Title:** Eliminate String Literals & Improve Type Safety Across Codebase

**Problem:** Multiple type safety issues:
1. **Hardcoded route paths:** `'/admin'`, `'/admin/products'` scattered in code
2. **Magic strings:** Category names as strings instead of constants
3. **Loose typing:** `any` type used in places like `{ category: string } as ProductCategory`
4. **Type inconsistency:** `ProductCategory` type in some places, string in others
5. **Parameter types:** Interface `params` in routes should be readonly

**Impact:**
- Refactoring is error-prone (change path in one place misses others)
- Type checker can't catch errors
- **KISS violation** - unclear what strings represent
- Runtime errors that TypeScript could catch

**Affected Files:**
- `types/api.ts`
- `lib/api-model-helper.ts`
- `app/api/` (all routes)
- `components/app-sidebar.tsx`
- `components/login-form.tsx`

**Goal:** Create constants and improve types to leverage TypeScript fully.

**Acceptance Criteria:**

- ✅ Create `lib/constants.ts` with route and category constants
- ✅ Replace hardcoded strings with constants
- ✅ Remove `as` type casting (use proper types)
- ✅ Use `readonly` for immutable data
- ✅ Export type-safe routes enum/object
- ✅ No `any` types (use proper type inference)
- ✅ All types have clear documentation

**Recommended Implementation:**

```typescript
// lib/constants.ts
// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRODUCTS: '/products',
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/${category}`,
  ADMIN: '/admin',
  ADMIN_PRODUCTS: (category?: string) => `/admin/products${category ? `/${category}` : ''}`,
  ADMIN_USERS: '/admin/users',
  SIGNIN: '/auth/signin',
  SIGNUP: '/auth/signup',
  AUTH_PENDING: '/auth/pending',
} as const;

// API Routes
export const API_ROUTES = {
  PRODUCTS: (category: string) => `/api/getproducts/${category}`,
  CATEGORIES: '/api/categories',
  CATEGORY: (category: string) => `/api/categories/${category}`,
  ADD_PRODUCT: (category: string) => `/api/addproduct/${category}`,
  ADD_CATEGORY: '/api/addcategory',
  UPDATE_PRODUCT: (category: string, id: string) => `/api/updateproduct/${category}/${id}`,
  DELETE_PRODUCT: (category: string, id: string) => `/api/deleteproduct/${category}/${id}`,
  DELETE_CATEGORY: (category: string) => `/api/deletecategory/${category}`,
} as const;

// Default values
export const DEFAULTS = {
  CALLBACK_URL: ROUTES.ADMIN,
  SESSION_REMEMBER: false,
} as const;

// Validation
export const VALIDATION = {
  PRODUCT_NAME_MAX: 100,
  PRODUCT_NAME_MIN: 1,
  CATEGORY_CONTENT_MAX: 1000,
  PRICE_DECIMAL_PLACES: 2,
  MAX_FILE_SIZE_MB: 5,
} as const;

export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export type AllowedFileType = (typeof ALLOWED_FILE_TYPES)[number];
```

Update types:

```typescript
// types/api.ts
export const PRODUCT_CATEGORIES = ['beef', 'pork', 'processed', 'chicken'] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export interface ProductData {
  id: string;
  name: string;
  price: number;
  image: string;
  imageFile: File;
  category: ProductCategory;
  subcategory: string;
}

export interface ProductDataClient {
  _id: string;
  name: string;
  price: number;
  image: string;
  subcategory: string;
}

export interface CategoryData {
  readonly _id: string;
  readonly category: string;
  readonly content: string;
}
```

Usage in routes:

```typescript
// Before
const callbackUrl = '/admin';
const productsUrl = `/admin/products/${category}`;

// After
import { ROUTES } from '@/lib/constants';

const callbackUrl = ROUTES.ADMIN;
const productsUrl = ROUTES.ADMIN_PRODUCTS(category);
```

Update API model helper:

```typescript
// lib/api-model-helper.ts
import { PRODUCT_CATEGORIES, type ProductCategory } from '@/types/api';

export function findCategory(category: string): ProductCategory | undefined {
  if (typeof category !== 'string') return undefined;
  return PRODUCT_CATEGORIES.find(
    (cat) => cat.toLowerCase() === category.toLowerCase()
  );
}
```

**Benefits:**
- Single source of truth for routes/constants
- TypeScript catches typos in routes
- Easier refactoring (change constant, all usages update)
- Clear intent (no magic strings)
- Type-safe enums instead of strings
- Self-documenting constants
