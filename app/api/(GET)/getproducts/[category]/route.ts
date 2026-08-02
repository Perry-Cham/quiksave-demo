import { NextRequest } from "next/server";
import { Products } from "@/models/product-model";
import AppDatabase from "@/lib/db";
import { errorResponse, successResponse, ErrorCodes } from "@/lib/api-response";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> },
) {
  try {
    await AppDatabase.getConnection();
    console.log("Connected to MongoDB");
    const { category } = await params;
    console.log("Received category:", category, await params);
    const products = await Products.find({ category });
    return successResponse(products, 200);
  } catch (error) {
    console.error("Error fetching products:", error, process.env.MONGO_URI);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to fetch products", 500);
  }
}
