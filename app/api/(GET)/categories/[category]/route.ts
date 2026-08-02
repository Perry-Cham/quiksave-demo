import { NextRequest } from "next/server";
import CategoryModel from "@/models/product-categories";
import AppDatabase from "@/lib/db";
import { errorResponse, successResponse, ErrorCodes } from "@/lib/api-response";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ category: string }>;
  },
) {
  try {
    await AppDatabase.getConnection();
    const { category } = await params;
    const doc = await CategoryModel.findOne({ category });
    console.log(category);
    if (!doc) {
      return errorResponse(ErrorCodes.NOT_FOUND, "Category not found", 404);
    }
    return successResponse(doc, 200);
  } catch (error) {
    console.error("Error fetching category", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to fetch category", 500);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> },
) {
  try {
    await AppDatabase.getConnection();
    const { content } = await request.json();
    const { category } = await params;
    console.log("Updating category:", category, "with content:", content);
    await CategoryModel.findOneAndUpdate(
      { category },
      { content },
      { new: true, upsert: true },
    );
    return successResponse({ message: "Category updated successfully" }, 200);
  } catch (error) {
    console.error("Error updating category", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to update category", 500);
  }
}
