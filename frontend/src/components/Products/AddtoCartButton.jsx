"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/useAuthContext";
import { toast } from "react-hot-toast"; // Import the toast library

const AddtoCartButton = ({
  productId,
  available,
  price,
  productName,
  imgurl,
}) => {
  const { user } = useAuthContext();

  const [error, setError] = useState(null);
  const userId = user?.userId;
  const unitPrice = price;
  const quantity = 1;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quantity > available) {
      setError("Not enough stock");
      toast.error("Not enough stock available.");
      return;
    }

    if (!user) {
      setError("You must be logged in to add a exchange request");
      toast.error("You must be logged in to add an exchange request.");
      return;
    }

    const exchangeRequest = {
      userId,
      productId,
      quantity,
      unitPrice,
      productName,
      imgurl,
    };

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify(exchangeRequest),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        toast.error(`Error: ${json.error}`); // Show error toast
      } else {
        setError(null);
        toast.success("Product added to cart successfully!"); // Show success toast
        console.log("Added to cart:", json);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button
        type="submit"
        className="px-4 py-2 rounded-md font-inter text-accent bg-background hover:bg-[#DADBDA]"
      >
        Add to cart
      </Button>
    </form>
  );
};

export default AddtoCartButton;
