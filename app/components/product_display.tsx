"use client"
import React, { useEffect, useState } from "react";
import Product_Card from "./product_card";
import AdminProductCard from "./admin components/product-card";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  subcategory: string;
}

function Product_Display({
  productName,
  admin = false,
  setModalState,
}: {
  productName: string;
  admin?: boolean;
  setModalState?: React.Dispatch<React.SetStateAction<{isOpen: boolean; productData: any, isNewProduct: boolean}>>;
}) {
  const [products, setProducts] = useState<Product[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    const fetchProducts = async (product: string) => {
      try {
        const response = await axios.get(`/api/getproducts/${product}`);
        if (!cancelled) setProducts(response.data);
      } catch (err) {
        console.error(err);
        if (!cancelled) setProducts(null);
      }
    };
    fetchProducts(productName);
    return () => {
      cancelled = true;
    };
  }, [productName]);

  const categories = products?.reduce(
    (acc, curr) => {
      if (!acc[curr.subcategory]) acc[curr.subcategory] = [];
      acc[curr.subcategory].push(curr);
      return acc;
    },
    {} as Record<string, Product[]>,
  );
  return (
    <div className="bg-gray-100 p-1 pb-4 rounded-lg mt-3 md:2 mx-15 px-10">
      <div className="">
        {categories ? (
          Object.entries(categories).map(([key, value]) => (
            <>
              <div className="text-center font-extrabold text-white bg-red-600 rounded my-3 text-2xl md:bg-[inherit] md:text-red-600 md:mt-10">
                {key.toUpperCase()}     
              </div>
              <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]  gap-4">
                {value.map((p) =>
                  admin ? (
                    <AdminProductCard
                      key={p._id}
                      name={p.name}
                      price={p.price}
                      imagesrc={p.image}
                      product={p}  
                      setModalState={setModalState!}
                    />
                  ) : (
                    <Product_Card
                      key={p._id}
                      name={p.name}
                      price={p.price}
                      imagesrc={p.image}
                    />
                  ),
                )}
              </div>
            </>
          ))
        ) : (
          <div className="text-center font-extrabold text-white bg-red-600 rounded my-3 text-2xl md:bg-[inherit] md:text-red-600 md:mt-10">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}
export default Product_Display;
