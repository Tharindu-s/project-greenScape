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
    <div className="mt-40">
      {/* <div className="relative flex flex-col items-center justify-center w-[400px] pr-2 mx-auto  transition-all duration-500 border border-gray-200 rounded-xl parent sm:flex-row gap-y-4 sm:justify-between sm:pr-1 sm:bg-white group ">
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full px-6 py-3.5 text-base max-sm:text-center font-normal  max-sm:bg-white text-gray-900 bg-transparent rounded-full placeholder-gray-400 leading-normal focus:ring-0 focus:outline-none"
          placeholder="Search for seeds, plants, tools, etc."
          required=""
        />
      </div>
      <div className="filter-container">
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
      </div> */}
      <Products products={filteredProducts} />
    </div>
  );
}
