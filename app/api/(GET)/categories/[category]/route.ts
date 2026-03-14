import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import CategoryModel from "@/models/product-categories";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { category: string };
  },
) {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const { category } = params;
    const doc = await CategoryModel.findOne({ category });
    if (!doc) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json(doc);
  } catch (error) {
    console.error("Error fetching category", error);
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { category: string } }) {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const { content } = await request.json();
    const doc = await CategoryModel.findOneAndUpdate(
      { category: params.category },
      { content },
      { new: true, upsert: true }
    );
    return NextResponse.json({ message: "Category updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating category", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}
