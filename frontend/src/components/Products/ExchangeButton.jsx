"use client";
import React, { useEffect, useState } from "react";
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

const BuyExchangeButtons = ({
  productId,
  productName,
  recieverName,
  recieverId,
}) => {
  const { toast } = useToast();
  const { user } = useAuthContext();

  const [description, setDescription] = useState("");
  const [senderId, setSenderId] = useState("");
  const [senderName, setSendername] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setSenderId(user.userId); // Pre-fill userID from context
      setSendername(user.userName); // Pre-fill userName from context
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to add a exchange request");
      return;
    }

    const exchangeRequest = {
      description,
      senderId,
      senderName,
      recieverId,
      recieverName,
      productId,
      productName,
    };

    const response = await fetch("/api/exchange", {
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
      setDescription("");
      console.log("Exchange request added:", json);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Exchange</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] md:min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Exchange this product</DialogTitle>
          <DialogDescription>
            Send a request to exchange this product
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="">
              <Label htmlFor="name" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                className="col-span-3 min-h-[300px] mt-4"
                placeholder="Describe the product you want to exchange"
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="hidden my-3 ">
                <p>sender id</p>
                <input
                  type="text"
                  defaultValue={user?.userId}
                  className=""
                  onChange={(e) => setSenderId(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            cclassName="px-4 py-2 rounded-md font-inter text-accent bg-background hover:bg-[#DADBDA]"
            onClick={() => {
              toast({
                title: "Request sent succesfully",
                description: `Your request was sent successfully. Check request state on your profile!`,
              });
            }}
          >
            Submit request
          </Button>
        </form>
        {error && <div className="error">{error}</div>}
      </DialogContent>
    </Dialog>
  );
};

export default BuyExchangeButtons;
