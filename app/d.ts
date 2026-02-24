import mongoose from "mongoose";
import fs from 'fs';
import ImageKit from "@imagekit/nodejs";

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

type ProductCategory = "beef" | "pork" | "processed" | "chicken";

async function Migrate(category: ProductCategory){
    const imagekit = new ImageKit({
        privateKey:""
    })
    console.log("created")
    await mongoose.connect("mongodb+srv://perry:Perry2009@cluster0.gja8m9y.mongodb.net/Quicksave?appName=Cluster0")
    console.log("connected")
    const products = await Products[category].find({})
    fs.writeFileSync('Pdata.json', JSON.stringify(products))
    const response = await imagekit.assets.list({
        path: `Quicksave/product_images/${category}`
    })
    console.log(response)
    fs.writeFileSync('imageData.json', JSON.stringify(response))
}
// ... (keep all your existing imports, schema, models, etc.)

// New function to update/upsert all pork products
async function update(category: ProductCategory) {
  await mongoose.connect("");
  console.log("Connected to MongoDB");

    const updatedProducts = JSON.parse(fs.readFileSync('Pdata.json').toString())



  for (const product of updatedProducts) {
    const { _id, ...updateData } = product; // remove _id from update payload

    await Products[category].updateOne(
      { _id: product._id },           // match by MongoDB _id
      { $set: updateData },           // update name, price, image, imageId, etc.
      { upsert: true }                // create if not exists (optional)
    );
    
    console.log(`Updated/created: ${product.name} (${product._id})`);
  }

  console.log("All pork products updated successfully");
  // mongoose.connection.close(); // optional - only if you're done
}
//Migrate('chicken')
update('chicken')
// Example usage (uncomment to run)
// updatePorkProductsWithImageIds().catch(console.error);