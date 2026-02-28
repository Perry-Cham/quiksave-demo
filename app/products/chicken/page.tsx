import Intro from "@/app/custom components/intro";
import Product_Display from "@/app/custom components/product_display";
import { FetchData } from "@/lib/client-helper-functions";

async function Chicken_Page(){
  const message = "Discover our delectable range of chicken products, crafted to satisfy every palate. From tender cuts to flavorful marinades, our chicken offerings are perfect for any meal. Whether you're grilling, roasting, or sautéing, our high-quality chicken ensures a delicious dining experience. Explore our selection and elevate your culinary creations with our premium chicken products."
  const title = "Chicken"

   const products = await FetchData("chicken");
    return(
      <div>
        <Intro title={title} message={message}/>
        <Product_Display products={products}/>
      </div>
    )
}

export default Chicken_Page;