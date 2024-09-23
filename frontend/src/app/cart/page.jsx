"use client";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const userId = user?.userId;

  useEffect(() => {
    if (userId) {
      fetch(`/api/cart/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched data:", data);
          if (Array.isArray(data)) {
            setProducts(data);
            const initialQuantities = {};
            data.forEach((product) => {
              initialQuantities[product.id] = product.quantity || 1;
            });
            setQuantities(initialQuantities);
          } else {
            console.error("Expected an array but got:", data);
            setProducts([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching products data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userId]);

  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 1) + 1,
    }));
  };

  const decreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 1) - 1, 1),
    }));
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="my-20">
      <section className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
        <div className="relative z-10 w-full px-4 mx-auto max-w-7xl md:px-5 lg-6">
          <div className="grid grid-cols-12">
            <div className="w-full col-span-12 pb-8 xl:col-span-8 lg:pr-8 pt-14 lg:py-24 max-xl:max-w-3xl max-xl:mx-auto">
              <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 className="text-lg font-semibold leading-10 text-black font-poppins">
                  Your Cart
                </h2>
                <h2 className="font-semibold leading-8 text-gray-600 text-md font-poppins">
                  {products.length} Items
                </h2>
              </div>
              {products.length > 0 ? (
                <div>
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group"
                    >
                      <div className="w-full md:max-w-[126px]">
                        <Image
                          src={product.imgurl}
                          width={126}
                          height={126}
                          className="mx-auto rounded-xl"
                          alt="cart image"
                        />
                      </div>
                      <div className="grid w-full grid-cols-1 md:grid-cols-4">
                        <div className="md:col-span-2">
                          <div className="flex flex-col max-[500px]:items-center gap-3">
                            <h6 className="text-base font-semibold leading-7 text-black">
                              {product.productName}
                            </h6>
                            <h6 className="text-base font-medium leading-7 text-gray-600 transition-all duration-300 font-inter group-hover:text-accent">
                              {product.unitPrice} LKR
                            </h6>
                          </div>
                        </div>
                        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                          <div className="my-2">
                            <Button
                              variant="outline"
                              className="px-4"
                              type="button"
                              onClick={() => decreaseQuantity(product.id)}
                            >
                              -
                            </Button>
                            <span className="mx-2 text-xl">
                              {quantities[product.id] || 1}
                            </span>
                            <Button
                              variant="outline"
                              className="px-4"
                              type="button"
                              onClick={() => increaseQuantity(product.id)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                          <p className="text-lg font-bold leading-8 text-center text-gray-600 transition-all duration-300 group-hover:text-accent">
                            {(
                              product.unitPrice * (quantities[product.id] || 1)
                            ).toFixed(2)}{" "}
                            LKR
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
            <div className="w-full max-w-3xl col-span-12 py-24 mx-auto xl:col-span-4 bg-gray-50 max-xl:px-6 xl:max-w-lg rounded-2xl lg:pl-8">
              <h2 className="pb-8 font-semibold leading-10 text-black border-b border-gray-300 text-md font-poppins">
                Order Summary
              </h2>
              <div className="mt-8">
                <div className="flex items-center justify-between pb-6">
                  <p className="text-sm font-normal leading-8 text-black">
                    {products.length} Items
                  </p>
                  <p className="text-sm font-medium leading-8 text-black">
                    {products
                      .map(
                        (product) =>
                          product.unitPrice * (quantities[product.id] || 1)
                      )
                      .reduce((acc, val) => acc + val, 0)
                      .toFixed(2)}{" "}
                    LKR
                  </p>
                </div>
                <form>
                  <label className="flex items-center mb-1.5 text-gray-600 text-sm font-medium">
                    Shipping
                  </label>
                  <div className="flex items-center justify-between py-8">
                    <p className="text-lg font-medium leading-8 text-black">
                      {products.length} Items
                    </p>
                    <p className="text-lg font-semibold leading-8 text-accent">
                      {products
                        .map(
                          (product) =>
                            product.unitPrice * (quantities[product.id] || 1)
                        )
                        .reduce((acc, val) => acc + val, 0)
                        .toFixed(2)}{" "}
                      LKR
                    </p>
                  </div>
                  <button className="w-full px-6 py-3 font-semibold text-center text-white transition-all duration-500 font-inter text-md bg-accent rounded-xl hover:bg-accentdark">
                    Checkout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
