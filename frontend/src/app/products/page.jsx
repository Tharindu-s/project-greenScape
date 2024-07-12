"use client";
import React, { useState, useEffect } from "react";
import Products from "../../components/home/Products-common";

async function getProducts() {
  const res = await fetch("http://localhost:4000/api/products", {
    next: {
      revalidate: 2,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, priceRange, products]);

  const filterProducts = () => {
    let updatedProducts = products;

    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceRange.min !== 0 || priceRange.max !== Infinity) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.price >= priceRange.min && product.price <= priceRange.max
      );
    }

    setFilteredProducts(updatedProducts);
  };

  return (
    <div>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min price"
          value={priceRange.min}
          onChange={(e) =>
            setPriceRange({ ...priceRange, min: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Max price"
          value={priceRange.max}
          onChange={(e) =>
            setPriceRange({ ...priceRange, max: e.target.value })
          }
        />
      </div>
      <Products products={filteredProducts} />
    </div>
  );
}
