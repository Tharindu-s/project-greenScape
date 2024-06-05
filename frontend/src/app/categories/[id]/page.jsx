import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import productImg from "../../../assets/product.png";
import Image from "next/image";

async function getCategoryInfo(id) {
  if (!id) {
    throw new Error("Product id is undefined");
  }

  const res = await fetch(`http://localhost:4000/api/products/category/${id}`, {
    next: {
      revalidate: 2,
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
    const categories = await getCategoryInfo(id);
    return (
      <div className="home">
        <h1 className="text-2xl font-bold text-center">{id}</h1>
        <div>
          {categories.map((category) => (
            <div>
              <div
                key={category._id}
                className="p-3 mx-auto mb-8 border-[1px] rounded-xl card"
              >
                <div className="overflow-hidden items-center w-[200px] h-[200px]">
                  <Image
                    src={productImg}
                    className="object-cover w-full h-full transition-all duration-500 hover:scale-105 ease rounded-xl"
                    alt="product image"
                  ></Image>
                </div>
                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="text-left">
                        <h2 className="font-inter text-[16px] font-medium text-textmain py-4">
                          {category.name}
                        </h2>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p> {category.category}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <p className="font-inter text-[16px] font-normal text-textmain pb-1">
                    {category.price} LKR
                    <span className="text-[12px] font-normal text-textmain">
                      per item
                    </span>
                  </p>
                  <p className="font-inter text-[16px] font-normal text-textmuted">
                    {category.createdAt}
                  </p>

                  <div className="flex sm:block xl:flex  font-opensans font-bold text-[14px] md:text-[16px] text-textmainlow gap-2">
                    <p className="tracking-wide uppercase"></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
}
