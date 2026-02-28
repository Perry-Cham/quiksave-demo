import Intro from "@/app/custom components/intro";
import Product_Display from "@/app/custom components/product_display";
import { FetchData } from "@/lib/client-helper-functions";


async function Beef_Page() {
  const message =
    "Explore our premium selection of beef products, sourced from trusted farms and crafted to perfection. From succulent steaks to hearty roasts, our beef offerings are sure to satisfy your cravings and elevate your culinary experience. Discover the rich flavors and tender textures that make our beef a cut above the rest.";
  const title = "Beef";

  const products = await FetchData("beef");
  return (
    <div>
      <Intro title={title} message={message} />
      <Product_Display products={products} />
    </div>
  );
}
export default Beef_Page;
