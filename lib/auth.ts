import { APIError, betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
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
    throw: true, // still throw so middleware/route can catch if needed
    onError: (error, ctx) => {
      console.error("[BetterAuth API Error]" ,error)
    },
  },
});
