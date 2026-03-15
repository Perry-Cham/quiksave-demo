import { ProductCategory, ProductDataClient } from "@/types/api";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import {Products} from "@/models/product-model";

export async function FetchData(product: string):Promise<ProductDataClient[]>{

   try{
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected to MongoDB");
        const ProductData = Products.find({category: product});
        if (!ProductData) {
           throw new Error(`No data found for category: ${product}`);
        }
        return ProductData;
    } catch (error) {
        console.error("Error fetching products:", error, process.env.MONGO_URI);
        throw new Error("Failed to fetch products");
    }
}


