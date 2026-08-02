import { NextRequest } from "next/server";
import CategoryModel from "@/models/product-categories";
import AppDatabase from "@/lib/db";
import { errorResponse, successResponse, ErrorCodes } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    await AppDatabase.getConnection();
    const docs = await CategoryModel.find({});
    const data: string[] = docs.map((doc) => doc.category);
    console.log("Fetched categories:", data);
    return successResponse(data, 200);
  } catch (error) {
    console.error("Error fetching categories", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to fetch categories", 500);
  }
}
  