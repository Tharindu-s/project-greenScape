import React from "react";
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
import { Button } from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import { useAuthContext } from "@/hooks/useAuthContext";
import toast from "react-hot-toast";

const DeleteBlog = ({ blogId }: { blogId: string }) => {
  const { professional } = useAuthContext();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${professional.token}` },
      });
      if (response.ok) {
        console.log("project deleted successfully");
        toast.success("Blog deleted successfully");
      } else {
        console.error("Failed to delete project");
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Error deleting blog");
    }
  };

  return (
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
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This blog will get permanently deleted
            if you click continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-400 hover:bg-red-500"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBlog;
