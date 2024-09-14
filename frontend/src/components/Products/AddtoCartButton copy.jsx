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

const AddtoCartButton = ({ productId, available, price }) => {
  const { toast } = useToast();
  const { user } = useAuthContext();

  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const userId = user?.userId;
  const unitPrice = price;

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

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add to cart</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:min-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add this products to your cart</DialogTitle>
          <DialogDescription>Select a quantity</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="">
              <p>available: {available}</p>
              <div className="my-2">
                <Button
                  variant="outline"
                  className="px-4"
                  type="button"
                  onClick={decreaseQuantity}
                >
                  -
                </Button>
                <span className="mx-2 text-xl">{quantity}</span>
                <Button
                  variant="outline"
                  className="px-4"
                  type="button"
                  onClick={increaseQuantity}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          {quantity <= available ? (
            <Button
              type="submit"
              className="py-6 rounded-lg px-7 bg-accent hover:bg-accentdark"
              onClick={() => {
                toast({
                  title: "Added to cart",
                });
              }}
            >
              Add to cart
            </Button>
          ) : (
            <div></div>
          )}
        </form>
        {error && <div className="text-red-500 error">{error}</div>}
      </DialogContent>
    </Dialog>
  );
};

export default AddtoCartButton;
