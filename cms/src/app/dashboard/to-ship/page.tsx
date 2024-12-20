import { Button } from "@/components/ui/button";
import React from "react";
import MyCourses from "../../../components/Courses/MyCourses";

const page = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">My learning</h1>
      </div>
      <div
        className="flex flex-1 items-start justify-center rounded-lg border border-dashed shadow-sm p-6"
        x-chunk="dashboard-02-chunk-1"
      >
        <MyCourses />
      </div>
    </main>
  );
};

export default page;
