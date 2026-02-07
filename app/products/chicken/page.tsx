import Intro from "@/app/components/intro";
import Product_Display from "@/app/components/product_display";

function Chicken_Page(){
  const message = "Discover our delectable range of chicken products, crafted to satisfy every palate. From tender cuts to flavorful marinades, our chicken offerings are perfect for any meal. Whether you're grilling, roasting, or sautéing, our high-quality chicken ensures a delicious dining experience. Explore our selection and elevate your culinary creations with our premium chicken products."
  const title = "Chicken"
    return(
      <div>
        <Intro title={title} message={message}/>
        <Product_Display productName={"chicken"}/>
      </div>
    )
}

export default Chicken_Page;