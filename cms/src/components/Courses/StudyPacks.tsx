import React from "react";

const StudyPackList = [
  {
    title: "Appointment for a consultation",
    description:
      "I need to do some adjustments to my garden, I would like to make an appointment for a consultation.",
    phone: "+94 77 123 4567",
  },
  {
    title: "Need to get a quotation for a new project",
    description:
      "I need to get a quotation for a new project, Can you contact me through whatsapp?.",
    phone: "+94 77 123 4567",
  },
];

const StudyPacks = () => {
  return (
    <div className="flex justify-center items-center  gap-x-5 gap-y-8 lg:gap-y-8 flex-wrap md:flex-wrap lg:flex-wrap lg:justify-start  xl:flex-nowrap">
      {StudyPackList.map((pack) => (
        <div className="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 max-md:max-w-md max-md:mx-auto md:w-2/5 lg:w-2/5 md:h-80 lg:h-64 xl:h-80 2xl:h-64 xl:p-7 xl:w-1/4 hover:bg-greenscape">
          <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500 group-hover:text-white">
            {pack.title}
          </h4>
          <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white">
            {pack.description}
          </p>
          <p className="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 group-hover:text-white py-6">
            {pack.phone}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StudyPacks;
