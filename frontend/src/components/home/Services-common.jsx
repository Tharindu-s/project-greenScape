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

const Services = ({ services }) => {
  return (
    <div>
      <h1 className="font-poppins text-center text-[24px] font-semibold text-textmain mt-16 mb-10">
        Latest Services
      </h1>

      {services && services.length > 0 ? (
        // <div className="grid justify-between w-full grid-cols-1 px-4 mx-auto mb-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
        <div className="px-4 mx-auto max-w-[1500px] sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {/* Card container */}
            {services.map((product) => (
              <Link key={product._id} href={`/services/${product._id}`}>
                <div
                  key={product._id}
                  className="p-1 sm:p-3 mb-0 sm:mb-8 border-[1px] rounded-xl w-[165px] sm:w-[230px] mx-auto"
                >
                  <div className="overflow-hidden items-center w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] mx-auto">
                    <Image
                      // old objects are using strings so remove all the old services and add new services to map through them
                      src={product.image[0]}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full rounded-lg"
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
                    <p className="font-inter text-[14px] font-normal text-gray-800 pb-2">
                      {product.price} LKR per item
                    </p>

                    <p className="font-inter text-[12px] font-normal text-gray-800 pb-2">
                      {product.description.length > 50
                        ? product.description.slice(0, 50) + "..."
                        : product.description}
                    </p>
                    <p className="font-inter text-[12px] font-normal text-gray-800 pb-2">
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

export default Services;
