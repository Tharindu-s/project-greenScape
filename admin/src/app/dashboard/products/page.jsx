"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";

// components
import ProfileSkeleton from "@/components/skeletons/skeleton-profile-hero";
import ProductsList from "@/components/products/ProductsList";

import SearchBar from "@/components/common/SearchBar";

const ReportedProducts = () => {
  const { admin } = useAuthContext();
  const [products, setProducts] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const id = admin?.adminId;

  useEffect(() => {
    fetch(`/api/reportproduct`)
      .then((res) => res.json())
      .then((products) => {
        console.log(products);
        setProducts(products);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }
  return (
    <main className="p-4 lg:p-6">
      <SearchBar />
      <h1 className="py-8 text-2xl font-semibold">Reported Products</h1>
      <ProductsList productsList={products} />
    </main>
  );
};

export default ReportedProducts;
