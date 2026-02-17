import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Products from "@/models/product-model";
import ImageKit from "@imagekit/nodejs";
import { ProductCategory } from "@/types/api";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

export async function DELETE(request: NextRequest, { params }: { params: { category: string; id: string } }) {
  const { id } = params;
  const category = params.category as ProductCategory;

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    // Find the product to delete
    const product = await Products[category].findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Extract the image URL
    const imageUrl = product.image;
    const filePath = imageUrl.split("/Quicksave/")[1]; // Extract the file path after /Quicksave/

    // Delete the image from ImageKit
    if (filePath) {
      try {
        await imagekit.files.deleteFile(filePath);
      } catch (error) {
        console.error("Error deleting image from ImageKit:", error);
        return NextResponse.json(
          { error: "Failed to delete image from ImageKit" },
          { status: 500 }
        );
      }
    }

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