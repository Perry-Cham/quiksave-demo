import { errorResponse, successResponse, ErrorCodes } from "@/lib/api-response";
import {Products} from '@/models/product-model';
import AppDatabase from "@/lib/db";
import { productSchema } from "@/lib/validation";
import { imageKitHandler } from "@/lib/imagekit";

async function POST(request: Request, { params }: { params: Promise<{ category: string }> }) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const subcategory = formData.get("subcategory") as string;
  const {category} = await params;

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

    if (category) {
      let imageData: { url: string; id: string } = { url: "", id: "" };
      const imageFile = formData.get("imageFile");
      if (imageFile && imageFile instanceof File && imageFile.size > 0) {
        const uploadResponse = await imageKitHandler.upload(imageFile, imageFile.name, category);
        imageData.url = uploadResponse?.url as string;
        imageData.id = uploadResponse?.fileId as string;
        console.log(uploadResponse, imageData);
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
    }

    return errorResponse(ErrorCodes.BAD_REQUEST, "Category is required", 400);
  } catch (error) {
    console.error("Error adding product:", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to add product", 500);
  }
}

export { POST };
