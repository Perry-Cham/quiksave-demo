"use client";
import { useState, useEffect } from "react";
import Product_Display from "@/app/components/product_display";
import Product_Modal from "@/app/components/admin components/product-edit-modal";
import { useProductCategory } from "@/stores/productCategoryStore";

function Admin_Beef_Page() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    productData: null,
    isNewProduct: false,
  });

  // set global product category when this admin page mounts
  const setProductCategory = useProductCategory((s) => s.setProductCategory);
  useEffect(() => {
    setProductCategory("pork");
  }, [setProductCategory]);

  function closeModal() {
    setModalState({
      isOpen: false,
      productData: null,
      isNewProduct: false,
    });
  }
  return (
    <section className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Admin Pork Products
      </h1>
      <div>
        <button
          onClick={() =>
            setModalState({ ...modalState, isOpen: true, isNewProduct: true })
          }
        >
          Add New Product
        </button>
        {modalState.isOpen && (
          <Product_Modal
            isNewProduct={modalState.isNewProduct}
            productData={modalState.productData}
            callback={closeModal}
          />
        )}
        <Product_Display
          productName="pork"
          admin={true}
          setModalState={setModalState}
        />
      </div>
    </section>
  );
}

export default Admin_Beef_Page;
