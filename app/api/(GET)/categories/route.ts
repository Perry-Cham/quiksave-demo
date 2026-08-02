import { NextRequest, NextResponse } from "next/server";
import CategoryModel from "@/models/product-categories";
import AppDatabase from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    await AppDatabase.getConnection();
    const docs = await CategoryModel.find({});
    let data: string[] = [];
    docs.forEach(doc => data.push(doc.category));
    console.log("Fetched categories:", data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
  