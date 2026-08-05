import { NextRequest } from "next/server";
import CategoryModel from "@/models/product-categories";
import AppDatabase from "@/lib/db";
import { errorResponse, successResponse, ErrorCodes } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    await AppDatabase.getConnection();
    const docs = await CategoryModel.find({});
    const data: string[] = docs.map((doc) => doc.category);
    return successResponse(data, 200);
  } catch (error) {
    console.error("Error fetching categories", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to fetch categories", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await AppDatabase.getConnection();
    const { category, content } = await request.json();

    if (!category || typeof category !== "string") {
      return errorResponse(ErrorCodes.BAD_REQUEST, "Category is required", 400);
    }

    const newCategory = new CategoryModel({ category, content: content || "" });
    await newCategory.save();
    return successResponse({ message: "Category created successfully" }, 201);
  } catch (error) {
    console.error("Error creating category", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to create category", 500);
  }
}
