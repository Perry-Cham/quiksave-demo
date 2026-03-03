import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Products from "@/models/product-model";
import { findCategory } from "@/lib/api-model-helper";
import ImageKit from "@imagekit/nodejs";
import { ProductCategory, ProductData } from "@/types/api";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});
interface params {
  category: ProductCategory;
  id: String;
}
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<params> },
) {
  const { id, category } = await params;
  const body = await request.json();
 // const data = Object.fromEntries(body.entries());
  console.log("Received data", body);

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    const { name, price, subcategory } = body;
    const oldProduct = await Products[category].findById(id);
    const oldImageId = oldProduct.imageId;
    if (category) {
      let imageUrl = body.image as string;
      let imageId = ""; // Default to existing image URL

      // Check if a new image file is uploaded
      const imageFile = body.imageFile;
      if (imageFile && imageFile instanceof File && imageFile.size > 0) {
        console.log("THE IMAGE IS IN HERE");
        const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
        const fileString = fileBuffer.toString("base64");
        const uploadResponse = await imagekit.files.upload({
          file: fileString,
          fileName: `${id}-${Date.now()}`,
          folder: `/Quicksave/${category}`,
        });
        
        console.log(uploadResponse);
        uploadResponse.url && (imageUrl = uploadResponse.url); // Get the uploaded image URL
        uploadResponse.fileId && (imageId = uploadResponse.fileId);
        //Delete Old Image
        await imagekit.files.delete(oldImageId);
      }

      const updatedProduct = await Products[category].findByIdAndUpdate(
        id,
        { name, price, image: imageUrl, imageId: imageId, subcategory },
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
