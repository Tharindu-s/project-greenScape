import WriteBlog from "@/components/blog/WriteBlog";
import React from "react";

const page = () => {
  return (
    <div className="grid justify-between w-full grid-cols-1 px-4 mx-auto mb-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
      <WriteBlog />
    </div>
  );
};

export default page;
