import mongoose from "mongoose";
import path from "path";
import "dotenv/config";

// don't use alias here; resolve relative path from script location
import CategoryModel from "../models/product-categories.ts";

const entries = [
  {
    category: "beef",
    content:
      "Explore our premium selection of beef products, sourced from trusted farms and crafted to perfection. From succulent steaks to hearty roasts, our beef offerings are sure to satisfy your cravings and elevate your culinary experience. Discover the rich flavors and tender textures that make our beef a cut above the rest.",
  },
  {
    category: "chicken",
    content:
      "Discover our delectable range of chicken products, crafted to satisfy every palate. From tender cuts to flavorful marinades, our chicken offerings are perfect for any meal. Whether you're grilling, roasting, or sautéing, our high-quality chicken ensures a delicious dining experience. Explore our selection and elevate your culinary creations with our premium chicken products.",
  },
  {
    category: "pork",
    content:
      "Indulge in our premium selection of pork products, sourced from trusted farms and crafted to perfection. From succulent cuts to flavorful sausages, our pork offerings are sure to satisfy your cravings and elevate your culinary experience. Discover the rich flavors and tender textures that make our pork a cut above the rest.",
  },
  {
    category: "processed",
    content:
      "Explore our wide range of processed meats, carefully prepared to deliver exceptional taste and convenience. From seasoned sausages to premium deli meats, our processed offerings are perfect for quick meals or special occasions. Discover the quality and flavor that make our processed meats a favorite in kitchens across the region.",
  },
];

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI must be set to run seed script");
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  for (const entry of entries) {
    const existing = await CategoryModel.findOne({ category: entry.category });
    if (existing) {
      console.log(`category ${entry.category} already exists, skipping`);
    } else {
      await CategoryModel.create(entry);
      console.log(`created category ${entry.category}`);
    }
  }

  mongoose.disconnect();
  console.log("Seeding complete");
}

seed().catch((err) => {
  console.error("Seed failed", err);
  process.exit(1);
});
