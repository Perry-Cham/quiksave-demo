import mongoose from "mongoose";
import { NextRequest } from "next/server";
import CategoryModel from "@/models/product-categories";
import { errorResponse, successResponse, ErrorCodes } from "@/lib/api-response";
import { z } from "zod";
import { withValidation } from "@/lib/middleware";


const categoryPageSchema = z.object({
  category: z.string().min(1, "Category is required"),
  content: z.string().optional(),
});

const handler = async (data: any, ctx: any) => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const { category, content } = await data;
    const newCategory = new CategoryModel({ category, content: content || "" });
    await newCategory.save();
    return successResponse({ message: "Category created successfully" }, 201);
  } catch (error) {
    console.error("Error creating category", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to create category", 500);
  }
};

export const POST = withValidation({
  requestSchema: categoryPageSchema,
  responseSchema: z.object({
    message: z.string(),
  }),
  requireAuth: true,
})(handler);

