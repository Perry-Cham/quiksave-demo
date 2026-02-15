"use client"
import { useState } from "react";
import Product_Display from "@/app/components/product_display";
import Product_Modal from "@/app/components/admin components/product-edit-modal";

function Admin_Beef_Page() {
    const [modalState, setModalState] = useState({
        isOpen: false,
        productData: null,
    });

    function closeModal(){
      setModalState({
        isOpen: false,
        productData: null,
      })
    }
  return (
   <section className="min-h-screen bg-gray-100 p-4">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Beef Products</h1>
    <div>
<button onClick={() => setModalState({...modalState, isOpen: true})}>Add New Product</button>
{modalState.isOpen && <Product_Modal isNewProduct={true} productData={modalState.productData} callback={closeModal} />}
    <Product_Display productName="beef" admin={true} setModalState={setModalState}/>
    </div>
   </section>
  );
}

export default Admin_Beef_Page;