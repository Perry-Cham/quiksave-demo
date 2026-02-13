import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Products from "@/models/product-model";

async function PATCH (request: NextRequest) {
    const body = await request.json();
    const { category }: { category: "beef" | "processed" | "pork" | "chicken"} = body;
    const { id, ...updateData }= body;

    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected to MongoDB");
        const updatedProduct = await Products[category].findByIdAndUpdate(id, updateData, { new: true });
        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}