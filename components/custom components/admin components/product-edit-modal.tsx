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
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, LoaderCircle } from "lucide-react";
import { useMessageModal } from "@/stores/Admin_Message_Modal_Store";

interface Product {
  name: string;
  price: number;
  image: string;
  _id?: string;
  subcategory: string;
  category: string;
  imageFile: File;
}

interface SuccessState {
  modalOpen?: boolean;
  status?: string;
  message?: string;
}

const Schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z.number({ message: "Price must be a number" }).min(1),
  subcategory: z.string().min(1, { message: "Subcategory is required" }),
  image: z.string(),
  imageFile: z.any().optional(),
});
type FormTypes = z.infer<typeof Schema>;

function Product_Modal({
  modalState,
  category,
  callback,
  setModalState,
}: {
  modalState: {
    isOpen: boolean;
    productData: Product | null;
    isNewProduct: boolean;
  };
  setModalState: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      productData: Product | null;
      isNewProduct: boolean;
    }>
  >;
  category: string;
  callback: () => void;
}) {
 
  const setSuccessState = useMessageModal(state => state.setModalState)
  const { isOpen, productData, isNewProduct } = modalState;
  console.log("Modal state inside the form component", modalState);
  const form = useForm<FormTypes>({
    resolver: zodResolver(Schema),
    // start with empty/default values; we'll reset when `productData` changes
    defaultValues: {
      name: "",
      price: 1,
      subcategory: "",
      image: "",
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  // when the modal is opened for editing an existing product we need to
  // populate the form; react-hook-form only uses `defaultValues` on the
  // first render so we explicitly call `reset` whenever the productData
  // or the ``isNewProduct`` flag changes.
  useEffect(() => {
    if (productData && !isNewProduct) {
      reset({
        name: productData.name,
        price: productData.price,
        subcategory: productData.subcategory,
        image: productData.image,
        imageFile: undefined,
      });
    } else if (isNewProduct) {
      // clearing for a new product
      reset({ name: "", price: 1, subcategory: "", image: "" });
    }
  }, [productData, isNewProduct, reset]);

  async function handleFormSubmit(values: FormTypes) {
    let data = new FormData();

    //NOTE: We have to append the file differently than the other fields. For the file, we check if it's an instance of File and then append it directly. If it's not a file (e.g., if it's undefined), we skip appending it to avoid issues on the server side. Ugh this things has been driving me nuts!

    for (const [key, value] of Object.entries(values)) {
      if (value !== undefined) {
        !(key === "imageFile") ? data.append(key, value) : data.append(key, Array.from(value as FileList)[0]);
      }
    }
    if (isNewProduct) {
      try {
        const response = await axios.post(`/api/addproduct/${category}`, data);
        setSuccessState(
          true,
          "Success",
          "The product has been added successfully",

        );
      } catch (e) {
        setSuccessState(
          true,
          "Error",
          "Their was an error on our end, please try again later",
        );
        console.error(e);
      } finally {
        callback();
      }
    } else {
      try {
        if (productData) {
          const response = await axios.patch(
            `/api/updateproduct/${category}/${productData._id}`,
            data,
          );
          setSuccessState(
            true,
            "Success",
            "The product has been updated successfully",
          );
          console.log(response);
        }
      } catch (e) {
        setSuccessState(
          true,
          "Error",
          "Their was an error on our end, please try again later",

        );
        console.error(e);
      } finally {
        callback();
      }
    }

  }
  return (
    <>
      {/* THIS DIALOG CONTAINS THE FORM*/}
      <Dialog open={isOpen}>
        <Button
          onClick={() => setModalState({ ...modalState, isOpen: !isOpen, isNewProduct: true })}
          className="cursor-pointer"
        >
          {/* When the button is clicked assume the product being added is New */}
          <CirclePlus size="34" />
          Add New Product
        </Button>
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

          <form onSubmit={handleSubmit(handleFormSubmit, (errors) => console.error("Validation errors:", errors))}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" {...register("name")} type="text" />
                {errors.name && (
                  <FieldDescription className="text-red-500">
                    {errors.name.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="price">Price</FieldLabel>
                <Input
                  id="price"
                  {...register("price", { valueAsNumber: true })}
                  type="number"
                />
                {errors.price && (
                  <FieldDescription className="text-red-500">
                    {errors.price.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="subcategory">Subcategory</FieldLabel>
                <Input
                  id="subcategory"
                  {...register("subcategory")}
                  type="text"
                />
                {errors.subcategory && (
                  <FieldDescription className="text-red-500">
                    {errors.subcategory.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="image">Image URL</FieldLabel>
                <Input id="image" {...register("image")} type="text" />
                {errors.image && (
                  <FieldDescription className="text-red-500">
                    {errors.image.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="imageFile">Image File</FieldLabel>
                <Input
                  id="imageFile"
                  type="file"
                  accept=".jpg,.png,.webp,.svg,.jpeg"
                  {...register("imageFile")}
                />
              </Field>

              <DialogFooter>
                <Button type="button" onClick={() => callback()} className="w-max">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-max bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
                >
                  {(isNewProduct && !isSubmitting) && "Add Product"}
                  {(!isNewProduct && !isSubmitting) && "Update Product"}
                  {(isSubmitting) &&
                    <>
                      {isNewProduct ? "Adding... " : "Updating... "}
                      <LoaderCircle className="animate-spin" />
                    </>}
                </Button>
              </DialogFooter>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Product_Modal;
