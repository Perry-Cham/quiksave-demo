"use client";
import { useState, useEffect } from "react";
import Product_Display from "@/app/custom components/product_display";
import Product_Modal from "@/app/custom components/admin components/product-edit-modal";
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
    setProductCategory("beef");
  }, [setProductCategory]);

  function closeModal() {
    setModalState({
      isOpen: false,
      productData: null,
      isNewProduct: true,
    });
  }
  return (
    <section className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Admin Beef Products
      </h1>
      <div>
          <Product_Modal
            isNewProduct={modalState.isNewProduct}
            productData={modalState.productData}
            callback={closeModal}
            isOpen={modalState.isOpen}
            setIsOpen={(isOpen: boolean) =>
              setModalState((prev) => ({ ...prev, isOpen }))
            }
          />
        <Product_Display
          productName="beef"
          admin={true}
          setModalState={setModalState}
        />
      </div>
    </section>
  );
}

export default Admin_Beef_Page;
