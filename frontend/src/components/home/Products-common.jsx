import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Image from "next/image";
import Link from "next/link";

// components
import ProductsSkeleton from "../skeletons/skeleton-products";

const Products = ({ products }) => {
  return (
    <div>
      {products && products.length > 0 ? (
        // <div className="grid justify-between w-full grid-cols-1 px-4 mx-auto mb-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
        <div className="px-4 mx-auto max-w-[1500px] sm:px-6 lg:px-8">
          <h1 className="font-poppins text-center text-[24px] font-semibold text-textmain mt-16 mb-10">
            Latest listings
          </h1>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {/* Card container */}
            {products.map((product) => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <div
                  key={product._id}
                  className="p-1 sm:p-3 mb-0 sm:mb-8 border-[1px] rounded-xl w-[165px] sm:w-[230px] mx-auto"
                >
                  <div className="overflow-hidden items-center w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] mx-auto">
                    <Image
                      src={product.image}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full rounded-xl"
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
        </div>
      ) : (
        <ProductsSkeleton />
      )}
    </div>
  );
};

export default Products;
