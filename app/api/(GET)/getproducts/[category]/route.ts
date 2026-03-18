import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { Products } from "@/models/product-model";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> },
) {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");
    let { category } = await params;
    console.log("Received category:", category, await params);
    const products = await Products.find({ category });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error, process.env.MONGO_URI);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
