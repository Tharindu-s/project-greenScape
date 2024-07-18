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

export default function Home() {
  const { user } = useAuthContext();
  const { search } = useSearch();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="relative home">
      <Hero />
      <Link href="/add">
        <Button className="fixed w-20 h-20 rounded-full bg-accent hover:bg-accentdark bottom-4 right-4">
          <IoMdAdd size={48} />
        </Button>
      </Link>
      <SearchData products={products.products ? products.products : []} />
      {console.log(products)}
      <Pagination
        page={page}
        total={products.total ? products.total : 0}
        limit={products.limit ? products.limit : 0}
        setPage={setPage}
      />
      <Categories />
      <h1 className="font-poppins text-center text-[24px] font-semibold text-textmain mt-16 mb-10">
        Latest listings
      </h1>
      {/* <Products products={products} /> */}
    </div>
  );
}
