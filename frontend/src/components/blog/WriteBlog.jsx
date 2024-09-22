import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const WriteBlog = () => {
  return (
    <div className="mt-48 w-[400px]">
      <h1 className="pt-5 pb-2">Title</h1>
      <Input />
      <h1 className="pt-5 pb-2">Content</h1>
      <Textarea placeholder="Type your message here." />
      <h1 className="pt-5 pb-2">Cover image</h1>
      <Input id="picture" type="file" />
    </div>
  );
};

export default WriteBlog;
