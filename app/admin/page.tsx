"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
function Product_Link_Card({ name, href }: { name: string; href: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <a href={href} className="text-blue-500 hover:underline">
        {name}
      </a>
    </div>
  );
}
interface Product {
  name: string;
  href: string;
}
function Admin_Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const Product_List: Product[] = [
    { name: "Beef", href: "/admin/products/beef" },
    { name: "Chicken", href: "/admin/products/chicken" },
    { name: "Pork", href: "/admin/products/pork" },
    { name: "Processed", href: "/admin/products/processed" },
  ];
const router = useRouter();
 
  async function SignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/signin");
        },
      },
    });
  }
  useEffect(() => {
    setProducts(Product_List);
  }, []);

  return (
    <div className="h-screen py-12 px-8">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      <p className="text-lg text-muted-foreground mt-4">
        Welcome to the admin dashboard! Here you can manage your application.
      </p>
      <button
        onClick={SignOut}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sign Out
      </button>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {products &&
            products.map((product) => (
              <Product_Link_Card
                key={product.href}
                name={product.name}
                href={product.href}
              />
            ))}
        </div>
      </section>
    </div>
  );
}

export default Admin_Page;
