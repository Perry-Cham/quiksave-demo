import mongoose from "mongoose";

class AppDatabase {
  static #db: typeof mongoose | null = null;

  static async getConnection() {
    if (AppDatabase.#db) {
      return AppDatabase.#db;
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    AppDatabase.#db = await mongoose.connect(process.env.MONGO_URI);
    return AppDatabase.#db;
  }

  static async disconnectDB() {
    if (AppDatabase.#db) {
      await mongoose.disconnect();
      AppDatabase.#db = null;
    }
  }
}

export default AppDatabase;
