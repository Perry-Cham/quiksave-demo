# Quicksave — Technical Documentation

**Full-Stack Next.js E-Commerce Platform**
`Version 0.1.0 · Next.js 16 · React 19 · MongoDB`

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Repository Structure](#2-repository-structure)
3. [Architecture](#3-architecture)
4. [API Routes](#4-api-routes)
5. [Pages & Routing](#5-pages--routing)
6. [Components](#6-components)
7. [State Management](#7-state-management)
8. [Environment Variables](#8-environment-variables)
9. [Data Models](#9-data-models)
10. [Known Issues & Improvement Areas](#10-known-issues--improvement-areas)
11. [Getting Started](#11-getting-started)
12. [Deployment Notes](#12-deployment-notes)

---

## 1. Project Overview

Quicksave is a full-stack e-commerce and content website for a Zambian meat supplier (Still a Demo Please). It provides a public-facing storefront showcasing beef, chicken, pork, and processed meat products, an admin dashboard for product management, and a contact page. The platform is built with Next.js 16, React 19, MongoDB, and ImageKit for media storage.

### 1.1 Key Features

- Public product browsing by category (Beef, Chicken, Pork, Processed)
- Admin dashboard protected by authentication (Better Auth)
- Full CRUD product management with ImageKit CDN image upload/delete
- Responsive design with Tailwind CSS and shadcn/ui components
- MongoDB Atlas as the database backend via Mongoose ODM
- Contact page with office information and inquiry form
- About page with company values, mission, vision, and culture tabs

### 1.2 Technology Stack

| Technology | Purpose / Version |
|---|---|
| Next.js 16 | App Router framework for SSR, SSG, and API routes |
| React 19 | UI library |
| TypeScript | Type safety across the codebase |
| Tailwind CSS v4 | Utility-first styling |
| shadcn/ui + radix-ui | Accessible UI component library |
| MongoDB + Mongoose | NoSQL database and ODM |
| Better Auth v1 | Authentication (email & password) |
| ImageKit | Image CDN — upload, transform, delete |
| Axios | HTTP client for API requests |
| Zustand | Lightweight global state management |
| React Hook Form + Zod | Form validation |
| pnpm | Package manager |

---

## 2. Repository Structure

The repository follows the Next.js App Router convention. All pages, API routes, and shared layouts live under `app/`, while reusable UI components are in `components/`. Shared utilities, authentication config, and model definitions are in `lib/` and `models/` respectively.

### 2.1 Top-Level Directory Map

| Path | Description |
|---|---|
| `app/` | Next.js App Router — pages, layouts, and API routes |
| `app/api/` | API route handlers grouped by HTTP method |
| `app/admin/` | Protected admin dashboard pages |
| `app/auth/` | Sign-in and sign-up pages |
| `app/products/` | Public-facing product category pages |
| `app/components/` | Page-scoped and shared React components |
| `app/about/` | Company About page |
| `app/contact/` | Contact page |
| `components/` | Global shadcn/ui components, Navbar, Hero, etc. |
| `components/ui/` | Low-level UI primitives (Button, Card, Badge, etc.) |
| `lib/` | Auth config, auth client, API helpers, and utils |
| `models/` | Mongoose schema and model definitions (`.ts` and `.js`) |
| `stores/` | Zustand global state stores |
| `types/` | TypeScript type definitions |
| `public/` | Static SVG assets |
| `app/Pdata.json` | Seed / migration data for chicken products |
| `app/imageData.json` | ImageKit file metadata for chicken images |
| `app/d.ts` | One-off DB migration script (not a type file — see Known Issues) |

---

## 3. Architecture

### 3.1 Data Flow Overview

The application follows a standard Next.js App Router data flow:

- Public pages (products, about, contact) are server-rendered React Server Components or client components that fetch data from the internal API.
- Client components (product displays, admin forms) call Next.js API route handlers under `/api/`.
- API routes connect to MongoDB via Mongoose, and to ImageKit for media operations.
- Authentication is handled by Better Auth, which uses the same MongoDB connection and exposes a REST API at `/api/auth/[...all]`.
- Admin pages are guarded by a Next.js layout that checks the session server-side before rendering children.

### 3.2 Authentication Architecture

Authentication is implemented using the Better Auth library (v1.4.18). It uses the MongoDB adapter, sharing the same Mongoose connection as the rest of the application.

**`lib/auth.ts` — Server-side auth instance:**
- Initialises Better Auth with the `mongodbAdapter` pointing to the active Mongoose connection.
- Enables the `emailAndPassword` strategy.
- Sets up API error logging via the `onAPIError` hook.

**`lib/auth-client.ts` — Client-side auth instance:**
- Exports a `createAuthClient()` instance used in client components for sign-in, sign-up, and sign-out flows.

**`app/api/auth/[...all]/route.ts`:**
- Catches all `/api/auth/*` requests and delegates them to Better Auth's Next.js handler via `toNextJsHandler(auth)`.

**`app/admin/layout.tsx`:**
- Server component that calls `auth.api.getSession()` with the current request headers.
- Redirects unauthenticated visitors to `/auth/signin` before any admin page is rendered.

### 3.3 Database Architecture

MongoDB Atlas is used as the database. The Mongoose connection string is supplied via the `MONGO_URI` environment variable. All four product categories share an identical schema.

**Product Schema (`models/product-model.ts`):**

```ts
{ name: String, price: Number, image: String, imageId: String, subcategory: String }
```

Four separate Mongoose models map to four MongoDB collections:

| Model / Collection | Category |
|---|---|
| `Beef` | Beef cuts and products |
| `Chicken` | Chicken products |
| `Pork` | Pork cuts and products |
| `Processed` | Processed / deli meats |

The models are exported as a keyed object (`Products`) so API routes can look up the correct model by category string: `Products[category].find({})`. The `imageId` field stores the ImageKit file ID, enabling deletion of CDN assets when a product is removed.

---

## 4. API Routes

All custom API routes are located under `app/api/` and grouped into sub-directories by HTTP method. Each route connects to MongoDB and handles its own Mongoose connection via `mongoose.connect()`.

| Method | Path | Handler File | Description |
|---|---|---|---|
| `GET` | `/api/getproducts/[product]` | `(GET)/getproducts/` | Fetch all products for a category |
| `POST` | `/api/addproduct` | `(POST)/addproduct/` | Add a new product with optional image upload |
| `PATCH` | `/api/updateproduct` | `(PATCH)/updateproduct/` | Update product fields and/or image |
| `DELETE` | `/api/deleteproduct/[category]/[id]` | `(DELETE)/deleteproduct/` | Delete product and its ImageKit asset |
| `ALL` | `/api/auth/[...all]` | `auth/[...all]/` | Better Auth catch-all handler |

### 4.1 GET `/api/getproducts/[product]`

Fetches all products from the requested category's MongoDB collection.

- **Path parameter:** `product` — one of `beef | chicken | pork | processed`
- Connects to MongoDB, resolves the correct Mongoose model via `Products[product]`, and returns all documents as JSON.
- Returns `404` if the category does not match a known model.
- Returns `500` on database or connection errors.

### 4.2 POST `/api/addproduct`

Creates a new product document. Accepts `multipart/form-data`.

- **Required fields:** `name`, `price`, `category`, `subcategory`
- **Optional field:** `imageFile` (binary file upload)
- If `imageFile` is present and non-empty, uploads the file to ImageKit under `/Quicksave/product-images/{category}/` and stores the returned URL and `fileId`.
- Creates the MongoDB document with the resolved image URL and image ID.

### 4.3 PATCH `/api/updateproduct`

Updates an existing product. Accepts `multipart/form-data`.

- **Required fields:** `id`, `name`, `price`, `category`, `subcategory`, `image` (existing URL as fallback)
- **Optional field:** `imageFile` — if provided, uploads a new image to ImageKit and replaces the stored URL and `imageId`.
- Uses `findByIdAndUpdate` with `{ new: true }` to return the updated document.

> **Note:** The current implementation does not delete the old ImageKit image when a new one is uploaded. This is a known gap — see [Known Issues](#101-active-issues).

### 4.4 DELETE `/api/deleteproduct/[category]/[id]`

Deletes a product and its associated CDN image.

- **Path parameters:** `category` and `id` (MongoDB ObjectId)
- Looks up the product, extracts the `imageId`, calls `imagekit.files.delete(imageId)` to remove the CDN asset.
- If ImageKit deletion fails (e.g. file not found), the error is logged but the product deletion still proceeds.
- Deletes the product document from MongoDB via `findByIdAndDelete`.

---

## 5. Pages & Routing

| Route | Description |
|---|---|
| `/` | Landing page — Hero, About Us section, Product category cards |
| `/about` | About page — company overview, mission, values, culture tabs |
| `/contact` | Contact page — office info cards and contact form |
| `/products/beef` | Public beef product listing |
| `/products/chicken` | Public chicken product listing |
| `/products/pork` | Public pork product listing |
| `/products/processed` | Public processed meats listing |
| `/auth/signin` | Sign-in form (no Navbar via `NoNavPaths` list) |
| `/auth/signup` | Sign-up form (no Navbar via `NoNavPaths` list) |
| `/admin` | Admin dashboard — protected, lists product category links |
| `/admin/products/beef` | Admin beef management — add, edit, delete products |
| `/admin/products/chicken` | Admin chicken management |
| `/admin/products/pork` | Admin pork management |
| `/admin/products/processed` | Admin processed management |

### 5.1 Root Layout (`app/layout.tsx`)

Wraps all pages with the Geist font variables, global CSS imports, and the `Navbar` component. The Navbar accepts a `NoNavPaths` array (`/auth/signin` and `/auth/signup`) so those pages render without the navigation bar.

### 5.2 Admin Layout (`app/admin/layout.tsx`)

A server component that performs session verification before rendering any admin child page. If no valid session is found, it redirects to `/auth/signin` using Next.js `redirect()`. This is the primary access-control mechanism for all admin routes.

### 5.3 Public Product Pages

Each product category has a dedicated page (e.g. `app/products/chicken/page.tsx`) that renders an `Intro` component with a descriptive blurb and a `Product_Display` component that fetches and renders the live product grid. The four pages are structurally identical, differing only in the `productName` prop and copy text.

### 5.4 Admin Product Pages

Each admin category page (e.g. `app/admin/products/chicken/page.tsx`) uses a `useEffect` to set the global product category in the Zustand store (`useProductCategory`) when the page mounts. This category is then consumed by the admin product card's delete handler to construct the correct DELETE API URL.

Each page manages a `modalState` object that controls the product edit/add modal:

- `isOpen` — whether the modal is visible
- `productData` — the product being edited (`null` for new products)
- `isNewProduct` — determines whether the modal submits a `POST` or `PATCH` request

---

## 6. Components

### 6.1 `Product_Display` (`app/components/product_display.tsx`)

The central rendering engine for all product listings — both public and admin views.

- Fetches products from `/api/getproducts/{productName}` on mount using Axios.
- Groups fetched products by their `subcategory` field using `reduce()`, then renders each group under a labelled section header.
- When `admin={true}`, renders `AdminProductCard` components (with Edit and Delete buttons) instead of the plain `Product_Card`.
- Shows a `LoaderCircle` spinner during fetch and an error message if the API call fails.
- The `setModalState` prop is passed through to admin cards to open the edit modal.

### 6.2 `Product_Card` (`app/components/product_card.tsx`)

The read-only public product card. Accepts `name`, `price`, and `imagesrc` props. Formats the price as `K{value}` (Zambian Kwacha). Features a hover scale effect on the image and a red border highlight on hover. Used exclusively on public product pages.

### 6.3 Admin Product Card (`app/components/admin components/product-card.tsx`)

Extends the visual design of the public card with two action buttons:

- **Edit Price** — opens the `Product_Modal` with the current product data pre-filled.
- **Delete Product** — sends a `DELETE` request to `/api/deleteproduct/{product_category}/{product._id}`. The category is sourced from the Zustand `productCategoryStore`, which is set when the admin page mounts.

### 6.4 `Product_Modal` (`app/components/admin components/product-edit-modal.tsx`)

A form component for adding and editing products, shared across all admin category pages.

- Controlled form with local state for `name`, `price`, `image` URL, `category`, and `subcategory`.
- When `isNewProduct={true}`, submits a `POST` to `/api/addproduct`.
- When `isNewProduct={false}`, appends the product `_id` and submits a `PATCH` to `/api/updateproduct`.
- Supports file upload via an `imageFile` input. Sends form data as `multipart/form-data` using Axios.
- Calls the `callback()` prop on submission to close the modal (handled by the parent page's `closeModal` function).

> **Known limitations:** The form has no backdrop/overlay and appears inline in the page flow. There is no loading state or user-facing error handling on submission failure — errors are only logged to the console.

### 6.5 `Navbar` (`components/ui/navbar.tsx`)

A responsive sticky navigation bar with desktop and mobile variants. Uses a `ResizeObserver` to switch between layouts at the 768px breakpoint. On mobile, navigation links collapse into a `Popover` menu triggered by a hamburger icon.

- Active link highlighting uses `usePathname()` to compare against each nav link's `href`.
- The Products link has sub-links rendered inside a `NavigationMenuContent` dropdown.
- Supports custom props: `logo`, `navigationLinks`, `ctaText`, `ctaHref`.

### 6.6 `Hero` (`components/hero.tsx`)

Full-viewport hero section for the landing page. Displays the Quicksave tagline, a short description, and two call-to-action buttons (Contact Us and Learn More) alongside a large hero image. Uses `min-h-screen` with a two-column grid layout on large screens.

### 6.7 `LoginForm` (`components/login-form.tsx`)

A dual-purpose form component used on both `/auth/signin` and `/auth/signup`. The `type` prop (`"signin" | "signup"`) controls which Zod schema is used and which Better Auth method is called. Uses `react-hook-form` for validation and controlled input handling. Displays inline validation error messages.

---

## 7. State Management

Global state is managed with Zustand. There is currently one store.

### 7.1 `productCategoryStore` (`stores/productCategoryStore.ts`)

| Property / Action | Description |
|---|---|
| `product_category: string \| null` | The currently active product category for admin operations |
| `setProductCategory(category)` | Updates the active category string |

This store solves a prop-drilling problem: the admin product card's Delete button needs to know which category it belongs to in order to construct the DELETE API URL. Rather than threading the category prop down through `Product_Display` to `AdminProductCard`, the admin page sets it in the store on mount, and the card reads it directly.

> **Consideration:** Since this is a global singleton, navigating between admin categories without a full remount could result in a stale category value. The `useEffect` in each admin page mitigates this by always calling `setProductCategory` on mount.

---

## 8. Environment Variables

The following environment variables must be set in a `.env.local` file (or your deployment environment):

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/Quicksave`) |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private API key for server-side file upload and deletion |
| `BETTER_AUTH_SECRET` | Secret used by Better Auth to sign session tokens (required in production) |
| `BETTER_AUTH_URL` | Base URL of the deployment, used by Better Auth for callback URLs |

> **Warning:** `app/d.ts` (the migration script) contains a hardcoded MongoDB URI. Real credentials should never be committed to version control.

---

## 9. Data Models

### 9.1 Product (Mongoose Schema)

| Field | Type / Notes |
|---|---|
| `_id` | MongoDB ObjectId — auto-generated |
| `name` | String — display name (e.g. `"Chicken Breast"`) |
| `price` | Number — price in Zambian Kwacha |
| `image` | String — full ImageKit CDN URL |
| `imageId` | String — ImageKit file ID (used for deletion) |
| `subcategory` | String — groups products within a category (e.g. `"Chicken"`, `"Beef Steak"`) |

### 9.2 Sample Document

```json
{
  "_id": "6914c38f4f1f7bc6e7631d17",
  "name": "Chicken Breast",
  "price": 84,
  "subcategory": "Chicken",
  "image": "https://ik.imagekit.io/.../RawChickenBreast.webp",
  "imageId": "69949718127f7c45455f8f4d"
}
```

---

## 10. Known Issues & Improvement Areas

### 10.1 Active Issues

- **Orphaned ImageKit assets:** `PATCH /api/updateproduct` does not delete the old ImageKit image when a new one is uploaded, leading to orphaned CDN files.
- **No UI refresh after mutations:** The admin product list does not refresh after adding, editing, or deleting a product — a manual page reload is required to see changes.
- **Silent modal failures:** `Product_Modal` has no loading state, success feedback, or client-side error handling. Failed API calls are only logged to the console.
- **Non-functional contact form:** The form in `app/contact/page.tsx` has no submission handler — it renders as a static HTML form with no `action` or `onSubmit`.
- **Misnamed migration script:** `app/d.ts` is named like a TypeScript declaration file but is an executable migration script. It should be moved outside `app/` and renamed (e.g. `scripts/migrate.ts`).
- **Duplicated admin pages:** The four admin product pages (`beef`, `chicken`, `pork`, `processed`) are near-identical and should be consolidated into a single dynamic route: `/admin/products/[category]/page.tsx`.
- **No API route authentication:** Any client with knowledge of the route can call `POST`/`PATCH`/`DELETE` product endpoints without a valid session. Admin API routes should verify the session server-side.

### 10.2 Code Quality Notes

- **Duplicate model file:** `models/product-model.js` is a compiled JavaScript duplicate of `product-model.ts`. Only the TypeScript source should be committed; the `.js` file can cause model-registration conflicts at runtime.
- **Repeated DB connections:** Each API route calls `mongoose.connect()` independently. A shared connection helper with connection caching (the standard Next.js + Mongoose pattern) would reduce overhead.
- **Fragile category store pattern:** Passing `category` as a prop directly to `AdminProductCard` or via `Product_Display` would be more explicit and testable than relying on a global Zustand store.
- **Unused components:** `components/signup-form.tsx` duplicates logic already in `components/login-form.tsx` and is not imported anywhere. `app/components/card.tsx` and `app/components/display.tsx` appear to be earlier iterations of product display components and are also unused.

---

## 11. Getting Started

### 11.1 Prerequisites

- Node.js 18+
- pnpm (specified in `packageManager` field of `package.json`)
- A MongoDB Atlas cluster (or local MongoDB instance)
- An ImageKit account with a private API key

### 11.2 Installation & Local Development

**1. Clone the repository and install dependencies:**

```bash
git clone <repo-url>
cd quicksave-demo
pnpm install
```

**2. Create a `.env.local` file in the project root:**

```env
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/Quicksave
IMAGEKIT_PRIVATE_KEY=<your_imagekit_private_key>
BETTER_AUTH_SECRET=<a_long_random_secret>
BETTER_AUTH_URL=http://localhost:3000
```

**3. Start the development server:**

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### 11.3 Creating an Admin Account

Navigate to `/auth/signup` to create an account, then sign in at `/auth/signin`. Successfully authenticated users are redirected to `/admin`. There is currently no role-based access control — any registered user can access the admin dashboard.

### 11.4 Production Build

```bash
pnpm build
pnpm start
```

Ensure all required environment variables are set before building.

---

## 12. Deployment Notes

- The application is a standard Next.js project and deploys without additional configuration to **Vercel**. Connect the repository, add the four environment variables in the Vercel project settings, and deploy.
- **MongoDB Atlas:** Ensure the deployment server's IP is whitelisted in Atlas Network Access settings, or use `0.0.0.0/0` for unrestricted access (not recommended for production).
- **ImageKit:** The `IMAGEKIT_PRIVATE_KEY` is used server-side only (in API routes) and is never exposed to the client.
- **`BETTER_AUTH_URL`** must be set to the production domain for auth callbacks and redirects to work correctly.

---


*Quicksave Technical Documentation · v0.1.0 · February 2026*
