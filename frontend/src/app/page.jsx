"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import Categories from "@/components/home/Categories";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BASE_URL } from "@/components/Constants/server";
import Pagination from "@/components/Common/Pagination";
import { useSearch } from "@/context/searchContext";
import HeroNew from "@/components/Common/HeroNew";
import Products from "@/components/home/Products-common";
import Services from "@/components/home/Service-common";

export default function Home() {
  const { search } = useSearch();
  const [productpage, setProductpage] = useState(1);
  const [servicepage, setServicepage] = useState(1);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/products/search/all?page=${productpage}&search=${search}`
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
  }, [productpage, search]);

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/service/search/all?page=${servicepage}&search=${search}`
        );
        const data = await response.json();
        if (data) {
          setServices(data);
        } else {
          console.error("Expected an array but received:", data.services);
          setServices([]);
        }
        console.log(data);
      } catch (error) {
        console.error("Error fetching services data:", error);
      } finally {
        setLoading(false);
      }
    };
    getAllServices();
  }, [servicepage, search]);

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
      <Products products={products.products ? products.products : []} />
      {console.log(products)}
      <Pagination
        page={productpage}
        total={products.total ? products.total : 0}
        limit={products.limit ? products.limit : 0}
        setPage={setProductpage}
      />
      <Services services={services.products ? services.products : []} />
      {console.log(services)}
      <Pagination
        page={servicepage}
        total={services.total ? services.total : 0}
        limit={services.limit ? services.limit : 0}
        setPage={setServicepage}
      />
    </div>
  );
}
