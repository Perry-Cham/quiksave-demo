import { ProductCategory } from "@/types/api";
import { ProductModelKeys } from "@/models/product-model";
const Products_List: ProductCategory[] = [
    "beef","pork","processed","chicken"
]
export function findCategory(category:string): ProductCategory | undefined {
    if (!Array.isArray(Products_List) || typeof category !== 'string') return undefined;
     return Products_List.find(item => typeof item === 'string' && item.toLowerCase() === category);
}

    