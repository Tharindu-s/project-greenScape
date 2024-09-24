"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import Image from "next/image";
import Link from "next/link";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("id");
  const [product, setProduct] = useState(null); // Store a single product

  console.log("Search query:", searchQuery);

  useEffect(() => {
    if (searchQuery) {
      fetchProduct(searchQuery);
    }
  }, [searchQuery]);
  const fetchProduct = async (searchQuery) => {
    try {
      const response = await axios.get(`/api/products/search/${searchQuery}`);
      console.log("API Response:", response.data); // Log the response
      setProduct(response.data.product); // Access the product from response.data.product
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <div>
      <h1 className="my-8">Search Results for: {searchQuery}</h1>
      {product ? (
        <Link key={product._id} href={`/products/${product._id}`}>
          <div className="p-1 sm:p-3 mb-0 sm:mb-8 border-[1px] rounded-xl w-[165px] sm:w-[230px]">
            <div className="overflow-hidden items-center w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] mx-auto">
              {product.image && product.image.length > 0 ? (
                <Image
                  src={product.image[0]}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full rounded-xl"
                  alt="product image"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200">
                  <span>No Image Available</span>
                </div>
              )}
            </div>
            <div>
              <h2 className="font-inter text-[16px] font-medium text-textmain py-4">
                {product.name}
              </h2>
              <p className="font-inter text-[16px] font-normal text-textmain pb-1">
                {product.price} LKR
                <span className="text-[12px] font-normal text-textmain">
                  per item
                </span>
              </p>
              <p className="font-inter text-[16px] font-normal text-textmuted">
                Colombo
              </p>
            </div>
          </div>
        </Link>
      ) : (
        <p>No product found.</p> // Handling case when the product is not found
      )}
    </div>
  );
};

export default SearchResults;
