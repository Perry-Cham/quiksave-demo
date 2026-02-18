"use client";
import { useState, useEffect } from "react";
import axios from "axios";
interface Product {
  name: string;
  price: number;
  image: string;
  _id?: string;
  subcategory: string;
  category: string;
}

function Product_Modal({
  isNewProduct = false,
  productData = null,
  callback,
}: {
  isNewProduct?: boolean;
  productData?: Product | null;
  callback: () => void;
}) {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    image: "",
    id: "",
    subcategory: "",
    category:""
  });

  useEffect(() => {
    console.log(productData);

    setProduct({ ...product, ...productData });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    if (isNewProduct) {
      try {
        const response = await axios.post("/api/addproduct", form);
        console.log(response);
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        if (productData) {
          form.append("id", productData._id || "");
        }
        console.log(Object.fromEntries(form.entries()));
        const response = await axios.patch("/api/updateproduct", form);
        console.log(response);
      } catch (e) {
        console.error(e);
      }
    }
    callback();
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="name">Name</label>
      <input
        name="name"
        type="text"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />

      <label htmlFor="price">Price</label>
      <input
        name="price"
        type="number"
        value={product.price}
        onChange={(e) =>
          setProduct({ ...product, price: parseFloat(e.target.value) || 0 })
        }
      />
      <label htmlFor="subcategory">Category</label>
      <input
        name="category"
        type="text"
        placeholder="e.g. beef, chicken, etc."
        value={product.category}
        onChange={(e) =>
          setProduct({ ...product, category: e.target.value.toLowerCase() })
        }
      />
      <label htmlFor="subcategory">Subcategory</label>
      <input
        name="subcategory"
        type="text"
        value={product.subcategory}
        onChange={(e) =>
          setProduct({ ...product, subcategory: e.target.value })
        }
      />

      <label htmlFor="image">Image Url</label>
      <input
        name="image"
        type="text"
        value={product.image}
        onChange={(e) => setProduct({ ...product, image: e.target.value })}
      />

      <label htmlFor="imageFile">Image File</label>
      <input name="imageFile" type="file" accept=".jpg,.png,.webp,.svg,.jpeg" />
      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 mt-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
      >
        {isNewProduct ? "Add Product" : "Update Product"}
      </button>
    </form>
  );
}

export default Product_Modal;
