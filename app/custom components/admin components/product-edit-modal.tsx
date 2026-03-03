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
import { LoaderCircle } from "lucide-react";

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
  const [successState, setSuccessState] = useState<SuccessState>();
  const { isOpen, productData, isNewProduct } = modalState;
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
        imageFile:undefined,
      });
    } else if (isNewProduct) {
      // clearing for a new product
      reset({ name: "", price: 1, subcategory: "", image: "" });
    }
  }, [productData, isNewProduct, reset]);

  async function handleFormSubmit(values: FormTypes) {
    console.log("values", values);
    let data = new FormData();
    if (isNewProduct) {
      for (const [key, value] of Object.entries(values)) {
        if (value !== undefined) {
          typeof value  === "number" ? data.append(key, value.toString()):
          data.append(key, value);
        }
      }
      try {
        const response = await axios.post("/api/addproduct", values);
        setSuccessState({
          status: "Success",
          message: "The product has been added successfully",
          modalOpen: true,
        });
      } catch (e) {
        setSuccessState({
          status: "Error",
          message: "Their was an error on our end, please try again later",
          modalOpen: true,
        });
        console.error(e);
      }
    } else {
      try {
        if (productData) {
          const response = await axios.patch(
            `/api/updateproduct/${category}/${productData._id}`,
            values,
          );
          setSuccessState({
            status: "Success",
            message: "The product has been updated successfully",
            modalOpen: true,
          });
          console.log(response);
        }
      } catch (e) {
        setSuccessState({
          status: "Error",
          message: "Their was an error on our end, please try again later",
          modalOpen: true,
        });
        console.error(e);
      }
    }
    callback();
  }
  return (
    <>
      {/* THIS DIALOG CONTAINS THE FORM*/}
      <Dialog open={isOpen}>
        <Button
          onClick={() => setModalState({ ...modalState, isOpen: !isOpen })}
        >
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
                  {isNewProduct && !isSubmitting ? "Add Product" : "Update Product"}
                  {isSubmitting && <LoaderCircle className="animate-spin" />}
                </Button>
              </DialogFooter>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>

      {/*THIS DIALOG RETURNS A MESSAGE ON SUCCESS OR FAILURE*/}
      <Dialog open={successState?.modalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{successState?.status}</DialogTitle>
            <DialogDescription>{successState?.message}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() =>
                setSuccessState({ ...successState, modalOpen: false })
              }
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Product_Modal;
