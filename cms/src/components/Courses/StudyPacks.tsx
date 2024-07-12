import React from "react";

const StudyPackList = [
  {
    title: "NextJS class-01",
    description:
      "We Provide Various Methods For You To Carry Out All Transactions Related To Your Finances",
  },
  {
    title: "NextJS class-02",
    description:
      "We have the most up-to-date security to support the security of all our customers in carrying out all transactions.",
  },
  {
    title: "NextJS class-03",
    description:
      "Provide Customer Service For Those Of You Who Have Problems 24 Hours A Week",
  },
  {
    title: "Docker class-01",
    description:
      "We provide faster transaction speeds than competitors, so money arrives and is received faster.",
  },
];

const StudyPacks = () => {
  return (
    <div className="flex justify-center items-center  gap-x-5 gap-y-8 lg:gap-y-8 flex-wrap md:flex-wrap lg:flex-wrap lg:justify-center xl:justify-between xl:flex-nowrap lg:gap-x-8">
      {StudyPackList.map((pack) => (
        <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 lg:w-2/5 md:h-80 lg:h-64 xl:h-80 2xl:h-64 xl:p-7 xl:w-1/4 hover:bg-indigo-600">
          <div className="bg-white rounded-full flex justify-center items-center mb-5 w-14 h-14 ">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 14.7875L13.0959 17.8834C13.3399 18.1274 13.7353 18.1275 13.9794 17.8838L20.625 11.25M15 27.5C8.09644 27.5 2.5 21.9036 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9036 2.5 27.5 8.09644 27.5 15C27.5 21.9036 21.9036 27.5 15 27.5Z"
                stroke="#4F46E5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
            {pack.title}
          </h4>
          <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
            {pack.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StudyPacks;
