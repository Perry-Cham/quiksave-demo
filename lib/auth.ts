import { betterAuth, APIError } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { errorResponse, ErrorCodes } from "./api-response";
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGO_URI!);

export const auth = betterAuth({
  database: mongodbAdapter(mongoose.connection.db!, {
    client: mongoose.connection.getClient(),
  }),
  emailAndPassword: {
    enabled: true,
  },
  onAPIError: {
    throw: true,
    onError: (error, ctx) => {
      if (error instanceof APIError) {
        console.error("[BetterAuth API Error]", {
          message: error.message,
          status: error.status,
          // method: ctx?.,
        });
      } else if (error instanceof Error) {
        console.error("General Error:", error.message);
      }
    },
  },
});
