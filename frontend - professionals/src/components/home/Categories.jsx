import React from "react";
import Image from "next/image";
import Link from "next/link";
import { categoryList } from "../Constants/Category-data";
import { Button } from "../ui/button";

const Categories = () => {
  return (
    <div>
      <h1 className="font-poppins text-center text-[24px] font-semibold text-textmain mt-16 mb-10">
        Categories
      </h1>
      <div className="justify-between w-full px-4 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
        {/* <Link key={blog.id} href={`/Blogs/all/${blog.id}`}> */}
        {categoryList &&
          categoryList.map((category) => (
            <Link key={category.id} href={`/categories/${category.value}`}>
              <Button variant="outline" className="m-2">
                {category.label}
              </Button>
            </Link>
          ))}

        {/* </Link> */}
      </div>
    </div>
  );
};

export default Categories;
