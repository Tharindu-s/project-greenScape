"use client";
import { Button } from "@/components/ui/button";
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
import { useAuthContext } from "@/hooks/useAuthContext";
import { toast } from "react-hot-toast";
import { useState } from "react";

export function SendInquiry({ sellerInfo }) {
  const { user } = useAuthContext();

  const senderId = user?.userId;
  const senderName = user?.userName;
  const recieverId = sellerInfo._id;
  const [inquiryDescription, setInquiryDescription] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to report this product");
      return;
    }

    const inquiryData = {
      senderId,
      senderName,
      recieverId,
      inquiryDescription,
      phone,
    };

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        body: JSON.stringify(inquiryData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (!response.ok) {
        toast.error(json.error);
      }
      if (response.ok) {
        setInquiryDescription("");
        setPhone("");
        console.log("Inquiry sent", json);
        toast.success("Inquiry sent successfully!");
      }
    } catch (err) {
      console.error("Failed send the inquiry", err);
      toast.error("An error occurred while sending the inquiry.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-white bg-accent hover:bg-accentdark hover:text-white"
        >
          Inquiry
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send and inquiry</DialogTitle>
          <DialogDescription>
            Send an inquiry to {sellerInfo.name} to learn more about their
            services.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue={user?.userName}
                className="col-span-3"
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="telephone" className="text-right">
                Phone
              </Label>
              <Input
                id="name"
                placeholder="Enter your phone number"
                className="col-span-3"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="inquiry" className="text-right">
                Inquiry
              </Label>

              <Textarea
                placeholder="Type your message here."
                className="h-48 col-span-3"
                onChange={(e) => setInquiryDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="text-right">
            <Button type="submit" className="bg-accent hover:bg-accentdark">
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
