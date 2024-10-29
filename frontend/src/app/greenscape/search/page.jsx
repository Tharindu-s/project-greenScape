"use client"; // This directive is for client-side rendering

import { Suspense } from "react";
import SearchResults from "@/components/search/SearchResults"; // Adjust the path as necessary

export default function SearchPage() {
  return (
    <div className="container">
      <Suspense fallback={<div>Loading search results...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
