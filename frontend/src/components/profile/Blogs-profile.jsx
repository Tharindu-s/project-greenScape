import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { BlogCategories } from "../Constants/Blog-data";

const BlogsProfile = ({ blogs }) => {
  const [currentBlog, setCurrentBlog] = useState(null);
  const [open, setOpen] = useState(false);

  // Change state when the edit button is clicked
  const handleEdit = (blog) => {
    setCurrentBlog(blog);
  };

  // Handle input changes dynamically for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBlog((prev) => ({ ...prev, [name]: value }));
  };

  // Save edited blog to the db
  const handleSaveChanges = async () => {
    if (!currentBlog) return;

    try {
      // Construct the body with updated fields
      const updatedBlog = {
        title: currentBlog.title,
        category: currentBlog.category,
        content: currentBlog.content,
      };

      const response = await fetch(`/api/blogs/${currentBlog._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlog), // Send updated fields
      });

      if (response.ok) {
        toast.success("Blog updated successfully.");
        // Optionally refetch the blogs list or update UI to reflect changes
      } else {
        toast.error("Failed to update blog.");
      }
    } catch (error) {
      toast.error("Error updating blog.");
    }
  };

  // Delete blog from the db
  const handleDelete = async (blogId) => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Blog deleted successfully.");
      } else {
        toast.error("Failed to delete blog.");
      }
    } catch (error) {
      toast.error("Failed to delete blog.");
    }
  };

  return (
    <div>
      {blogs && blogs.length > 0 ? (
        <div className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Content</TableHead>
                <TableHead className="text-right">Edit</TableHead>
              </TableRow>
            </TableHeader>
            {blogs.map((blog) => (
              <TableBody key={blog._id}>
                <TableRow>
                  <TableCell>
                    <Link key={blog._id} href={`/greenscape/blog/${blog._id}`}>
                      {blog.title}
                    </Link>
                  </TableCell>
                  <TableCell>{blog.category}</TableCell>
                  <TableCell>{blog.content.slice(0, 100)}...</TableCell>
                  <TableCell className="text-right">
                    {/* Delete blog */}
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
                            This action cannot be undone. This blog will get
                            permanently deleted.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-400 hover:bg-red-500"
                            onClick={() => handleDelete(blog._id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    {/* Edit blog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <span>
                          <Button
                            className="my-1 bg-accent hover:bg-accentdark"
                            onClick={() => handleEdit(blog)}
                          >
                            <MdModeEdit size={20} />
                          </Button>
                        </span>
                      </DialogTrigger>
                      <DialogContent className="max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Edit blog</DialogTitle>
                          <DialogDescription>
                            Make changes to this product here. Click save when
                            you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="name" className="text-right">
                              Title
                            </Label>
                            <Input
                              id="title"
                              name="title"
                              className="col-span-3"
                              value={currentBlog?.title || ""}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="category" className="text-right">
                              Category
                            </Label>
                            {/* Category selector */}
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={open}
                                  className="w-[200px] justify-between"
                                >
                                  {currentBlog?.category
                                    ? BlogCategories.find(
                                        (category) =>
                                          category.value ===
                                          currentBlog.category
                                      )?.label
                                    : "Select a category..."}
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
                                      {BlogCategories.map((category) => (
                                        <CommandItem
                                          key={category.value}
                                          value={category.value}
                                          onSelect={(currentValue) => {
                                            setCurrentBlog((prev) => ({
                                              ...prev,
                                              category: currentValue,
                                            }));
                                            setOpen(false);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              currentBlog?.category ===
                                                category.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {category.label}
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
                              Content
                            </Label>
                            <Textarea
                              id="content"
                              name="content"
                              className="col-span-3 min-h-[300px]"
                              value={currentBlog?.content || ""}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleSaveChanges}>
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
        <p>No blogs available.</p>
      )}
    </div>
  );
};

export default BlogsProfile;
