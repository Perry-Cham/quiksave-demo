import { NextRequest } from "next/server";
import { Products } from "@/models/product-model";
import AppDatabase from "@/lib/db";
import { errorResponse, successResponse, ErrorCodes } from "@/lib/api-response";
import { productSchema } from "@/lib/validation";
import { imageKitHandler } from "@/lib/imagekit";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ category: string; id: string }> },
) {
  const { id, category } = await params;
  const body = await request.formData();
  const name = body.get("name") as string;
  const price = parseFloat(body.get("price") as string);
  const subcategory = body.get("subcategory") as string;
  const image = body.get("image") as string;
  const imageFile = body.get("imageFile") as File;

  try {
    await AppDatabase.getConnection();

    try {
      productSchema.parse({ name, price, subcategory });
    } catch (validationError) {
      return errorResponse(ErrorCodes.VALIDATION_ERROR, "Invalid product data", 400, {
        details: validationError instanceof Error ? validationError.message : undefined,
      });
    }

    const oldProduct = await Products.findById(id);
    if (!oldProduct) {
      return errorResponse(ErrorCodes.NOT_FOUND, "Product not found", 404);
    }

    const oldImageId = oldProduct.imageId;
    let imageUrl = image as string;
    let imageId = oldImageId;

    if (imageFile && imageFile instanceof File && imageFile.size > 0) {
      const uploadResponse = await imageKitHandler.upload(imageFile, imageFile.name, category);
      uploadResponse?.url && (imageUrl = uploadResponse.url);
      uploadResponse?.fileId && (imageId = uploadResponse.fileId);
      await imageKitHandler.delete(oldImageId);
    }

    const updatedProduct = await Products.findByIdAndUpdate(id, {
      name,
      price,
      image: imageUrl,
      imageId,
      subcategory,
    });

    return successResponse(updatedProduct, 200);
  } catch (error) {
    console.error("Error updating product:", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to update product", 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; category: string }> },
) {
  const { id } = await params;

  try {
    await AppDatabase.getConnection();
    const product = await Products.findById(id);
    if (!product) {
      return errorResponse(ErrorCodes.NOT_FOUND, "Product not found", 404);
    }

    const image = product.imageId;
    if (image) {
      try {
        await imageKitHandler.delete(image);
      } catch (error) {
        console.error("Error deleting image from ImageKit:", error);
      }
    }

    await Products.findByIdAndDelete(id);
    return successResponse({ message: "Product deleted successfully" }, 200);
  } catch (error) {
    console.error("Error deleting product:", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to delete product", 500);
  }
}
