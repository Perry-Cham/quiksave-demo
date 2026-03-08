"use client";

import AdminBreadcrumbs from "@/app/custom components/admin components/admin-breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminDocsIntro() {
  return (
    <div className="h-full">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <AdminBreadcrumbs />
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Admin Panel Introduction</h1>
          <p className="text-muted-foreground mb-8">
            Welcome to the QuikSave Admin Dashboard. This guide will help you navigate and use the admin panel effectively.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-base leading-relaxed text-foreground mb-4">
              The Admin Dashboard is your central hub for managing all aspects of the QuikSave platform. 
              From here, you can manage products, control user access, and view comprehensive documentation 
              to help you perform administrative tasks efficiently.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Main Features</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Products Management</h3>
                <p className="text-foreground">
                  Manage your product catalog including beef, pork, chicken, and processed meats. 
                  You can add new products, edit existing ones, and organize them by category.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Access Controls</h3>
                <p className="text-foreground">
                  Manage user accounts and roles. Control who has access to the admin panel, 
                  assign admin privileges, and remove users as needed.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Documentation</h3>
                <p className="text-foreground">
                  Comprehensive guides and tutorials to help you use all admin features effectively. 
                  Includes step-by-step instructions for common tasks.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <ol className="list-decimal list-inside space-y-3 text-foreground">
              <li>Navigate to the Products section to manage your inventory</li>
              <li>Use Access Controls to manage user accounts and permissions</li>
              <li>Refer to the Documentation section for detailed guides on specific tasks</li>
              <li>Visit the Managing Products guide for product management instructions</li>
              <li>Visit the Managing Users guide for user management instructions</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
            <p className="text-foreground mb-4">
              Use the sidebar on the left to navigate between different sections:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground">
              <li><strong>Products</strong> - Access product management sections for each category</li>
              <li><strong>Access Controls</strong> - Manage users and their permissions</li>
              <li><strong>Documentation</strong> - Read guides and tutorials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <p className="text-foreground">
              Refer to the Documentation section in the sidebar for detailed guides on:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground mt-4">
              <li>Managing Products - Learn how to add, edit, and delete products</li>
              <li>Managing Users - Learn how to manage user accounts and roles</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
