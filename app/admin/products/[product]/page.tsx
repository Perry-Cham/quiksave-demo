"use client";
import { useState, useEffect } from "react";
import Product_Display from "@/app/custom components/product_display";
import Product_Modal from "@/app/custom components/admin components/product-edit-modal";
import EditCategoryContentDialog from "@/app/custom components/admin components/edit-category-content-dialog";
import { useParams } from "next/navigation";
import axios from "axios";
interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  subcategory: string;
}
interface ModalState {
  isOpen: boolean;
  productData: any;
  isNewProduct: boolean;
}

function Admin_Product_page() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    productData: null,
    isNewProduct: false,
  });
  const [products, setProducts] = useState();

  function closeModal() {
    setModalState({
      isOpen: false,
      productData: null,
      isNewProduct: true,
    });
    FetchData();
  }
  const product = useParams<{ product: string }>();
  async function FetchData() {
    const response = await axios.get(`/api/getproducts/${product.product}`);
    setProducts(response.data);
  }
  useEffect(() => {
    FetchData();
  }, []);

  console.log("this is", product);
  return (
    <section className="min-h-screen bg-gray-100 p-4 pt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 capitalize">
          {product?.product} Products
        </h1>
        <EditCategoryContentDialog category={product?.product || ""} />
      </div>
      <div>
        <Product_Modal
          modalState={modalState}
          category={product?.product as string}
          callback={closeModal}
          setModalState={setModalState}
        />

        {products && (
          <Product_Display
            products={products}
            admin={true}
            setModalState={setModalState}
          />
        )}
      </div>
    </section>
  );
}

export default Admin_Product_page;
