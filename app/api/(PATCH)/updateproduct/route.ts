import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Products from "@/models/product-model";
import { findCategory } from "@/lib/api-model-helper";
import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!
});

export async function PATCH(request: NextRequest) {
  const body = await request.formData();
  const data = Object.fromEntries(body.entries());

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    const { id, name, price, subcategory } = data;
    let category = findCategory(data.category as string);

    if (category) {
      let imageUrl = data.image as string; // Default to existing image URL

      // Check if a new image file is uploaded
      const imageFile = body.get("image");
      if (imageFile && imageFile instanceof File  && imageFile.size > 0) {
        const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
        const fileString = fileBuffer.toString("base64");
        const uploadResponse = await imagekit.files.upload({
          file: fileString,
          fileName: `${id}-${Date.now()}`,
          folder: `/Quicksave/${category}`,
        });
        uploadResponse.url && (imageUrl = uploadResponse.url); // Get the uploaded image URL
      }

      const updatedProduct = await Products[category].findByIdAndUpdate(
        id,
        { name, price, image: imageUrl, subcategory },
        { new: true }
      );

      return NextResponse.json(updatedProduct, { status: 200 });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
