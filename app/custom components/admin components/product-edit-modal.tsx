"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface Product {
  name: string;
  price: number;
  image: string;
  _id?: string;
  subcategory: string;
  category: string;
}

function Product_Modal({
  isOpen,
  setIsOpen,
  isNewProduct = true,
  productData = null,
  callback,
}: {
  isNewProduct?: boolean;
  productData?: Product | null;
  isOpen?: boolean;
  setIsOpen: (isOpen: boolean) => void;
  callback: () => void;
}) {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    image: "",
    id: "",
    subcategory: "",
    category: "",
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
    <Dialog open={isOpen}>
      <Button onClick={() => setIsOpen(!isOpen)}>Add New Product</Button>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {isNewProduct ? "Add New Product" : "Edit Product"}
          </DialogTitle>
          <DialogDescription>
            {isNewProduct
              ? "Fill out the form below to create a new product."
              : "Modify the fields and save to update the product."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => handleSubmit(e)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="price">Price</FieldLabel>
              <Input
                id="price"
                name="price"
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="category">Category</FieldLabel>
              <FieldDescription>e.g. beef, chicken, etc.</FieldDescription>
              <Input
                id="category"
                name="category"
                type="text"
                value={product.category}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    category: e.target.value.toLowerCase(),
                  })
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="subcategory">Subcategory</FieldLabel>
              <Input
                id="subcategory"
                name="subcategory"
                type="text"
                value={product.subcategory}
                onChange={(e) =>
                  setProduct({ ...product, subcategory: e.target.value })
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="image">Image URL</FieldLabel>
              <Input
                id="image"
                name="image"
                type="text"
                value={product.image}
                onChange={(e) =>
                  setProduct({ ...product, image: e.target.value })
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="imageFile">Image File</FieldLabel>
              <Input
                id="imageFile"
                name="imageFile"
                type="file"
                accept=".jpg,.png,.webp,.svg,.jpeg"
              />
            </Field>

            <DialogFooter>
              <Button onClick={() => setIsOpen(false)} className="w-max">
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-max bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
              >
                {isNewProduct ? "Add Product" : "Update Product"}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Product_Modal;
