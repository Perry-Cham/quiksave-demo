import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {Products} from '@/models/product-model';
import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function POST(request: Request, { params }: { params: Promise<{ category: string }> }) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const subcategory = formData.get("subcategory") as string;
  const {category} = await params;

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    if (category) {
      let imageData: { url: string; id: string } = { url: "", id: "" }; // Initialize imageUrl
      // Check if an image file is uploaded
      const imageFile = formData.get("imageFile");
      if (imageFile && imageFile instanceof File && imageFile.size > 0) {
        const fileBuffer = Buffer.from(await imageFile.arrayBuffer());
        const fileString = fileBuffer.toString("base64");
        const uploadResponse = await imagekit.files.upload({
          file: fileString,
          fileName: imageFile.name,
          folder: `/Quicksave/product_images/${category}`,
        });
        imageData.url = uploadResponse.url as string;
        imageData.id = uploadResponse.fileId as string;
        console.log(uploadResponse, imageData);
      }

      const newProduct = await Products.create({
        name,
        price,
        image: imageData.url,
        imageId: imageData.id,
        category:category,
        subcategory,
      });
      return NextResponse.json(newProduct, {status: 200});
    }else {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 },
      );
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
