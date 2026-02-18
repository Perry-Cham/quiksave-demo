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
      let imageUrl = data.image as string; 
      let imageId = ""// Default to existing image URL

      // Check if a new image file is uploaded
      const imageFile = body.get("imageFile");
      if (imageFile && imageFile instanceof File  && imageFile.size > 0) {
        console.log("THE IMAGE IS IN HERE")
        const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
        const fileString = fileBuffer.toString("base64");
        const uploadResponse = await imagekit.files.upload({
          file: fileString,
          fileName: `${id}-${Date.now()}`,
          folder: `/Quicksave/${category}`,
        });
        console.log(uploadResponse)
        uploadResponse.url && (imageUrl = uploadResponse.url); // Get the uploaded image URL
        uploadResponse.fileId && (imageId = uploadResponse.fileId)
      }

      const updatedProduct = await Products[category].findByIdAndUpdate(
        id,
        { name, price, image: imageUrl, imageId: imageId, subcategory },
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
