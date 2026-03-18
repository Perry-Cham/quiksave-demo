"use client"
import { Props } from "@/types/product-card";
import { useMessageModal } from "@/stores/Admin_Message_Modal_Store";
import { Button } from "@/components/ui/button";
import { CardFooter, CardHeader, Card } from "@/components/ui/card";
import { useState } from "react";
import axios from "axios";
import { LoaderCircle } from "lucide-react";

function card({ name, price, imagesrc, product, closeMessage, setModalState }: Props) {
  // Convert price to number if it's a string
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  const formattedPrice = numPrice ? `K${numPrice.toFixed(2)}` : "N/A";

  //State for the message modal
  const setMessageModalState = useMessageModal(state => state.setModalState)

  //Loading State for Delete Request
  const [loading, setLoading] = useState<Boolean>(false)
  return (
    <div className="group flex flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 border-2 hover:border-red-400 max-h-[380px]">
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <img
          src={imagesrc}
          alt={name || "Product"}
          className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
        {/* Product Name */}
        <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-2 mb-3 group-hover:text-red-600 transition-colors duration-200">
          {name || "Product"}
        </h3>

        {/* Price Badge */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">
            Price
          </span>
          <span className="text-lg sm:text-xl font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">
            {formattedPrice}
          </span>
        </div>
      </div>

      <CardFooter className="flex justify-end space-x-2 h-[100px] px-2">
        <Button
          onClick={() => {
            console.log(product);
            setModalState({
              isOpen: true,
              productData: product,
              isNewProduct: false,
            });
          }}
          className="cursor-pointer"
        >
          Edit Price
        </Button>
        <Button
          className={`bg-red-500 cursor-pointer hover:bg-red-400 transition-colors duration-300 ${loading && "bg-red-300"}`}
          onClick={async () => {
            setLoading(true)
            try {
              const response = await axios.delete(
                `/api/deleteproduct/${product.category}/${product._id}`,
              );
              setMessageModalState(true, 'Success', "The Product was successfully deleted")
            } catch (e) {
              console.log(e);
              setMessageModalState(true, 'Error', "There was an error on our end please try again later.")
            }
          }}

        >
          Delete Product {loading && <LoaderCircle className="animate-spin"/>}
        </Button>
      </CardFooter>
    </div>
  );
}

export default card;
