import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import productImg from "../../assets/product.png";
import Image from "next/image";
import Link from "next/link";

const Products = ({ products }) => {
  return (
    <div className="grid justify-between gap-4 px-4 mb-8 w-fullgrid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 md:px-10 lg:px-12 xl:px-24 2xl:px-48">
      {/* Card container */}

      {products &&
        products.map((product) => (
          // <Link key={product._id} href={`/products/${product._id}`}>
          <div
            key={product._id}
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
                      {product.name}
                    </h2>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p> {product.category}</p>
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

              <div className="flex sm:block xl:flex  font-opensans font-bold text-[14px] md:text-[16px] text-textmainlow gap-2">
                <p className="tracking-wide uppercase"></p>
              </div>
            </div>
          </div>
          // </Link>
        ))}
    </div>
  );
};

export default Products;
