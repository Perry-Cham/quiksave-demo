import Intro from "@/app/custom components/intro";
import Product_Display from "@/app/custom components/product_display";

function Processed_Meats_Page() {
  const message = "Explore our wide range of processed meats, carefully prepared to deliver exceptional taste and convenience. From seasoned sausages to premium deli meats, our processed offerings are perfect for quick meals or special occasions. Discover the quality and flavor that make our processed meats a favorite in kitchens across the region."
  const title = "Processed Meats"
    return(
      <div>
        <Intro title={title} message={message}/>
        <Product_Display productName={"processed"}/>
      </div>
    )
}
export default Processed_Meats_Page;