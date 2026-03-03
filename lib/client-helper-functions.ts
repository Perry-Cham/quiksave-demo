import { ProductCategory, ProductDataClient } from "@/types/api";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Products from "@/models/product-model";

export async function FetchData(product: ProductCategory):Promise<ProductDataClient[]>{

   try{
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected to MongoDB");
        const ProductModel = Products[product];
        if (!ProductModel) {
           throw new Error(`No model found for category: ${product}`);
        }
        console.log(ProductModel)
        const products = await ProductModel.find({});
        return products;
    } catch (error) {
        console.error("Error fetching products:", error, process.env.MONGO_URI);
        throw new Error("Failed to fetch products");
    }
}


