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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Edit } from "lucide-react";
import { Field } from "@/components/ui/field";

interface EditCategoryContentDialogProps {
  category: string;
}

export default function EditCategoryContentDialog({
  category,
}: EditCategoryContentDialogProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  // This state is for the message model that displays whether the popereation was a success or a failure
  const [modalState, setModalState] = useState<{
    status: "success" | "error" | null;
    message: string;
  }>({
    status: null,
    message: "",
  });

  useEffect(() => {
    if (open) {
      fetchContent();
    }
  }, [open]);

  const fetchContent = async () => {
    setFetching(true);
    try {
      const response = await axios.get(`/api/categories/${category}`);
      console.log(response);
      setContent(response.data.content || "");
    } catch (error) {
      console.error("Error fetching content", error);
    } finally {
      setFetching(false);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(`/api/categories/${category}`, {
        content,
      });
      if (response.status === 200) {
        console.log("Content updated successfully", response);
        setModalState({
          status: "success",
          message: "Content updated successfully.",
        });
      }
    } catch (error) {
      console.error("Error updating content", error);

      setModalState({
        status: "error",
        message: "Failed to update content. Please try again later.",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Content
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category Content</DialogTitle>
            <DialogDescription>
              Edit the Page content for the {category} category.
            </DialogDescription>
          </DialogHeader>
          {fetching ? (
            <div className="flex justify-center">
              <LoaderCircle className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <Field>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
              />
            </Field>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={onSubmit} disabled={loading}>
              {loading && (
                <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
              )}
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal for success or failure message */}
      {(modalState.status === "success" || modalState.status === "error") && (
        <Dialog
          open={true}
          onOpenChange={() => setModalState({ status: null, message: "" })}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {modalState.status === "success" ? "Success" : "Error"}
              </DialogTitle>
            </DialogHeader>
            <div className="p-4">{modalState.message}</div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
