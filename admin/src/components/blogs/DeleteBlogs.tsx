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

const DeleteBlog = ({
  blogId,
  reportId,
}: {
  blogId: string;
  reportId: string;
}) => {
  const { admin } = useAuthContext();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      if (response.ok) {
        toast.success("Blog deleted successfully!");
        await fetch(`/api/reportblog/${reportId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${admin.token}` },
        });
      } else {
        toast.error("Failed to delete blog.");
        console.error("Failed to delete blog");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the blog.");
      console.error("Error deleting blog:", error);
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
