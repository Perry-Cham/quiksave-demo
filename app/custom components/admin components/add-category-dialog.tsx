"use client";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, LoaderCircle } from "lucide-react";

const Schema = z.object({
  category: z.string().min(1, { message: "Category name is required" }),
  content: z.string().optional(),
});

type FormData = z.infer<typeof Schema>;

interface AddCategoryDialogProps {
  onCategoryAdded: () => void;
}

export default function AddCategoryDialog({ onCategoryAdded }: AddCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await axios.post("/api/addcategory", data);
      reset();
      setOpen(false);
      onCategoryAdded();
    } catch (error) {
      console.error("Error adding category", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <CirclePlus className="h-4 w-4 mr-2" />
          Add New Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Enter the category name and optional marketing copy.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="category">Category Name</Label>
            <Input id="category" {...register("category")} />
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
          </div>
          <div>
            <Label htmlFor="content">Marketing Copy (Optional)</Label>
            <Textarea id="content" {...register("content")} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />}
              Add Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}