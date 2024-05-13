import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import product from "../../assets/product.png";
import Image from "next/image";

const Products = () => {
  return (
    <div className="grid justify-between w-[210px] grid-cols-1 gap-4 px-4 mb-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 md:px-10 lg:px-12 xl:px-24 2xl:px-48">
      {/* Card container */}

      {/* <Link key={blog.id} href={`/Blogs/all/${blog.id}`}> */}
      <div className="p-3 mx-auto mb-8 border-[1px] rounded-xl card">
        <div className="overflow-hidden items-center w-[200px] h-[200px]">
          <Image
            src={product}
            className="object-cover w-full h-full transition-all duration-500 hover:scale-105 ease rounded-xl"
          ></Image>
        </div>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-left">
                <h2 className="font-inter text-[16px] font-medium text-textmain py-4">
                  Golden Barrel Cactus golden barrel
                </h2>
              </TooltipTrigger>
              <TooltipContent>
                <p>title</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <p className="font-inter text-[16px] font-normal text-textmain pb-1">
            22800 LKR
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
      {/* </Link> */}
    </div>
  );
};

export default Products;
