import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { errorResponse, successResponse, ErrorCodes } from "@/lib/api-response";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(ErrorCodes.BAD_REQUEST, "Invalid user ID format", 400);
    }

    const db = mongoose.connection.db;
    if (!db) {
      return errorResponse(ErrorCodes.DATABASE_ERROR, "Database connection failed", 500);
    }

    const usersCollection = db.collection("user");
    const sessionsCollection = db.collection("session");
    const accountsCollection = db.collection("account");

    await sessionsCollection.deleteMany({
      userId: new mongoose.Types.ObjectId(id),
    });

    await accountsCollection.deleteMany({
      userId: new mongoose.Types.ObjectId(id),
    });

    const result = await usersCollection.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return errorResponse(ErrorCodes.NOT_FOUND, "User not found", 404);
    }

    return successResponse({ message: "User deleted successfully" }, 200);
  } catch (error) {
    console.error("Error deleting user:", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to delete user", 500);
  }
}
