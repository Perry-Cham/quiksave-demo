"use client";
import { useState, useEffect } from "react";
import Product_Display from "@/components/custom components/product_display";
import Product_Modal from "@/components/custom components/admin components/product-edit-modal";
import EditCategoryContentDialog from "@/components/custom components/admin components/edit-category-content-dialog";
import { useParams } from "next/navigation";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMessageModal } from "@/stores/Admin_Message_Modal_Store";
import { useShallow } from 'zustand/shallow'
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
  //This is for the add / edit product form 
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    productData: null,
    isNewProduct: false,
  });
  const [products, setProducts] = useState();

 

  // This is for the message modal that appears that appears after a crud operation 
  const MessageModalOpen = useMessageModal(state => state.modalOpen);
  const MessageModalStatus = useMessageModal(state => state.status);
  const MessageModalMessage = useMessageModal(state => state.message);
  const setMessageModal = useMessageModal(state => state.setModalState);

  //Functions to close the Modals
 function closeModal() {
    setModalState({
      isOpen: false,
      productData: null,
      isNewProduct: false,
    });
    FetchData();
  }
 
function closeMessageModal(){
  setMessageModal(false,"","")
  FetchData()
}
// TO DO remove the close function modal declarations from the buttons ints useless there

  const { product } = useParams<{ product: string }>();
  async function FetchData() {
    console.log("Fetching data for product:", product);
    const response = await axios.get(`/api/getproducts/${product}`);
    console.log("Fetched products:", response.data);
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
          {product} Products
        </h1>
        <EditCategoryContentDialog category={product || ""} />
      </div>
      <div>
        {/*THIS DIALOG RETURNS A MESSAGE ON SUCCESS OR FAILURE*/}
        <Dialog open={MessageModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{MessageModalStatus}</DialogTitle>
              <DialogDescription>{MessageModalMessage}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() =>
                  closeMessageModal()
                }
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Product_Modal
          modalState={modalState}
          category={product as string}
          callback={closeModal}
          setModalState={setModalState}
        />

        {products && (
          <Product_Display
            products={products}
            admin={true}
            setModalState={setModalState}
            closeMessage={closeMessageModal}
          />
        )}
      </div>
    </section>
  );
}

export default Admin_Product_page;
