import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Products from "@/models/product-model";
import { findCategory } from "@/lib/api-model-helper";
import ImageKit from "@imagekit/nodejs";

export async function PATCH(request: NextRequest) {
  const body = await request.formData();
  const data = Object.fromEntries(body.entries());

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");
    const { id, name, price, image, subcategory } = data;
    let category = findCategory(data.category as string);
    
      if(category){
        const updatedProduct = await Products[category].findByIdAndUpdate(
          id,
          { name, price, image, subcategory },
          { new: true },
        );
        return NextResponse.json(updatedProduct, { status: 200 });
      }
    
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}
