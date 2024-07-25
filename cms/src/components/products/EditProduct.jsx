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
import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const EditProduct = ({ product }) => {
  const { professional } = useAuthContext();
  const { toast } = useToast();

  const [editProductData, setEditProductData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
  });

  // handle product changes

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditProductData({
      ...editProductData,
      [id]: value,
    });
  };

  const handleEdit = (product) => {
    setEditProductData({
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      description: product.description,
      _id: product._id, // make sure to include the _id for patch request
    });
  };

  // save edited product data

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/products/${editProductData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${professional.token}`,
        },
        body: JSON.stringify(editProductData),
      });
      if (response.ok) {
        console.log("Succesfully updated update product");
        toast({ description: "product updated successfully" });
      } else {
        console.error("Failed to update product");
        toast({ description: "Failed to update product", status: "error" });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast({ description: "Error updating product", status: "error" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => handleEdit(product)}>
          Edit product
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[600px] bg-white rounded-md">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="productName" className="text-right">
              product Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={editProductData.name}
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
            <Label htmlFor="location" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              className="col-span-3"
              value={editProductData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              className="col-span-3 min-h-[300px]"
              value={editProductData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="location" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              className="col-span-3"
              value={editProductData.quantity}
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

export default EditProduct;
