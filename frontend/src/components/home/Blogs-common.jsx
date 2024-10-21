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
import { Badge } from "@/components/ui/badge";

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h1 className="font-poppins text-center text-[24px] font-semibold text-textmain mt-16 mb-10">
        Latest Blogs
      </h1>

      {blogs && blogs.length > 0 ? (
        // <div className="grid justify-between w-full grid-cols-1 px-4 mx-auto mb-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
        <div className="px-4 mx-auto max-w-[1500px] sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {/* Card container */}
            {blogs.map((blog) => (
              <Link key={blog._id} href={`/blog/${blog._id}`}>
                <div
                  key={blog._id}
                  className="p-1 sm:p-3 mb-0 sm:mb-8 border-[1px] rounded-xl w-[165px] sm:w-[230px] mx-auto"
                >
                  <div className="relative overflow-hidden items-center w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] mx-auto">
                    <Badge className="absolute top-0 left-0 px-3 py-1 m-2 font-normal rounded-xl bg-accent">
                      {blog.category}
                    </Badge>
                    <Image
                      src={`${blog.coverImg}`}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full rounded-md"
                      alt="blog image"
                    ></Image>
                  </div>

                  <div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-left">
                          <h2 className="font-inter text-[16px] font-medium text-textmain py-4">
                            {blog.title.length > 20
                              ? blog.title.slice(0, 20) + "..."
                              : blog.title}
                          </h2>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{blog.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <p className="font-inter text-[12px] font-normal text-gray-800 pb-2">
                      {blog.content.length > 80
                        ? blog.content.slice(0, 80) + "..."
                        : blog.content}
                    </p>

                    <p className="font-inter text-[12px] font-normal text-textmuted">
                      {blog.createdAt.slice(0, 10)}
                    </p>
                    <p className="font-inter text-[12px] font-normal text-textmuted">
                      {blog.username}
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

export default Blogs;
