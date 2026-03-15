import mongoose from "mongoose";
interface Product{
  name: string,
  price: number,
  image: string,
  imageId?: string,
  subcategory: string
}
const schema = new mongoose.Schema<Product>({
  name: String,
  price: Number,
  image: String,
  imageId: String,
  subcategory: String
})

const Beef = mongoose.models.Beef || mongoose.model("Beef", schema, "Beef")
const Chicken = mongoose.models.Chicken || mongoose.model("Chicken", schema, "Chicken")
const Pork = mongoose.models.Pork || mongoose.model("Pork", schema, "Pork")
const Processed = mongoose.models.Processed || mongoose.model("Processed", schema, "Processed")  

//This should be preserved
export const  Products = mongoose.models.products || mongoose.model("products", schema, "products")

//TO BE REMOVED LATER
const Products2 ={
    beef:Beef, 
    chicken:Chicken,
    pork:Pork,
    processed:Processed
}
export const ProductModelKeys = Object.keys(Products2) as (keyof typeof Products2)[]
export default Products2