import React from "react";
import Image from "next/image";
import HeroImg from "../../assets/home/heroImg.jpg";
import { Input } from "../ui/input";
import PlaceholdersAndVanishInputDemo from "./VanishInput";

const Hero = () => {
  return (
    <div className="relative h-screen">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-opacity-10"></div>

      {/* Image */}
      <Image
        src={HeroImg}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt="hero-img"
      />

      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <div>
          <PlaceholdersAndVanishInputDemo />
          {/* <Input
            className="p-8 mx-auto rounded-full w-96 text-textmain"
            placeholder="Search for anything..."
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
