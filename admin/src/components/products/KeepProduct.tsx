"use client";
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
import { useAuthContext } from "@/hooks/useAuthContext";
import toast from "react-hot-toast";
import { MdVerifiedUser } from "react-icons/md";

const KeepProduct = ({ reportId }: { productId: string; reportId: string }) => {
  const { admin } = useAuthContext();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/reportproduct/${reportId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${admin.token}` },
      });
      if (response.ok) {
        toast.success("The product will be kept.");
      } else {
        toast.error("Request failed.");
        console.error("Request failed");
      }
    } catch (error) {
      toast.error("An error occurred while keeping the product.");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span>
          <Button className="my-1 mr-3 bg-greenscape hover:bg-greenscapeDark">
            <MdVerifiedUser size={20} />
          </Button>
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The report will be deleted and the
            product will be kept.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-greenscape hover:bg-greenscapeDark"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default KeepProduct;
