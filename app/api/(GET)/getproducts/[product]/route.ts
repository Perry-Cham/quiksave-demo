import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Products from "@/models/product-model";

export async function GET(request: NextRequest, { params }: { params: Promise<{ product: "beef" | "chicken" | "pork" | "processed" }> }) {
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected to MongoDB");
        let { product } = await params;
        const ProductModel = Products[product];
        if (!ProductModel) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        const products = await ProductModel.find({});
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error, process.env.MONGO_URI);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}