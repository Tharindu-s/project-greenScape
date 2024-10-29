"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting
  const [priceFilter, setPriceFilter] = useState(""); // State for filtering by price

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
      setFilteredProducts(response.data.products); // Initialize filtered products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSortChange = (event) => {
    const order = event.target.value;
    setSortOrder(order);
    sortProducts(filteredProducts, order);
  };

  const handlePriceFilterChange = (event) => {
    const value = event.target.value;
    setPriceFilter(value);
    filterProducts(value);
  };

  const sortProducts = (productsToSort, order) => {
    const sorted = [...productsToSort].sort((a, b) => {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(sorted);
  };

  const filterProducts = (price) => {
    const filtered = products.filter((product) => {
      return product.price <= price || price === "";
    });
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    sortProducts(products, sortOrder); // Sort products on fetch
  }, [products, sortOrder]);

  return (
    <div className="mt-48">
      <div className="px-4 mx-auto max-w-[1500px] sm:px-6 lg:px-8">
        <h1 className="my-8">Search Results for: {searchQuery}</h1>

        {/* Sorting and Filtering Controls */}
        <div className="flex justify-between mb-4">
          <select onChange={handleSortChange} value={sortOrder}>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <input
            type="number"
            placeholder="Max Price"
            value={priceFilter}
            onChange={handlePriceFilterChange}
            className="p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredProducts.length > 0 ? (
            <>
              {filteredProducts.map((product) => (
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
                        {product.name.length > 20
                          ? product.name.slice(0, 20) + "..."
                          : product.name}
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
              ))}
            </>
          ) : (
            <p>No results found.</p>
          )}
        </div>

        {/* Pagination */}
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
