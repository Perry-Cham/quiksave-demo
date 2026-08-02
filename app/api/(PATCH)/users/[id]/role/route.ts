import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { errorResponse, successResponse, ErrorCodes } from "@/lib/api-response";

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(ErrorCodes.BAD_REQUEST, "Invalid user ID format", 400);
    }

    if (!body.role || !["user", "admin"].includes(body.role)) {
      return errorResponse(ErrorCodes.BAD_REQUEST, "Invalid role. Must be 'user' or 'admin'", 400);
    }

    const db = mongoose.connection.db;
    if (!db) {
      return errorResponse(ErrorCodes.DATABASE_ERROR, "Database connection failed", 500);
    }

    const usersCollection = db.collection("user");

    const result = await usersCollection.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { role: body.role } },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return errorResponse(ErrorCodes.NOT_FOUND, "User not found", 404);
    }

    return successResponse(
      {
        message: "User role updated successfully",
        user: {
          _id: result.value._id.toString(),
          name: result.value.name,
          email: result.value.email,
          role: result.value.role,
        },
      },
      200
    );
  } catch (error) {
    console.error("Error updating user role:", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to update user role", 500);
  }
}
