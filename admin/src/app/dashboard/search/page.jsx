"use client";

import { Suspense } from "react";
import SearchResults from "@/components/common/SearchResults";

export default function SearchPage() {
  return (
    <div className="mx-12 ">
      <Suspense fallback={<div>Loading search results...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
