import Intro from "@/app/custom components/intro";
import Product_Display from "@/app/custom components/product_display";
import { FetchData } from "@/lib/client-helper-functions";
import mongoose from "mongoose";
import CategoryModel from "@/models/product-categories";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// hard‑coded list used during build so that every known category is
// prerendered. The actual text is pulled from the database at runtime,
// and a missing document will be inserted automatically with the default
// blurb below. This keeps the old copy out of the component while still
// allowing the site to work before the DB has been seeded.
const defaultMessages: Record<string, string> = {
  beef:
    "Explore our premium selection of beef products, sourced from trusted farms and crafted to perfection. From succulent steaks to hearty roasts, our beef offerings are sure to satisfy your cravings and elevate your culinary experience. Discover the rich flavors and tender textures that make our beef a cut above the rest.",
  chicken:
    "Discover our delectable range of chicken products, crafted to satisfy every palate. From tender cuts to flavorful marinades, our chicken offerings are perfect for any meal. Whether you're grilling, roasting, or sautéing, our high-quality chicken ensures a delicious dining experience. Explore our selection and elevate your culinary creations with our premium chicken products.",
  pork:
    "Indulge in our premium selection of pork products, sourced from trusted farms and crafted to perfection. From succulent cuts to flavorful sausages, our pork offerings are sure to satisfy your cravings and elevate your culinary experience. Discover the rich flavors and tender textures that make our pork a cut above the rest.",
  processed:
    "Explore our wide range of processed meats, carefully prepared to deliver exceptional taste and convenience. From seasoned sausages to premium deli meats, our processed offerings are perfect for quick meals or special occasions. Discover the quality and flavor that make our processed meats a favorite in kitchens across the region.",
};

export async function generateStaticParams() {
  // static list ensures pages build even when DB is unreachable / empty
  return Object.keys(defaultMessages).map((cat) => ({ category: cat }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  // connect once per request; no harm if already connected
  await mongoose.connect(process.env.MONGO_URI!);

  let message = defaultMessages[category] || "";

  try {
    const doc = await CategoryModel.findOne({ category });
    if (doc) {
      message = doc.content;
    } else if (message) {
      // create missing document with the hard‑coded copy
   //   await CategoryModel.create({ category, content: message });
    }
  } catch (e) {
    console.error("Category lookup/creation failed", e);
  }

  const products = await FetchData(category as any);

  return (
    <div>
      <Intro title={category} message={message} />
      <div className="mx-5 md:mx-15">
        <Product_Display products={products} />
      </div>
    </div>
  );
}
