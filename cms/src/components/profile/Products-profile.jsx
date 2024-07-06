"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/hooks/useAuthContext";
import { serviceList } from "@/constants/service-types";

const Projectsprofile = ({ projects }) => {
  const { professional } = useAuthContext();
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`/api/projects/${productId}`, {
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

  const handleEdit = (project) => {
    setCurrentProject(project);
    setValue(project.category);
    setCategory(project.category);
  };

  const handleSaveChanges = async () => {
    if (!currentProject) return;

    const updatedProject = {
      ...currentProject,
      category: value,
    };

    try {
      const response = await fetch(`/api/projects/${currentProject._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${professional.token}`,
        },
        body: JSON.stringify(updatedProject),
      });

      if (response.ok) {
        // Handle success, maybe update state or UI
        console.log("project updated successfully");
      } else {
        // Handle error
        console.error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div>
      <h1>Your projects</h1>
      {projects && projects.length > 0 ? (
        <div className="w-full md:px-10 lg:px-12 xl:px-24 2xl:px-64">
          {/* Card container */}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Edit</TableHead>
              </TableRow>
            </TableHeader>
            {projects.map((project) => (
              <TableBody key={project._id}>
                <TableRow>
                  <TableCell>
                    <Link key={project._id} href={`/projects/${project._id}`}>
                      {project.projectName}
                    </Link>
                  </TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>{project.location}</TableCell>
                  <TableCell>{project.createdAt.slice(0, 10)}</TableCell>
                  <TableCell className="text-right">
                    {/* #############################  delete product  ############################# */}
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

                    {/* #############################  edit product  ############################# */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <span>
                          <Button
                            className="my-1 mr-3 bg-accent hover:bg-accentdark"
                            onClick={() => handleEdit(project)}
                          >
                            <MdModeEdit size={20} />
                          </Button>
                        </span>
                      </DialogTrigger>
                      <DialogContent className="max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Edit project</DialogTitle>
                          <DialogDescription>
                            Make changes to this project here. Click save when
                            you're done.
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
                              value={currentProject?.projectName || ""}
                              onChange={(e) =>
                                setCurrentProject((prev) => ({
                                  ...prev,
                                  projectName: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="category" className="text-right">
                              Category
                            </Label>
                            {/* #############################  get category data  ############################# */}
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={open}
                                  className="w-[200px] justify-between"
                                >
                                  {value
                                    ? serviceList.find(
                                        (serviceList) =>
                                          serviceList.value === value
                                      )?.label
                                    : "Select a service..."}
                                  <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search category..." />
                                  <CommandEmpty>
                                    No categories found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    <CommandList>
                                      {serviceList.map((service) => (
                                        <CommandItem
                                          key={service.value}
                                          value={service.value}
                                          onSelect={(currentValue) => {
                                            setValue(
                                              currentValue === value
                                                ? ""
                                                : currentValue
                                            );
                                            setCategory(
                                              currentValue === value
                                                ? ""
                                                : currentValue
                                            );
                                            setCurrentProject((prev) => ({
                                              ...prev,
                                              category:
                                                currentValue === value
                                                  ? ""
                                                  : currentValue,
                                            }));
                                            setOpen(false);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              value === category.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {service.label}
                                        </CommandItem>
                                      ))}
                                    </CommandList>
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="description" className="text-right">
                              Description
                            </Label>
                            <Textarea
                              id="description"
                              className="col-span-3 min-h-[300px]"
                              value={currentProject?.description || ""}
                              onChange={(e) =>
                                setCurrentProject((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="location" className="text-right">
                              Location
                            </Label>
                            <Input
                              id="location"
                              className="col-span-3"
                              value={currentProject?.location || ""}
                              onChange={(e) =>
                                setCurrentProject((prev) => ({
                                  ...prev,
                                  location: e.target.value,
                                }))
                              }
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
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
      ) : (
        // <ProductsSkeleton />
        <p className="px-4 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
          You haven't added any products yet.{" "}
          <Link
            href="/add"
            className="underline text-accent hover:text-accentdark"
          >
            Click here
          </Link>{" "}
          to add a new product
        </p>
      )}
    </div>
  );
};

export default Projectsprofile;
