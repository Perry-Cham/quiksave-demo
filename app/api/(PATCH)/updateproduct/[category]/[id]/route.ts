import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import {Products} from "@/models/product-model";
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
  const body = await request.formData();
  // const data = Object.fromEntries(body.entries());

  //Get form data
  const name = body.get("name") as string;
  const price = parseFloat(body.get("price") as string);
  const subcategory = body.get("subcategory") as string;
  const image = body.get("image") as string;

  // getAll returns an array of values for the field name
  const imageFile = body.get("imageFile") as File;

  // take the first element and name it Imagefile (lowercase 'f' to match usage)
  console.log(
    "The image has been uploaded here",
    imageFile,
    imageFile instanceof File,
    imageFile.size > 0,
  );
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    //   const { name, price, subcategory } = body;
    const oldProduct = await Products.findById(id);
    const oldImageId = oldProduct.imageId;
   
    if (category) {
      let imageUrl = image as string;
      let imageId = oldImageId; // Default to existing image URL

      // Check if a new image file is uploaded;
      if (imageFile && imageFile instanceof File && imageFile.size > 0) {
        console.log("THE IMAGE IS IN HERE");
        const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
        const fileString = fileBuffer.toString("base64");
        const uploadResponse = await imagekit.files.upload({
          file: fileString,
          fileName: `${imageFile.name}-${Date.now()}`,
          folder: `/Quicksave/product_images/${category}`,
        });

        uploadResponse.url && (imageUrl = uploadResponse.url); // Get the uploaded image URL
        uploadResponse.fileId && (imageId = uploadResponse.fileId);
        //Delete Old Image
      console.log("The old image id is", oldImageId);
        await imagekit.files.delete(oldImageId); 
      }

      const updatedProduct = await Products.findByIdAndUpdate(id, {
        name,
        price,
        image: imageUrl,
        imageId: imageId,
        subcategory,
      });

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
