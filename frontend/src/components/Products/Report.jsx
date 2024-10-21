"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { Textarea } from "../ui/textarea";
import { useAuthContext } from "@/hooks/useAuthContext";
import { toast } from "react-hot-toast";

export default function ReportProduct({ productId }) {
  const user = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to report this product");
      toast.error("You must be logged in to report this product");
      return;
    }

    const report = {
      title,
      content,
      productId,
    };

    try {
      const response = await fetch("/api/reportproduct", {
        method: "POST",
        body: JSON.stringify(report),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        toast.error(json.error);
      } else {
        setTitle("");
        setContent("");
        setIsOpen(false);
        console.log("Product reported:", json);
        toast.success("Product reported successfully!");
      }
    } catch (err) {
      console.error("Failed to submit review", err);
      toast.error("An error occurred while submitting your review.");
    }
  };

  console.log(content);
  console.log(title);
  console.log(productId);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="gap-1 p-0 m-0 text-red-600">
          <MdOutlineReportGmailerrorred size={18} />
          Report this product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action="">
          <DialogHeader>
            <DialogTitle className="mb-2">Report this product</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <RadioGroup value={title} onValueChange={setTitle}>
              <div className="flex items-center my-2 space-x-2">
                <RadioGroupItem
                  value="Incorrect product information"
                  id="option1"
                />
                <Label htmlFor="option1">Incorrect product information</Label>
              </div>
              <div className="flex items-center my-2 space-x-2">
                <RadioGroupItem
                  value="Suspicious seller activity"
                  id="option2"
                />
                <Label htmlFor="option2">Suspicious seller activity</Label>
              </div>
              <div className="flex items-center my-2 space-x-2">
                <RadioGroupItem value="Other issues" id="option3" />
                <Label htmlFor="option3">Other issues</Label>
              </div>
            </RadioGroup>
            <Textarea
              placeholder="Type your message here."
              className="max-h-24"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={!title}>
              Submit Report
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
