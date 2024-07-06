"use client";
import React from "react";
import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";
import { cn } from "../../lib/utils";
import { useAuthContext } from "@/hooks/useAuthContext";
import Image from "next/image";
import { MdArrowDropDown } from "react-icons/md";

function Navbar() {
  const { professional } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };
  return (
    <div className="flex px-4 py-4 bg-mint md:px-10 lg:px-12 xl:px-24 2xl:px-48">
      {professional && (
        <div>
          {professional.email}
          <button onClick={handleClick}>Log out</button>
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
