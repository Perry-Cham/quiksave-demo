import Product_Card from './product_card'
import axios from 'axios'
interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  subcategory: string;
}

const fetchProducts = async (product: string): Promise<Product[] | null> => {
      try{
        const response = await axios.get(`${process.env.NODE_URL}/api/getproducts/${product}`)
        console.log("hello")
        return response.data
      }catch(err){
        console.error(err)
        //alert("There was an issue fetching the products")
        return null
      }
    };
    
async function Product_Display({productName}: {productName: string}) {
const products = await fetchProducts(productName)
console.log("this is" + products)
 const categories = products?.reduce((acc, curr) => {
  // Ensure the array exists
  if (!acc[curr.subcategory]) {
    acc[curr.subcategory] = [];
  }
  // Always push the current product
  acc[curr.subcategory].push(curr);
  return acc;
}, {} as Record<string, Product[]>);
  return(
          <div className="bg-gray-100 p-1 pb-4 rounded-lg mt-3 md:2 mx-15 px-10">
   <div className="">     
      {Object.entries(categories).map(([key, value]) =>(
      <>
        <div className="text-center font-extrabold text-white bg-red-600 rounded my-3 text-2xl md:bg-[inherit] md:text-red-600 md:mt-10">{key.toUpperCase()}</div>
<div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]  gap-4">
        {value.map(p => (
        <Product_Card key={p._id} name={p.name} price={p.price} imagesrc={p.image}/>
      ))}
        </div>
      </>))}
      </div>
      </div>
    )
}
export default Product_Display