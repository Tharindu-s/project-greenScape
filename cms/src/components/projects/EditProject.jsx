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

const EditProject = ({ project }) => {
  const { professional } = useAuthContext();
  const { toast } = useToast();

  const [editProjectData, setEditProjectData] = useState({
    projectName: "",
    category: "",
    location: "",
    description: "",
  });

  // handle project changes

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditProjectData({
      ...editProjectData,
      [id]: value,
    });
  };

  const handleEdit = (project) => {
    setEditProjectData({
      projectName: project.projectName,
      category: project.category,
      location: project.location,
      description: project.description,
      _id: project._id, // make sure to include the _id for patch request
    });
  };

  // save edited project data

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/projects/${editProjectData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${professional.token}`,
        },
        body: JSON.stringify(editProjectData),
      });
      if (response.ok) {
        console.log("Succesfully updated update project");
        toast({ description: "Project updated successfully" });
      } else {
        console.error("Failed to update project");
        toast({ description: "Failed to update project", status: "error" });
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast({ description: "Error updating project", status: "error" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => handleEdit(project)}>
          Edit Project
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[600px] bg-white rounded-md">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Make changes to your project here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="projectName" className="text-right">
              Project Name
            </Label>
            <Input
              id="projectName"
              className="col-span-3"
              value={editProjectData.projectName}
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
              value={editProjectData.category}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              className="col-span-3"
              value={editProjectData.location}
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
              value={editProjectData.description}
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

export default EditProject;
