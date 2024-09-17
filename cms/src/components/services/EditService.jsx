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
import { revalidatePath } from "next/cache";

const EditService = ({ service }) => {
  const { professional } = useAuthContext();
  const { toast } = useToast();

  const [editServiceData, setEditServiceData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  // handle project changes

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditServiceData({
      ...editServiceData,
      [id]: value,
    });
  };

  const handleEdit = (service) => {
    setEditServiceData({
      name: service.name,
      category: service.category,
      price: service.price,
      description: service.description,
      _id: service._id, // make sure to include the _id for patch request
    });
  };

  // save edited project data

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/service/${editServiceData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${professional.token}`,
        },
        body: JSON.stringify(editServiceData),
      });
      if (response.ok) {
        console.log("Succesfully updated update Service");
        toast({ description: "Service updated successfully" });
      } else {
        console.error("Failed to update Service");
        toast({ description: "Failed to update Service", status: "error" });
      }
    } catch (error) {
      console.error("Error updating Service:", error);
      toast({ description: "Error updating Service", status: "error" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => handleEdit(service)}>
          Edit Service
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[600px] bg-white rounded-md">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>
            Make changes to your Service here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="projectName" className="text-right">
              Service Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={editServiceData.name}
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
              value={editServiceData.category}
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
              value={editServiceData.price}
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
              value={editServiceData.description}
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

export default EditService;
