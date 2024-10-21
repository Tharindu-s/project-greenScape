import React from "react";
import Image from "next/image";
import { Badge } from "@/Components/ui/badge";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { PiLinkFill } from "react-icons/pi";
import { BASE_URL } from "@/components/Constants/server";
import Link from "next/link";
import ReportBlog from "@/components/blog/Report";

async function getBlogContent(id) {
  const res = await fetch(`http://localhost:4000/api/blogs/${id}`, {
    next: {
      revalidate: 0, // use 0 to opt out of using cache
    },
  });

  return res.json();
}

export default async function BlogContent({ params }) {
  try {
    const blog = await getBlogContent(params.id);

    if (blog.length === 0) {
      return (
        <div className="px-4 my-32 md:px-10 lg:px-12 xl:px-24 2xl:px-48">
          <p className="text-center">There are no items</p>
        </div>
      );
    }

    return (
      <div className=" max-w-[1600px] mx-auto mb-7">
        <div key={blog._id}>
          <div className="pt-32">
            <div className="flex justify-center">
              <Badge className="px-3 py-1 m-2 font-normal rounded-xl bg-accent">
                {blog.category}
              </Badge>
            </div>
            <h1 className="pt-2 px-4 sm:px-8 capitalize font-inter text-[20px] lg:text-[25px] xl:text-[25px] 2xl:text-[30px] text-black text-center font-bold sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[900px] 2xl:w-[1000px] mx-auto">
              {blog.title}
            </h1>
            <div className="md:flex justify-center font-inter text-[14px] font-normal sm:text-[14px] text-gray-600 text-center  pt-2 w-2/3 mx-auto">
              <Link href={`/profile/${blog.userId}`}>
                <p>{blog.username}</p>
              </Link>
              <span className="hidden px-2 md:block">|</span>
              <p>{blog.createdAt.slice(0, 10)}</p>
            </div>
          </div>
          <div className="px-6 md:px-10 lg:px-12 xl:px-24 py-4 sm:py-6 md:py-8 lg:py-8 xl:py-10 overflow-hidden items-center w-full h-[250px] sm:h-[350px] md:h-[400px] md:w-full lg:h-[450px] lg:w-full xl:h-[500px] xl:w-full 2xl:h-[600px] 2xl:w-full md:mr-0 xl:mr-6 sm:mb-6 md:mb-6 lg:mb-0">
            <img
              src={blog.coverImg}
              alt="blog img"
              className="object-cover w-full h-full rounded-2xl"
            />
          </div>

          <div className="px-6 md:px-10 lg:px-12 xl:px-24 md:flex ">
            <div className="hidden md:block md:w-1/4 md:pr-4">
              <Badge className="px-3 py-1font-normal rounded-xl bg-accent">
                {blog.category}
              </Badge>
              <br />
              <ReportBlog blogId={blog._id} />
            </div>
            <div className="md:w-3/4 md:pr-4">
              <div className="font-opensans text-[16px] pt-6 md:pt-0 text-textmain mx-auto leading-relaxed" />
              {blog.content}
            </div>{" "}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching industries:", error);
    return (
      <div className="text-center">
        <p className="font-opensans font-normal text-[16px] tracking-wide ">
          Error fetching blogs!
        </p>
      </div>
    );
  }
}
