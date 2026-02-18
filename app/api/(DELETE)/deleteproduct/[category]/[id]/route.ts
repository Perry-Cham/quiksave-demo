import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Products from "@/models/product-model";
import ImageKit from "@imagekit/nodejs";
import { ProductCategory } from "@/types/api";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

export async function DELETE(request: NextRequest, {params}: {params: Promise<{id:string, category:string}>}) {
  const data = await params;
  const { id } = data;
  const category = data.category as ProductCategory;

  
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB", category, id);

    // Find the product to delete
    const product = await Products[category].findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Extract the image Id
    const image = product.imageId;

    // Delete the image from ImageKit (if any)
    if (image) {
      try {
        await imagekit.files.delete(image);
        console.log("image deleted");
      } catch (error) {
        console.error("Error deleting image from ImageKit:", error);
      }
    }

    try {
      // Delete the product from MongoDB
      await Products[category].findByIdAndDelete(id);
      return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting product:", error);
      return NextResponse.json(
        { error: "Failed to delete product" },
        { status: 500 }
      );
    }
}
  