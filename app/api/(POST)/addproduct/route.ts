import mongoose from "mongoose";
import Products from "@/models/product-model";
import { NextResponse } from "next/server";
import { ProductData } from "@/types/api";
import { ProductCategory } from "@/types/api";
import { findCategory } from "@/lib/api-model-helper";
import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function POST(request: Request) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const { name, price, subcategory } = data;
  let category = data.category as ProductCategory;

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    if (category !== undefined) {
let imageUrl: string | undefined  = ""; // Initialize imageUrl 
      // Check if an image file is uploaded
      const imageFile = formData.get("image");
      if (imageFile && imageFile instanceof File && imageFile.size > 0) {
        const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
        const fileString = fileBuffer.toString("base64");
        const uploadResponse = await imagekit.files.upload({
          file: fileString,
          fileName: `${name}-${Date.now()}`,
          folder: `/Quicksave/${category}`,
        });
       imageUrl = uploadResponse.url; // Get the uploaded image URL
      }

      const newProduct = await Products[category].create({
        name,
        price,
        image: imageUrl,
        subcategory,
      });
      return NextResponse.json(newProduct);
    }
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 },
    );
  }
}

export { POST };
