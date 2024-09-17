"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useProductsContext } from "@/hooks/useProductsContex";
import Categories from "@/components/home/Categories";
import Hero from "@/components/home/Hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import SearchData from "@/components/Common/SearchData";
import { BASE_URL } from "@/components/Constants/server";
import Pagination from "@/components/Common/Pagination";
import { useSearch } from "@/context/searchContext";
import HeroNew from "@/components/Common/HeroNew";
import Products from "@/components/home/Products-common";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuthContext();
  const { search } = useSearch();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirect to the search results page with the search query
      router.push(`/search?query=${searchTerm}`);
    }
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/products/search/all?page=${page}&search=${search}`
        );
        const data = await response.json();
        if (data) {
          setProducts(data);
        } else {
          console.error("Expected an array but received:", data.products);
          setProducts([]);
        }
        console.log(data);
      } catch (error) {
        console.error("Error fetching products data:", error);
      } finally {
        setLoading(false);
      }
    };
    getAllProducts();
  }, [page, search]);

  // bg-red-100 home sm:bg-green-100 md:bg-gray-100 lg:bg-yellow-100 xl:bg-purple-100 2xl:bg-red-100

  return (
    <div className="relative ">
      {/* <Hero /> */}

      <HeroNew />
      <Categories />
      <Link href="/add">
        <Button className="fixed p-6 shadow-lg animate-bounce rounded-2xl bg-accent hover:bg-accentdark bottom-4 right-4">
          Add a product
        </Button>
      </Link>
      <h1 className="font-poppins text-center text-[24px] font-semibold text-textmain mt-16 mb-10">
        Latest listings
      </h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <Products products={products.products ? products.products : []} />
      {console.log(products)}
      <Pagination
        page={page}
        total={products.total ? products.total : 0}
        limit={products.limit ? products.limit : 0}
        setPage={setPage}
      />
    </div>
  );
}
