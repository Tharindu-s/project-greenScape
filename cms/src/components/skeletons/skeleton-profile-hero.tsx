import React from "react";
import { Skeleton } from "../ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="flex items-center justify-center w-full px-4 mx-auto mt-16 space-x-4 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
      <div className="w-full">
        <Skeleton className="w-full mb-12 h-80" />
        <Skeleton className="h-8 mb-2 w-96" />
        <Skeleton className="w-48 h-8 mb-2" />
        <Skeleton className="w-full h-64 mt-24" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
