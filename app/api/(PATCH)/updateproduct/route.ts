import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Products from "@/models/product-model";
import { ProductData } from "@/types/api";

async function PATCH (request: NextRequest) {
    const body = (await request.formData()) as Partial<ProductData>;
    const { id, name, price, image, category, subcategory, imageFile} = body;

    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected to MongoDB");
        if(category){const updatedProduct = await Products[category].findByIdAndUpdate(id, { name, price, image, subcategory }, { new: true });
        return NextResponse.json(updatedProduct);
    }
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}