import mongoose from 'mongoose';
import Categories from "@/types/models";

const schema = new mongoose.Schema<Categories>({
    category: String,
    content: String,
});
 const categories = mongoose.models.categories || mongoose.model("categories", schema, "categories");

 export default categories;


