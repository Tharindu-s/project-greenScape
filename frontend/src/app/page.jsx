"use client";
import { useEffect } from "react";
import Form from "../components/Common/Form";
import { useAuthContext } from "@/hooks/useAuthContext";
// import { useWorkoutsContext } from "@/hooks/useWorkoutsContext";
import { useProductsContext } from "@/hooks/useProductsContex";
import Products from "@/components/home/Products";
import Categories from "@/components/home/Categories";
import Hero from "@/components/home/Hero";

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
    <div className="home">
      <Hero />
      <Categories />
      <Form />
      <Products products={products} />
    </div>
  );
}
