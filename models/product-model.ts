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

const Products ={
    beef:Beef, 
    chicken:Chicken,
    pork:Pork,
    processed:Processed
}
export const ProductModelKeys = Object.keys(Products) as (keyof typeof Products)[]
export default Products