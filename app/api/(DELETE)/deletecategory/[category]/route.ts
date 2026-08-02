import { NextRequest } from "next/server";
import { Products } from "@/models/product-model";
import CategoryModel from "@/models/product-categories";
import { ProductCategory } from "@/types/api";
import AppDatabase from "@/lib/db";
import { imageKitHandler } from "@/lib/imagekit";
import { errorResponse, successResponse, ErrorCodes } from "@/lib/api-response";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  const categoryName = category as ProductCategory;

  try {
    await AppDatabase.getConnection();
    console.log("Connected to MongoDB", categoryName);

    const existingCategory = await CategoryModel.findOne({ category: categoryName });
    if (!existingCategory) {
      return errorResponse(ErrorCodes.NOT_FOUND, "Category not found", 404);
    }

    const products = await Products.find({ category: categoryName });

    await Promise.all(
      products.map(async (product) => {
        const imageId = (product as any).imageId as string | undefined;
        if (imageId) {
          try {
            await imageKitHandler.delete(imageId);
          } catch (error) {
            console.error("Error deleting image from ImageKit:", error);
          }
        }
      })
    );

    await Products.deleteMany({ category: categoryName });
    await CategoryModel.deleteOne({ category: categoryName });

    return successResponse({ message: "Category and its products deleted successfully" }, 200);
  } catch (error) {
    console.error("Error deleting category:", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to delete category", 500);
  }
}
