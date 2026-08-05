import { createNavigationConfig } from 'next-safe-navigation';
import { z } from 'zod';

const { routes: baseRoutes, useSafeParams, useSafeSearchParams } =
    createNavigationConfig((defineRoute) => ({
        home: defineRoute('/'),
        products: defineRoute('/products/[category]', {
            params: z.object({
                category: z.string(),
            }),
        }),
        contact: defineRoute('/contact'),
        about: defineRoute('/about'),
        signin: defineRoute('/auth/signin'),
        signup: defineRoute('/auth/signup'),
        categories: defineRoute('/api/categories'),
        categoryDetails: defineRoute('/api/categories/[category]', {
            params: z.object({
                category: z.string(),
            }),
        }),
        productsApi: defineRoute('/api/products/[category]', {
            params: z.object({
                category: z.string(),
            }),
        }),
        productDetails: defineRoute('/api/products/[category]/[id]', {
            params: z.object({
                category: z.string(),
                id: z.string(),
            }),
        }),
        users: defineRoute('/api/users'),
        userDetails: defineRoute('/api/users/[id]', {
            params: z.object({
                id: z.string(),
            }),
        }),
        userRole: defineRoute('/api/users/[id]/role', {
            params: z.object({
                id: z.string(),
            }),
        }),
        adminOverview: defineRoute('/admin'),
        adminProducts: defineRoute('/admin/products/[category]', {
            params: z.object({
                category: z.string(),
            }),
        }),
        adminUsers: defineRoute('/admin/users/manage'),
        adminDocsIntro: defineRoute('/admin/docs/intro'),
        adminDocsProducts: defineRoute('/admin/docs/manage-products'),
        adminDocsUsers: defineRoute('/admin/docs/manage-users'),
    }));

export const routes = {
    ...baseRoutes,
    auth: {
        signin: baseRoutes.signin,
        signup: baseRoutes.signup,
    },
    api: {
        categories: baseRoutes.categories,
        categoryDetails: baseRoutes.categoryDetails,
        products: baseRoutes.productsApi,
        productDetails: baseRoutes.productDetails,
        users: baseRoutes.users,
        userDetails: baseRoutes.userDetails,
        userRole: baseRoutes.userRole,
    },
    admin: {
        overview: baseRoutes.adminOverview,
        products: baseRoutes.adminProducts,
        users: baseRoutes.adminUsers,
        docs: {
            intro: baseRoutes.adminDocsIntro,
            products: baseRoutes.adminDocsProducts,
            users: baseRoutes.adminDocsUsers,
        },
    },
};

export { useSafeParams, useSafeSearchParams };