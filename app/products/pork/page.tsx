import Intro from "@/app/custom components/intro";
import Product_Display from "@/app/custom components/product_display";
function Pork_Page(){
  const message = "Indulge in our premium selection of pork products, sourced from trusted farms and crafted to perfection. From succulent cuts to flavorful sausages, our pork offerings are sure to satisfy your cravings and elevate your culinary experience. Discover the rich flavors and tender textures that make our pork a cut above the rest."
  const title = "Pork"
    return(
      <div>
        <Intro title={title} message={message}/>
        <Product_Display productName={"pork"}/>
      </div>
    )
}
export default Pork_Page;