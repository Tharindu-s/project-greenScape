import React from "react";
import Image from "next/image";
import HeroImg from "../../assets/home/hero.jpg";
import { Input } from "../ui/input";
import PlaceholdersAndVanishInputDemo from "./VanishInput";

const Hero = () => {
  return (
    <div className="relative h-screen">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg- opacity-10"></div>

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
          <h1 className="text-4xl font-bold text-center md:text-6xl lg:text-7xl">
            Welcome to My Website
          </h1>
          <Input
            className="p-8 mx-auto rounded-full w-96 text-textmain"
            placeholder="Search for anything..."
          />
        </div>
      </div>
      <PlaceholdersAndVanishInputDemo />
    </div>
  );
};

export default Hero;
