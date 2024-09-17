"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";
import { cn } from "../../../lib/utils";
import logo from "../../../assets/logo.png";
import { useAuthContext } from "@/hooks/useAuthContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";

import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { services } from "../../Constants/Navbar-data";
import { materials } from "../../Constants/Navbar-data";
import { plants } from "../../Constants/Navbar-data";
import NavbarIcons from "./NavbarIcons";
import UserProfileMenu from "./UserProfileMenu";
import { BASE_URL } from "@/components/Constants/server";
import { set } from "react-hook-form";
import SearchBar from "./SearchBar";
import { useSearch } from "@/context/searchContext";

function Navbar() {
  const { setSearch } = useSearch();
  const { user } = useAuthContext();

  return (
    <div className="fixed top-0 z-50 flex items-center justify-between w-full px-4 py-4 bg-white border-b border-gray-300 md:px-10 lg:px-12 xl:px-24 2xl:px-48">
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/">
                <Image
                  src={logo}
                  width={80}
                  heigh={80}
                  className="px-3"
                  alt="logo"
                ></Image>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link href="/products">Plants</Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {plants.map((plantType) => (
                    <ListItem
                      key={plantType.title}
                      title={plantType.title}
                      href={plantType.href}
                    >
                      {plantType.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Materials</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {materials.map((material) => (
                    <ListItem
                      key={material.title}
                      title={material.title}
                      href={material.href}
                    >
                      {material.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link href="/services">Services</Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {services.map((service) => (
                    <ListItem
                      key={service.title}
                      title={service.title}
                      href={service.href}
                    >
                      {service.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div>
        <div className="relative">
          <SearchBar />
        </div>
      </div>
      {/* messages, notifications and cart icons */}
      <NavbarIcons />
      <div className="flex items-center">
        {user ? (
          <UserProfileMenu />
        ) : (
          <>
            <Link href="/signup">
              <p className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md group w-max hover:bg-accent hover:text-white">
                Sign up
              </p>
            </Link>
            <Link href="/login">
              <p className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md bg-slate-100 hover:bg-white group w-max">
                Log in
              </p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default Navbar;
