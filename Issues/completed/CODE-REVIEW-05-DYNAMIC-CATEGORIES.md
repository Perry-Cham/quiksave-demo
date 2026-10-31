# Issue 5: Replace Hardcoded Category List with Database-Driven Configuration

**Title:** Move Hardcoded Product Categories to Database Configuration

**Problem:** Product categories are hardcoded in multiple places:
- `types/api.ts` - hardcoded type union
- `lib/api-model-helper.ts` - hardcoded array
- `lib/validation.ts` (proposed) - would also be hardcoded
- Changing categories requires code changes and redeployment

**Impact:**
- Violates **DRY** principle (categories defined in 3+ places)
- Difficult to manage (admin can't add categories without code change)
- Type safety issues (string literals vs enum vs array)
- **SoC violation** - business logic mixed with code

**Affected Files:**
- `types/api.ts`
- `lib/api-model-helper.ts`
- `app/api/(POST)/addcategory/route.ts`

**Goal:** Create a database-driven category management system.

**Acceptance Criteria:**

- ✅ Remove hardcoded category array from `api-model-helper.ts`
- ✅ Create `lib/categories.ts` with dynamic category fetching
- ✅ Cache categories in memory with TTL for performance
- ✅ Categories are synced from database on startup
- ✅ Admin can add/remove categories via API
- ✅ Type safety maintained with dynamic category union

**Recommended Implementation:**

```typescript
// lib/categories.ts
import CategoryModel from '@/models/product-categories';
import { connectDB } from '@/lib/db';

let cachedCategories: string[] = [];
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function getCategories(): Promise<string[]> {
  const now = Date.now();

  // Return cached if still valid
  if (cachedCategories.length > 0 && now - cacheTime < CACHE_TTL) {
    return cachedCategories;
  }

  try {
    await connectDB();
    const docs = await CategoryModel.find({}, { category: 1 });
    cachedCategories = docs.map((doc) => doc.category);
    cacheTime = now;
    return cachedCategories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    // Return cached even if expired, better than nothing
    return cachedCategories;
  }
}

export async function getCategoryOrNull(name: string): Promise<string | null> {
  const categories = await getCategories();
  return categories.find((cat) => cat.toLowerCase() === name.toLowerCase()) || null;
}

export function invalidateCache(): void {
  cachedCategories = [];
  cacheTime = 0;
}
```

Update types:

```typescript
// types/api.ts
// Remove hardcoded union
// export type ProductCategory = "beef" | "pork" | "processed" | "chicken";

// Use this instead:
export type ProductCategory = string;

export interface ProductData {
  id: string;
  name: string;
  price: number;
  image: string;
  imageFile: File;
  category: ProductCategory;
  subcategory: string;
}
```

Update validation:

```typescript
// lib/validation.ts
import { getCategories } from '@/lib/categories';

export async function createProductSchema() {
  const categories = await getCategories();
  
  return z.object({
    name: z.string().min(1).max(100),
    price: z.number().positive(),
    subcategory: z.string().min(1).max(100),
    category: z.enum(categories as [string, ...string[]]),
  });
}
```

**Benefits:**
- Admin-friendly: categories can be managed via API
- Single source of truth in database
- Cache reduces database queries
- Type-safe with dynamic validation
- Easier to test and maintain
