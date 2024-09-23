"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import Image from "next/image";
import Link from "next/link";

const SearchResults = () => {
  const searchParams = useSearchParams(); // to get query parameters
  const searchQuery = searchParams.get("query"); // get the 'query' parameter from the URL
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // items per page

  useEffect(() => {
    if (searchQuery) {
      fetchProducts(searchQuery, page, limit);
    }
  }, [searchQuery, page, limit]);

  const fetchProducts = async (searchTerm, currentPage, pageSize) => {
    try {
      const response = await axios.get(
        `/api/products/search/all?page=${currentPage}&limit=${pageSize}&search=${searchTerm}`
      );
      setProducts(response.data.products);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="mt-48">
      <div className="px-4 mx-auto max-w-[1500px] sm:px-6 lg:px-8">
        <h1 className="my-8">Search Results for: {searchQuery}</h1>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.length > 0 ? (
            <>
              {products.map((product) => (
                <Link key={product._id} href={`/products/${product._id}`}>
                  <div className="p-1 sm:p-3 mb-0 sm:mb-8 border-[1px] rounded-xl w-[165px] sm:w-[230px] mx-auto">
                    <div className="overflow-hidden items-center w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] mx-auto">
                      <Image
                        src={product.image[0]}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full rounded-xl"
                        alt="product image"
                      />
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
                      <div className="flex sm:block xl:flex font-opensans font-bold text-[14px] md:text-[16px] text-textmainlow gap-2">
                        <p className="tracking-wide uppercase"></p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <p>No results found.</p>
          )}
        </div>

        {/* Pagination (separated from products) */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(total / limit) }, (_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              disabled={page === idx + 1}
              className={`mx-1 px-3 py-2 border rounded ${
                page === idx + 1 ? "bg-gray-300" : "bg-white"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
