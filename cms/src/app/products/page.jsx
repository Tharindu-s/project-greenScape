"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import ProductsProfile from "@/components/products/Products-profile";

const products = () => {
  const { professional } = useAuthContext();
  const userId = professional?.professionalId;
  const [products, setProducts] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetch(`/api/products/professional/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${professional.token}`,
        },
      })
        .then((res) => res.json())
        .then((products) => {
          setProducts(products);
        })
        .catch((error) => {
          console.error("Error fetching products data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userId]);

  return (
    <div>
      <ProductsProfile products={products} />
      products LIST
      <Link href="/add-product">Add new product</Link>
    </div>
  );
};

export default products;
