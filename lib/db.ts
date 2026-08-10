import mongoose from "mongoose";
import getConfig from "./env";

class AppDatabase {
  static #db: typeof mongoose | null = null;


  static async getConnection() {
    if (AppDatabase.#db) {
      return AppDatabase.#db;
    }
    const envs = getConfig();
    if (!envs?.mongo_uri) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    AppDatabase.#db = await mongoose.connect(envs.mongo_uri);
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
