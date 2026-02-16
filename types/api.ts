//PRODUCT TYPES
export type ProductCategory = "beef" | "pork" | "processed" | "chicken";

export interface ProductData {
  id: string;
  name: string;
  price: number;
  image: string;
  imageFile: File;
  category: ProductCategory;
  subcategory: string;
}


