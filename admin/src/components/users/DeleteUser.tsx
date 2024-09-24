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
import toast from "react-hot-toast"; // Import react-hot-toast

const DeleteUser = ({ userId }: { userId: string }) => {
  const { admin } = useAuthContext();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${admin.token}`,
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 0,
        },
      });

      const data = await response.json(); // Parse the response

      if (response.ok) {
        toast.success("User deleted successfully!");
        console.log("User deleted successfully:", data);
        // Handle UI update or state change if needed
      } else {
        toast.error(data.error || "Failed to delete user.");
        console.error("Failed to delete user:", data.error);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the user.");
      console.error("Error deleting user:", error);
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
            This action cannot be undone. This user will get permanently deleted
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

export default DeleteUser;
