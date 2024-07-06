"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";

// components
import ProfileSkeleton from "@/components/skeletons/skeleton-profile-hero";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// icons
import { MdDeleteForever } from "react-icons/md";
import Link from "next/link";

const Projects = () => {
  const { toast } = useToast();
  const { professional } = useAuthContext();
  const [projects, setProjects] = useState(null);
  const [editProjectData, setEditProjectData] = useState({
    projectName: "",
    category: "",
    location: "",
    description: "",
  });
  const [isLoading, setLoading] = useState(true);

  const id = professional?.professionalId;

  // fetch all projects for a professional

  useEffect(() => {
    if (id) {
      fetch(`/api/projects/user/${id}`)
        .then((res) => res.json())
        .then((projects) => {
          setProjects(projects);
        })
        .catch((error) => {
          console.error("Error fetching projects data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  // handle project changes

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditProjectData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleEdit = (project) => {
    setEditProjectData(project);
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
        setProjects((prevState) =>
          prevState.map((project) =>
            project._id === editProjectData._id ? editProjectData : project
          )
        );
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

  // handle project delete function

  const handleDelete = async (projectId) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${professional.token}` },
      });
      if (response.ok) {
        // Handle success, maybe update state or UI
        console.log("project deleted successfully");
      } else {
        // Handle error
        console.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="justify-between w-full px-4 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
      <h1>Your prior projects</h1>
      <div>
        <Link href="/add-project">
          <Button>Add New Project</Button>
        </Link>
      </div>
      <div className="w-full rounded-[30px] overflow-hidden border border-solid border-[#e6e6e6] p-9 mt-20">
        <h1 className="font-poppins text-[24px] font-semibold text-textmain mb-6">
          Bio
        </h1>
        {projects && projects.length > 0 ? (
          <ul>
            {projects.map((project) => (
              <li key={project._id}>
                <h3>Project Name:{project.projectName}</h3>
                <p>Category: {project.category}</p>
                <p>Description: {project.description}</p>
                <p>Location: {project.location}</p>
                {project.images.map((image, index) => (
                  <div className="flex" key={index}>
                    <img
                      src={image}
                      alt={projects.projectName}
                      style={{ maxWidth: "200px", height: "auto" }}
                    />
                  </div>
                ))}
                {/* delete project */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <span>
                      <Button className="my-1 mr-3 bg-red-400 hover:bg-red-500">
                        <MdDeleteForever size={20} />
                      </Button>
                    </span>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This project will get
                        permanently deleted if you click continue.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-400 hover:bg-red-500"
                        onClick={() => handleDelete(project._id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                {/* edit project */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => handleEdit(project)}
                    >
                      Edit Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[600px] ">
                    <DialogHeader>
                      <DialogTitle>Edit Project</DialogTitle>
                      <DialogDescription>
                        Make changes to your project here. Click save when
                        you're done.
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
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects found</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
