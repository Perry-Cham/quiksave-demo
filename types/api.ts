//PRODUCT TYPES
export interface ProductData {
  id: string;
  name: string;
  price: number;
  image: string;
  imageFile: File;
  category: "beef" | "processed" | "pork" | "chicken";
  subcategory: string;
}
