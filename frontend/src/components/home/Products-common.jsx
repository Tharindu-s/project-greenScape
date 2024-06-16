import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import productImg from "../../assets/product.png";
import Image from "next/image";
import Link from "next/link";
import ProductsSkeleton from "../skeletons/skeleton-products";

const Products = ({ products }) => {
  return (
    <div>
      {products && products.length > 0 ? (
        <div className="grid justify-between w-full grid-cols-1 px-4 mx-auto mb-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
          {/* Card container */}
          {products.map((product) => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <div
                key={product._id}
                className="p-3 mb-8 border-[1px] rounded-xl w-[230px]"
              >
                <div className="overflow-hidden items-center w-[200px] h-[200px] mx-auto">
                  <Image
                    src={product.image}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full transition-all duration-500 hover:scale-105 ease rounded-xl"
                    alt="product image"
                  ></Image>
                </div>
                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="text-left">
                        <h2 className="font-inter text-[16px] font-medium text-textmain py-4">
                          {product.name}
                        </h2>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{product.category}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <p className="font-inter text-[16px] font-normal text-textmain pb-1">
                    {product.price} LKR
                    <span className="text-[12px] font-normal text-textmain">
                      per item
                    </span>
                  </p>
                  <p className="font-inter text-[16px] font-normal text-textmuted">
                    Colombo
                  </p>

                  <div className="flex sm:block xl:flex font-opensans font-bold text-[14px] md:text-[16px] text-textmainlow gap-2">
                    <p className="tracking-wide uppercase"></p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <ProductsSkeleton />
      )}
    </div>
  );
};

export default Products;
