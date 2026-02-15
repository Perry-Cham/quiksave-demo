import mongoose from "mongoose";
import Products from "@/models/product-model";
import { NextResponse } from "next/server";
import { ProductData } from "@/types/api";


async function POST(request: Request) {
  const formData = (await request.formData()) as Partial<ProductData>;
  const { name, price, image, category, subcategory, imageFile } = formData;

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");
    if (category !== undefined) {
      const newProduct = await Products[category].create({
        name,
        price,
        image,
        subcategory,
      });
      return NextResponse.json(newProduct);
    }
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 },
    );
  }
}

export { POST };
