import React from "react";
import { Skeleton } from "../ui/skeleton";

const products = [
  { id: 1, name: "product 1" },
  { id: 2, name: "product 1" },
  { id: 3, name: "product 1" },
  { id: 4, name: "product 1" },
  { id: 5, name: "product 1" },
  { id: 6, name: "product 1" },
  { id: 7, name: "product 1" },
  { id: 8, name: "product 1" },
  { id: 9, name: "product 1" },
  { id: 10, name: "product 1" },
  { id: 11, name: "product 1" },
  { id: 12, name: "product 1" },
];

const ProductsSkeleton = () => {
  return (
    <div className="grid items-center justify-between w-full grid-cols-1 px-4 mx-auto mb-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
      {products.map((product) => (
        <div key={product.id} className="mb-16 space-y-2">
          <Skeleton className="w-48 h-48" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="w-40 h-4" />
        </div>
      ))}
    </div>
  );
};

export default ProductsSkeleton;
