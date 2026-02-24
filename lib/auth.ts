import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";

await mongoose.connect(process.env.MONGO_URI!);

export const auth = betterAuth({
  database: mongodbAdapter(mongoose.connection.db!, {
    client: mongoose.connection.getClient(),
  }),
  emailAndPassword:{
    enabled:true
  },
  onAPIError: {
    throw: true,           // still throw so middleware/route can catch if needed
    onError: (error, ctx) => {
      console.error("[BetterAuth API Error]", {
        message: error.message,
        status: error.status,
        code: error.code,      // if present
        path: ctx?.path,
        method: ctx?.request?.method,
        // add user/session info if available and safe
      });

      // Optional: send to error tracking
      // Sentry.captureException(error, { extra: { path: ctx?.path } });
    },
}});
