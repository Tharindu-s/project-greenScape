"use client";
import React, { useContext } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useAuthContext } from "@/hooks/useAuthContext";
import { useLogout } from "@/hooks/useLogout";
import { FaRegUser } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import { Separator } from "../ui/separator";
import { navbarItems } from "@/constants/navbar";
import Link from "next/link";

const SideBar = () => {
  const { professional } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <div className="fixed top-0 left-0">
      {!professional ? (
        <div></div>
      ) : (
        <Sheet>
          <SheetTrigger asChild>
            <div className="grid justify-start w-16 h-screen grid-cols-1 p-4 bg-gray-100 shadow-md cursor-pointer">
              <RiMenu2Fill size={28} />
              <div>
                {navbarItems.map((item) => (
                  <Link key={item.id} className="block my-6" href={item.url}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{item.icon}</TooltipTrigger>
                        <TooltipContent>
                          <p>{item.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                ))}
              </div>
            </div>
          </SheetTrigger>

          <SheetContent side="left" className="w-[400px] sm:w-[300px]">
            <SheetHeader>
              <SheetTitle>
                <div className="flex items-center gap-3">
                  {professional?.professionalName}
                </div>
              </SheetTitle>
              <SheetDescription>
                <div>{professional?.email}</div>
                {professional ? (
                  <button
                    onClick={handleClick}
                    className="text-red-400 hover:text-red-600"
                  >
                    Log out
                  </button>
                ) : null}

                <Separator className="my-3" />

                {navbarItems.map((item) => (
                  <div key={item.id}>
                    <Link href={item.url}>
                      <p className="font-inter w-full flex gap-2 items-center bg-transparent hover:bg-slate-200 text-textmain text-[16px] py-4 px-3 rounded-md text-left">
                        {item.iconMini}
                        {item.title}
                      </p>
                    </Link>
                  </div>
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default SideBar;
