import { LoaderCircle } from "lucide-react";
import Product_Card from "./product_card";
import AdminProductCard from "./admin components/product-card";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category:string;
  subcategory: string;
}

function Product_Display({
  products,
  admin = false,
  setModalState,
  closeMessage,
}: {
  products: Array<Product>
  admin?: boolean;
  closeMessage:(modalOpen?: boolean, status?: string, message?: string) => void;
  setModalState?: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      productData: any;
      isNewProduct: boolean;
    }>
  >;
}) {

  const categories = products?.reduce(
    (acc, curr) => {
      if (!acc[curr.subcategory]) acc[curr.subcategory] = [];
      acc[curr.subcategory].push(curr);
      return acc;
    },
    {} as Record<string, Product[]>,
  );
  return (
    <div className={`bg-gray-100 p-1 pb-4 rounded-lg mt-3 md:2 ${!admin ? "md:px-10" : ""}`}>
      <div className="">
        {categories &&
          Object.entries(categories).map(([key, value]) => (
            <>
              <div className="text-center font-extrabold text-white bg-red-600 rounded my-3 text-2xl md:bg-[inherit] md:text-red-600 md:mt-10">
                {key.toUpperCase()}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]  gap-4">
                {value.map((p) =>
                  admin ? (
                    <AdminProductCard
                      key={p._id}
                      name={p.name}
                      price={p.price}
                      imagesrc={p.image}
                      product={p}
                      setModalState={setModalState!}
                      closeMessage={closeMessage}
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
          ))}
      </div>
    </div>
  );
}
export default Product_Display;
