import { NextRequest, NextResponse } from "next/server";
import { Products } from "@/models/product-model";
import AppDatabase from "@/lib/db";
import { imageKitHandler } from "@/lib/imagekit";
import {successResponse, errorResponse, ErrorCodes} from "@/lib/api-response";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string, category: string }> }) {
  const data = await params;
  const { id } = data;


  // Connect to MongoDB
  await AppDatabase.getConnection();
  console.log("Connected to MongoDB");

  // Find the product to delete
  const product = await Products.findById(id);
  if (!product) {
    return errorResponse(ErrorCodes.NOT_FOUND, "Product not found", 404);
  }

  // Extract the image Id
  const image = product.imageId;

  // Delete the image from ImageKit (if any)
  if (image) {
    try {
      await imageKitHandler.delete(image);
      console.log("image deleted");
    } catch (error) {
      console.error("Error deleting image from ImageKit:", error);
    }
  }

  try {
    // Delete the product from MongoDB
    await Products.findByIdAndDelete(id);
    return successResponse({ message: "Product deleted successfully" }, 200);
  } catch (error) {
    console.error("Error deleting product:", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to delete product", 500);
  }
}
