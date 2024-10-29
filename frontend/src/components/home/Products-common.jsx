import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import { TbReportMoney } from "react-icons/tb";
import { CgArrowsExchange } from "react-icons/cg";

// components
import ProductsSkeleton from "../skeletons/skeleton-products";
import { Badge } from "../ui/badge";

const Products = ({ products }) => {
  return (
    <div>
      <h1 className="font-poppins text-center text-[24px] font-semibold text-textmain mt-16 mb-10">
        Latest listings
      </h1>

      {products && products.length > 0 ? (
        // <div className="grid justify-between w-full grid-cols-1 px-4 mx-auto mb-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
        <div className="px-4 mx-auto max-w-[1500px] sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {/* Card container */}
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/greenscape/products/${product._id}`}
              >
                <div
                  key={product._id}
                  className="p-1 sm:p-3 mb-0 sm:mb-8 border-[1px] rounded-xl w-[165px] sm:w-[230px] mx-auto"
                >
                  <div className="relative overflow-hidden items-center w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] mx-auto">
                    <div className="absolute flex">
                      {product.condition.sell === true ? (
                        <Badge className="top-0 left-0 px-3 py-1 m-2 font-normal bg-white rounded-xl">
                          <CgArrowsExchange size={18} className="text-accent" />
                        </Badge>
                      ) : null}
                      {product.condition.exchange === true ? (
                        <Badge className="top-0 left-0 px-3 py-1 m-2 font-normal bg-white rounded-xl">
                          <TbReportMoney size={18} className="text-accent" />
                        </Badge>
                      ) : null}
                    </div>
                    <Image
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
                            {product.name.length > 20
                              ? product.name.slice(0, 20) + "..."
                              : product.name}
                          </h2>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{product.category}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <p className="font-inter text-[12px] font-normal text-gray-800 pb-2">
                      {product.description.length > 50
                        ? product.description.slice(0, 50) + "..."
                        : product.description}
                    </p>
                    <p className="font-inter text-[12px] font-normal text-textmuted">
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
