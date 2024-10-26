import React from "react";

async function getproductInfo(id) {
  if (!id) {
    throw new Error("Product ID is undefined");
  }

  const res = await fetch(`https://localhost:4000/api/products/${id}`, {
    next: {
      revalidate: 2,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductInfo({ params }) {
  console.log("Received params:", params); // Log the params to debug
  const { id } = params;

  if (!id) {
    return <div>Error: Product ID is missing</div>;
  }

  try {
    const product = await getproductInfo(id);
    return <div>aaaa</div>;
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
}
