import React from "react";
import { BorderBeam } from "../magicui/border-beam";
import DotPattern from "../magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { useSearch } from "@/context/searchContext";
import SearchBarHero from "../home/SearchbarHero";

const HeroNew = () => {
  const { setSearch } = useSearch();

  return (
    <div>
      <section className="relative mt-16 bg-white py-14 lg:pt-44 lg:pb-24 ">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
          )}
        />
        <div className="w-full px-4 mx-auto max-w-7xl lg:px-8">
          <div className="w-full max-w-4xl mx-auto mb-10 sm:px-12 lg:mb-20 ">
            <h1 className="mb-5 text-4xl font-bold leading-snug text-center text-black font-poppins sm:text-5xl">
              Browse diverse listings for all your gardening essentials
            </h1>
            <p className="max-w-xl mx-auto font-medium leading-6 text-center text-slate-600 text-md mb-14">
              Find all your gardening essentials in one place. From seeds and
              plants to tools and accessories, our diverse listings have
              everything you need to help your garden thrive.
            </p>
            <SearchBarHero setSearch={setSearch} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroNew;
