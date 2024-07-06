import React from "react";
import Link from "next/link";

// components
import ProductsSkeleton from "../skeletons/skeleton-products";

const Projects = ({ projects }) => {
  return (
    <div>
      {projects && projects.length > 0 ? (
        <div className="grid justify-between w-full grid-cols-1 px-4 mx-auto mb-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
          {/* Card container */}
          {projects.map((project) => (
            <Link key={project._id} href={`/projects/${project._id}`}>
              <div
                key={project._id}
                className="p-3 mb-8 border-[1px] rounded-xl w-[230px]"
              >
                <div className="overflow-hidden items-center w-[200px] h-[200px] mx-auto">
                  <img
                    src={project.image}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full rounded-xl"
                    alt="project image"
                  ></img>
                </div>
                <div>
                  <p className="font-inter text-[16px] font-normal text-textmain pb-1">
                    {project.location}
                    <span className="text-[12px] font-normal text-textmain">
                      per item
                    </span>
                  </p>
                  <p className="font-inter text-[16px] font-normal text-textmuted">
                    Colombo
                  </p>
                  <p className="font-inter text-[16px] font-normal text-textmuted">
                    {project.createdAt.slice(0, 10)}
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

export default Projects;
