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

interface EditCategoryContentDialogProps {
  category: string;
}

export default function EditCategoryContentDialog({ category }: EditCategoryContentDialogProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (open) {
      fetchContent();
    }
  }, [open]);

  const fetchContent = async () => {
    setFetching(true);
    try {
      const response = await axios.get(`/api/categories/${category}`);
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
      await axios.patch(`/api/categories/${category}`, { content });
      setOpen(false);
    } catch (error) {
      console.error("Error updating content", error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
            Edit the marketing copy for the {category} category.
          </DialogDescription>
        </DialogHeader>
        {fetching ? (
          <div className="flex justify-center">
            <LoaderCircle className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
            />
          </div>
        )}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={loading}>
            {loading && <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />}
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}