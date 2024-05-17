import Image from "next/image";
import React from "react";
import heroImg from "../../assets/home/home-hero.png";

const Hero = () => {
  return (
    <div className="flex items-center justify-center mt-16 mb-32 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
      <div className="relative">
        <Image src={heroImg} className="rounded-3xl" />
        <div className="absolute left-0 pt-12 pl-12 transform -translate-y-1/2 top-1/3">
          <p className="font-poppins font-bold 2xl:text-[70px] text-white w-[900px] uppercase">
            Browse diverse listings for all your gardening essentials
          </p>
          <p className="font-inter font-normal 2xl:text-[20px] text-white">
            Your one-stop destination for all gardening materials
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
