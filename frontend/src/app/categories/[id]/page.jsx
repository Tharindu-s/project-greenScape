import React from "react";

// components
import Products from "@/components/home/Products-common";

async function getCategoryInfo(id) {
  if (!id) {
    throw new Error("Product id is undefined");
  }

  const res = await fetch(`http://localhost:4000/api/products/category/${id}`, {
    next: {
      revalidate: 0,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function CategoryInfo({ params }) {
  if (!params) {
    return <div>Error: Product id is missing</div>;
  }
  console.log("Received params:", params); // Log the params to debug
  const { id } = params;

  if (!id) {
    return <div>Error: Product id is missing</div>;
  }

  try {
    const products = await getCategoryInfo(id);
    return (
      <div className="home">
        <h1 className="font-poppins text-center text-[24px] font-semibold text-textmain mt-16 mb-10">
          Explore {id}
        </h1>
        <Products products={products} />
      </div>
    );
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
}
