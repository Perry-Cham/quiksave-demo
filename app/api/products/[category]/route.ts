import { NextRequest } from "next/server";
import { Products } from "@/models/product-model";
import AppDatabase from "@/lib/db";
import { errorResponse, successResponse, ErrorCodes } from "@/lib/api-response";
import { productSchema } from "@/lib/validation";
import { imageKitHandler } from "@/lib/imagekit";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> },
) {
  try {
    await AppDatabase.getConnection();
    const { category } = await params;
    const products = await Products.find({ category });
    return successResponse(products, 200);
  } catch (error) {
    console.error("Error fetching products:", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to fetch products", 500);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> },
) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const subcategory = formData.get("subcategory") as string;
  const { category } = await params;

  try {
    await AppDatabase.getConnection();

    try {
      productSchema.parse({ name, price, subcategory });
    } catch (validationError) {
      return errorResponse(ErrorCodes.VALIDATION_ERROR, "Invalid product data", 400, {
        details: validationError instanceof Error ? validationError.message : undefined,
      });
    }

    if (!category) {
      return errorResponse(ErrorCodes.BAD_REQUEST, "Category is required", 400);
    }

    let imageData = { url: "", id: "" };
    const imageFile = formData.get("imageFile");
    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      const uploadResponse = await imageKitHandler.upload(imageFile, imageFile.name, category);
      imageData.url = uploadResponse?.url as string;
      imageData.id = uploadResponse?.fileId as string;
    }

    const newProduct = await Products.create({
      name,
      price,
      image: imageData.url,
      imageId: imageData.id,
      category,
      subcategory,
    });

    return successResponse(newProduct, 200);
  } catch (error) {
    console.error("Error adding product:", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to add product", 500);
  }
}
