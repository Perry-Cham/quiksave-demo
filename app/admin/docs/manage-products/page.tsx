"use client";

import AdminBreadcrumbs from "@/components/custom components/admin components/admin-breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminDocsManageProducts() {
  return (
    <div className="h-full">
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Managing Products</h1>
          <p className="text-muted-foreground mb-8">
            A comprehensive guide to managing your product catalog in QuikSave
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="text-base leading-relaxed text-foreground mb-4">
              The Products section allows you to manage your complete product catalog. 
              Products are organized by category: Beef, Pork, Chicken, and Processed meats. 
              Each category can contain multiple products with different specifications and prices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Product Categories</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Beef</h3>
                <p className="text-foreground">
                  Fresh and processed beef products including cuts, roasts, and ground beef.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Pork</h3>
                <p className="text-foreground">
                  Premium pork products including chops, ribs, bacon, and ham selections.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Chicken</h3>
                <p className="text-foreground">
                  Quality chicken products including whole birds, breasts, thighs, and wings.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Processed</h3>
                <p className="text-foreground">
                  Ready-to-cook and convenience products including sausages, patties, and prepared meats.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Adding Products</h2>
            <ol className="list-decimal list-inside space-y-3 text-foreground">
              <li>Navigate to the category where you want to add a product (Beef, Pork, Chicken, or Processed)</li>
              <li>Click the "Add Product" button</li>
              <li>Fill in the product details:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-2">
                  <li><strong>Name</strong> - The product name (e.g., "Ribeye Steak" or "Chicken Breast")</li>
                  <li><strong>Price</strong> - The price of the product</li>
                  <li><strong>Subcategory</strong> - Optional classification within the category</li>
                  <li><strong>Image</strong> - Upload a product image for display</li>
                </ul>
              </li>
              <li>Click "Save" to add the product to your catalog</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Editing Products</h2>
            <ol className="list-decimal list-inside space-y-3 text-foreground">
              <li>Navigate to the category containing the product you want to edit</li>
              <li>Find the product in the list</li>
              <li>Click the "Edit" button on the product card</li>
              <li>Modify any of the product details (name, price, subcategory, or image)</li>
              <li>Click "Save Changes" to update the product</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Deleting Products</h2>
            <ol className="list-decimal list-inside space-y-3 text-foreground">
              <li>Navigate to the category containing the product you want to delete</li>
              <li>Find the product in the list</li>
              <li>Click the "Delete" button on the product card</li>
              <li>Confirm the deletion when prompted</li>
              <li>The product will be removed from your catalog</li>
            </ol>
            <p className="text-orange-600 mt-4 text-sm">
              ⚠️ <strong>Warning:</strong> Deleting a product is permanent and cannot be undone. 
              Make sure you want to delete the product before confirming.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
            <ul className="list-disc list-inside space-y-3 text-foreground">
              <li><strong>Keep Names Clear</strong> - Use descriptive product names that customers will recognize</li>
              <li><strong>Accurate Pricing</strong> - Always ensure prices are current and accurate</li>
              <li><strong>Quality Images</strong> - Upload clear, high-quality product images for better presentation</li>
              <li><strong>Regular Updates</strong> - Review and update your products regularly to reflect changes</li>
              <li><strong>Subcategory Organization</strong> - Use subcategories to help organize products within each main category</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Product Not Saving</h3>
                <p className="text-foreground">
                  Ensure all required fields are filled in (name, price, and image). 
                  Check your internet connection and try again.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Image Upload Issues</h3>
                <p className="text-foreground">
                  Make sure your image file is in a supported format (JPG, PNG, GIF) 
                  and is smaller than 5MB.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Can't Find a Product</h3>
                <p className="text-foreground">
                  Use the search or filter functions if available. 
                  Double-check that you're looking in the correct category.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
