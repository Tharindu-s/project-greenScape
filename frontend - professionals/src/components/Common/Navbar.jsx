"use client";
import React from "react";
import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";
import { cn } from "../../lib/utils";
import logo from "../../assets/logo.png";
import { useAuthContext } from "@/hooks/useAuthContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { services } from "../Constants/Navbar-data";
import { materials } from "../Constants/Navbar-data";
import { plants } from "../Constants/Navbar-data";
import { MdArrowDropDown } from "react-icons/md";

function Navbar() {
  const { professional } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };
  return (
    <div className="flex justify-between px-4 py-4 bg-mint md:px-10 lg:px-12 xl:px-24 2xl:px-48">
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>About GreenScape</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md"
                        href="/"
                      >
                        <Image src={logo} height={150} width={150} alt="logo" />
                        <div className="mt-4 mb-2 text-lg font-medium">
                          GreenScape
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          At GreenScape, we've created a vibrant community where
                          gardening enthusiasts of all levels come together to
                          share their passion, knowledge, and experiences.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem href="/" title="Typography">
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
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
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
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

      {professional && (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-1">
                <p>My profile</p> <MdArrowDropDown size={18} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/my-profile">
                <DropdownMenuLabel>{professional.email}</DropdownMenuLabel>
              </Link>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <button onClick={handleClick}>Log out</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      {!professional && (
        <div className="flex">
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
        </div>
      )}
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
