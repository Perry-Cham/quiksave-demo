import mongoose from "mongoose";
import { NextResponse } from "next/server";

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
    console.log("Connected to MongoDB");

    // Get the users collection from the database
    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    // Query the user collection (better-auth uses 'user' collection by default)
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

    return NextResponse.json(formattedUsers, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
