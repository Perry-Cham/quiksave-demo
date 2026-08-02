import { NextRequest } from "next/server";
import { Products } from "@/models/product-model";
import { ProductCategory } from "@/types/api";
import AppDatabase from "@/lib/db";
import { productSchema } from "@/lib/validation";
import { imageKitHandler } from "@/lib/imagekit";
import { errorResponse, successResponse, ErrorCodes } from "@/lib/api-response";

interface params {
  category: ProductCategory;
  id: string;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<params> },
) {
  const { id, category } = await params;
  const body = await request.formData();
  const name = body.get("name") as string;
  const price = parseFloat(body.get("price") as string);
  const subcategory = body.get("subcategory") as string;
  const image = body.get("image") as string;
  const imageFile = body.get("imageFile") as File;

  console.log(
    "The image has been uploaded here",
    imageFile,
    imageFile instanceof File,
    imageFile.size > 0,
  );

  try {
    await AppDatabase.getConnection();
    console.log("Connected to MongoDB");

    try {
      const data = productSchema.parse({
        name,
        price,
        subcategory,
      });
      console.log("Validated data:", data);
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

    if (category) {
      let imageUrl = image as string;
      let imageId = oldImageId;

      if (imageFile && imageFile instanceof File && imageFile.size > 0) {
        console.log("THE IMAGE IS IN HERE");
        const uploadResponse = await imageKitHandler.upload(imageFile, imageFile.name, category);

        uploadResponse?.url && (imageUrl = uploadResponse.url);
        uploadResponse?.fileId && (imageId = uploadResponse.fileId);
        console.log("The old image id is", oldImageId);
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
    }

    return errorResponse(ErrorCodes.BAD_REQUEST, "Category is required", 400);
  } catch (error) {
    console.error("Error updating product:", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to update product", 500);
  }
}
