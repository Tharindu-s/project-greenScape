import React from "react";

const HeroNew = () => {
  return (
    <div>
      <section className="relative mt-16 bg-gray-100 py-14 lg:pt-44 lg:pb-24">
        <div className="w-full px-4 mx-auto max-w-7xl lg:px-8">
          <div className="w-full max-w-4xl mx-auto mb-10 sm:px-12 lg:mb-20">
            <h1 className="mb-5 text-4xl font-bold leading-snug text-center text-black font-poppins sm:text-5xl">
              Browse diverse listings for all your gardening essentials
            </h1>
            <p className="max-w-xl mx-auto font-medium leading-6 text-center text-gray-400 text-md mb-14">
              Find all your gardening essentials in one place. From seeds and
              plants to tools and accessories, our diverse listings have
              everything you need to help your garden thrive.
            </p>
            <div className="relative flex flex-col items-center justify-center max-w-xl pr-2 mx-auto mb-5 transition-all duration-500 border border-transparent rounded-full parent sm:flex-row gap-y-4 sm:justify-between sm:pr-1 sm:bg-white group ">
              <input
                type="email"
                className="block w-full px-6 py-3.5 text-base max-sm:text-center font-normal shadow-xs max-sm:bg-white text-gray-900 bg-transparent border-none rounded-full placeholder-gray-400 focus:outline-none leading-normal"
                placeholder="Search for seeds, plants, tools, etc."
                required=""
              />
              <button className="py-3 px-6 max-sm:w-full  rounded-full bg-accent text-white text-sm leading-4 font-medium whitespace-nowrap transition-all duration-300 hover:scale-105 sm:absolute top-1.5 right-3">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroNew;
