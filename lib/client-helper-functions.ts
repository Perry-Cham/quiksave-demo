import { ProductCategory, ProductDataClient } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";
import {Products} from "@/models/product-model";
import AppDatabase from "@/lib/db";

export async function FetchData(product: string):Promise<ProductDataClient[]>{

   try{
        await AppDatabase.getConnection();
        console.log("Connected to MongoDB");
        const ProductData = await Products.find({category: product});
        if (!ProductData.length) {
           throw new Error(`No data found for category: ${product}`);
        }
        return ProductData;
    } catch (error) {
        console.error("Error fetching products:", error, process.env.MONGO_URI);
        throw new Error("Failed to fetch products");
    }
}


