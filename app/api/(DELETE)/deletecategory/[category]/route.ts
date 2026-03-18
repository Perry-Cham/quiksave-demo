import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Products } from "@/models/product-model";
import CategoryModel from "@/models/product-categories";
import ImageKit from "@imagekit/nodejs";
import { ProductCategory } from "@/types/api";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  const categoryName = category as ProductCategory;

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB", categoryName);

    // Confirm category exists
    const existingCategory = await CategoryModel.findOne({ category: categoryName });
    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Fetch all products in this category
    const products = await Products.find({ category: categoryName });

    // Delete associated images from ImageKit
    await Promise.all(
      products.map(async (product) => {
        const imageId = (product as any).imageId as string | undefined;
        if (imageId) {
          try {
            await imagekit.files.delete(imageId);
          } catch (error) {
            console.error("Error deleting image from ImageKit:", error);
          }
        }
      })
    );

    // Remove products and category document
    await Products.deleteMany({ category: categoryName });
    await CategoryModel.deleteOne({ category: categoryName });

    return NextResponse.json(
      { message: "Category and its products deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
