import mongoose from "mongoose";
import { errorResponse, successResponse, ErrorCodes } from "@/lib/api-response";

interface UserData {
  _id: string;
  name: string;
  email: string;
  role?: string;
  createdAt?: Date;
  emailVerified?: boolean;
}

export async function GET(request: Request) {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const db = mongoose.connection.db;
    if (!db) {
      return errorResponse(ErrorCodes.DATABASE_ERROR, "Database connection failed", 500);
    }

    const usersCollection = db.collection("user");
    const users = await usersCollection
      .find({})
      .project({
        _id: 1,
        name: 1,
        email: 1,
        role: 1,
        createdAt: 1,
        emailVerified: 1,
      })
      .toArray();

    const formattedUsers: UserData[] = users.map((user: any) => ({
      _id: user._id.toString(),
      name: user.name || "N/A",
      email: user.email,
      role: user.role || "user",
      createdAt: user.createdAt,
      emailVerified: user.emailVerified || false,
    }));

    return successResponse(formattedUsers, 200);
  } catch (error) {
    console.error("Error fetching users:", error);
    return errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to fetch users", 500);
  }
}
