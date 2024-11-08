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
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { FiPlus } from "react-icons/fi";

export function SendNotification() {
  const { admin } = useAuthContext();
  const [type, setType] = useState("system notifications");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inquiryData = {
      type: type,
      title,
      content,
    };

    try {
      const response = await fetch("/api/notifications", {
        method: "POST",
        body: JSON.stringify(inquiryData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin.token}`,
        },
      });
      const json = await response.json();

      if (!response.ok) {
        toast.error(json.error);
      }
      if (response.ok) {
        setTitle("");
        setContent("");
        console.log("Notification sent", json);
        toast.success("Notification sent successfully!");
      }
    } catch (err) {
      console.error("Failed send the notification", err);
      toast.error("An error occurred while sending the notification.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-3 p-4 mb-6 border border-gray-200 rounded-xl hover:bg-slate-100">
        <FiPlus /> New notification
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send a notification</DialogTitle>
          <DialogDescription>
            Send an anotifcation for the GreenScape users
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="telephone" className="text-right">
                Title
              </Label>
              <Input
                id="Notification title"
                placeholder="Enter your phone number"
                className="col-span-3"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="inquiry" className="text-right">
                Content
              </Label>

              <Textarea
                placeholder="Notification content"
                className="h-48 col-span-3"
                onChange={(e) => setContent(e.target.value)}
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
