"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/hooks/useAuthContext";

const AddtoCartButton = ({
  productId,
  available,
  price,
  productName,
  imgurl,
}) => {
  const { toast } = useToast();
  const { user } = useAuthContext();

  const [error, setError] = useState(null);
  const userId = user?.userId;
  const unitPrice = price;
  const quantity = 1;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quantity > available) {
      setError("Not enough stock");
      return;
    }

    if (!user) {
      setError("You must be logged in to add a exchange request");
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

    const response = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(exchangeRequest),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      const json = await response.json();
      setError(json.error);
    } else {
      const json = await response.json();
      setError(null);
      console.log("Added to cart:", json);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button
        type="submit"
        className="px-4 py-2 rounded-md font-inter text-accent bg-background hover:bg-[#DADBDA]"
        onClick={() => {
          toast({
            title: "Added to cart",
          });
        }}
      >
        Add to cart
      </Button>
    </form>
  );
};

export default AddtoCartButton;
