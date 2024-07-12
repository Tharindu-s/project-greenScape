"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit2Icon } from "lucide-react";

const EditProfile = ({ userdata }) => {
  const { toast } = useToast();
  const { professional } = useAuthContext();
  const professionalId = professional?.professionalId;
  const [editUserdata, setEdituserdata] = useState({
    name: "",
    city: "",
    bio: "",
  });

  // handle profile changes

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEdituserdata({
      ...editUserdata,
      [id]: value,
    });
  };

  const handleEdit = (userdata) => {
    setEdituserdata({
      name: userdata.name,
      city: userdata.city,
      bio: userdata.bio || "",
      _id: userdata._id, // make sure to include the _id for patch request
    });
  };

  // save edited profile data

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/professional/${professionalId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${professional.token}`,
        },
        body: JSON.stringify(editUserdata),
      });
      if (response.ok) {
        console.log("Succesfully updated update profile");
        toast({ description: "profile updated successfully" });
      } else {
        console.error("Failed to update profile");
        toast({ description: "Failed to update profile", status: "error" });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({ description: "Error updating profile", status: "error" });
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            onClick={() => handleEdit(userdata)}
            className="mx-4"
          >
            <Edit2Icon className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[600px] ">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={editUserdata.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="city" className="text-right">
                City
              </Label>
              <Input
                id="city"
                className="col-span-3"
                value={editUserdata.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Textarea
                id="bio"
                className="col-span-3 min-h-[300px]"
                value={editUserdata.bio}
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
    </div>
  );
};

export default EditProfile;
