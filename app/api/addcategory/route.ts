import mongoose from "mongoose";
import { NextRequest } from "next/server";
import CategoryModel from "@/models/product-categories";
import { errorResponse, successResponse, ErrorCodes } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const { category, content } = await request.json();
    const newCategory = new CategoryModel({ category, content: content || "" });
    await newCategory.save();
    return successResponse({ message: "Category created successfully" }, 201);
  } catch (error) {
    console.error("Error creating category", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to create category", 500);
  }
}