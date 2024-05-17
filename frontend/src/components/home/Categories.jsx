import React from "react";
import Image from "next/image";
import { categoryList } from "../Constants/Category-data";

const Categories = () => {
  return (
    <div className="grid justify-between w-full grid-cols-1 px-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
      {/* Card container */}

      {/* <Link key={blog.id} href={`/Blogs/all/${blog.id}`}> */}
      {categoryList &&
        categoryList.map((category) => (
          <div
            key={category.value}
            className="p-3 mx-auto mb-8 border-[1px] rounded-xl card relative"
            style={{ width: "200px", height: "200px" }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={category.img}
                className="absolute inset-0 object-cover w-full h-full transition-all duration-500 hover:scale-105 ease rounded-xl"
                alt="category image"
              ></Image>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-inter text-[20px] font-semibold text-white ">
                  {category.label}
                </p>
              </div>
            </div>
          </div>
        ))}

      {/* </Link> */}
    </div>
  );
};

export default Categories;
