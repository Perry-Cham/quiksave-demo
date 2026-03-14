import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import CategoryModel from "@/models/product-categories";

export async function POST(request: NextRequest) {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const { category, content } = await request.json();
    const newCategory = new CategoryModel({ category, content: content || "" });
    await newCategory.save();
    return NextResponse.json({ message: "Category created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating category", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}