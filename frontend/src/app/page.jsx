"use client";
import { useEffect } from "react";
import Form from "../components/Common/Form";
import { useAuthContext } from "@/hooks/useAuthContext";
// import { useWorkoutsContext } from "@/hooks/useWorkoutsContext";
import { useProductsContext } from "@/hooks/useProductsContex";
import Categories from "@/components/home/Categories";
import Hero from "@/components/home/Hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import Products from "@/components/home/Products-common";

export default function Home() {
  // const { workouts, dispatch } = useWorkoutsContext();
  const { products, dispatch } = useProductsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/products", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);
  return (
    <div className="relative home">
      <Hero />
      <Link href="/add">
        <Button className="fixed w-20 h-20 rounded-full bg-accent hover:bg-accentdark bottom-4 right-4">
          <IoMdAdd size={48} />
        </Button>
      </Link>
      <Link href="/dashboard">
        <Button>Dashboard</Button>
      </Link>
      <Categories />
      <h1 className="font-poppins text-center text-[24px] font-semibold text-textmain mt-16 mb-10">
        Latest listings
      </h1>
      <Products products={products} />
    </div>
  );
}
