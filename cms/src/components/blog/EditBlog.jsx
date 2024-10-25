"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";

const EditBlog = ({ blog }) => {
  const { professional } = useAuthContext();

  const [editProductData, setEditProductData] = useState({
    title: "",
    category: "",
    content: "",
  });

  // handle product changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditProductData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleEdit = (blog) => {
    setEditProductData({
      title: blog.title,
      category: blog.category,
      content: blog.content,
      _id: blog._id,
    });
  };

  // save edited blog data
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/blogs/${editProductData._id}`, {
        next: {
          revalidate: true,
        },
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${professional.token}`,
        },
        body: JSON.stringify(editProductData),
      });
      if (response.ok) {
        console.log("Succesfully updated blog");
        toast.success("Blog updated successfully");
      } else {
        console.error("Failed to update blog");
        toast.error("Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Error updating blog");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => handleEdit(blog)}>
          Edit blog
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[600px] bg-white rounded-md">
        <DialogHeader>
          <DialogTitle>Edit blog</DialogTitle>
          <DialogDescription>
            Make changes to your blog here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Blog Name
            </Label>
            <Input
              id="title"
              className="col-span-3"
              value={editProductData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input
              id="category"
              className="col-span-3"
              value={editProductData.category}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="content" className="text-right">
              Description
            </Label>
            <Textarea
              id="content"
              className="col-span-3 min-h-[300px]"
              value={editProductData.content}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            className="bg-accent hover:bg-accentdark"
            onClick={handleSaveChanges}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBlog;
