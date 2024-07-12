import React from "react";

const courseDetails = [
  {
    image: "https://pagedone.io/asset/uploads/1696244553.png",
    title: "ReactJS basics: A comprehensive guide for beginners",
  },
  {
    image: "https://pagedone.io/asset/uploads/1696244579.png",
    title:
      "Learn NextJS from scratch: A complete guide to building web apps with NextJS",
  },
  {
    image: "https://pagedone.io/asset/uploads/1696244619.png",
    title:
      "Start developing with TailwindCSS: A complete guide to building web apps with TailwindCSS",
  },
];

const MyCourses = () => {
  return (
    <div className="flex justify-center mb-14 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
      {courseDetails.map((course) => (
        <div className="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-accentBlue">
          <div className="flex items-center mb-6">
            <img
              src={course.image}
              alt="Harsh image"
              className="rounded-lg w-full"
            />
          </div>
          <div className="block">
            <h4 className="text-gray-900 font-medium leading-8 mb-9">
              {course.title}
            </h4>
            <div className="flex items-center justify-between  font-medium">
              <h6 className="text-sm text-gray-500">Pasindu Athukorala</h6>
              <span className="text-sm text-accentBlue">2 days ago</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCourses;
