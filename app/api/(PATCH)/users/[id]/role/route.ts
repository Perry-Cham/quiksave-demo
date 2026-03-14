import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

interface UpdateRoleRequest {
  role: "user" | "admin";
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    const { id } = await params;
    const body: UpdateRoleRequest = await request.json();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    // Validate role
    if (!body.role || !["user", "admin"].includes(body.role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be 'user' or 'admin'" },
        { status: 400 }
      );
    }

    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const usersCollection = db.collection("user");

    // Update user role
    const result = await usersCollection.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { role: body.role } },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User role updated successfully",
        user: {
          _id: result.value._id.toString(),
          name: result.value.name,
          email: result.value.email,
          role: result.value.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Failed to update user role" },
      { status: 500 }
    );
  }
}
