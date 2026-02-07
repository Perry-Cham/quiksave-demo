
import Intro from "@/app/components/intro";
import Product_Display from "@/app/components/product_display";
function Beef_Page(){
const message = "Explore our premium selection of beef products, sourced from trusted farms and crafted to perfection. From succulent steaks to hearty roasts, our beef offerings are sure to satisfy your cravings and elevate your culinary experience. Discover the rich flavors and tender textures that make our beef a cut above the rest."
const title = "Beef"
  return(
    <div>
      <Intro title={title} message={message}/>
      <Product_Display productName={"beef"}/>
    </div>
  )
}
export default Beef_Page;