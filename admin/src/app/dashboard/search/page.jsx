"use client"; // This directive is for client-side rendering

import { Suspense } from "react";
import SearchResults from "@/components/common/SearchResults"; // Adjust the path as necessary

export default function SearchPage() {
  return (
    <div className="mx-12 ">
      <Suspense fallback={<div>Loading search results...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
