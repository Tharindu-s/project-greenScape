"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NavbarItems } from "../constants/navbar";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useLogout } from "@/hooks/useLogout";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const { professional } = useAuthContext();
  const { logout } = useLogout();
  const router = useRouter();

  const handleClick = () => {
    logout();
    router.push("/login");
  };

  const pathname = usePathname();
  return (
    <aside className="hidden h-full border-r bg-muted/40 md:block">
      <div className="fixed flex flex-col h-screen gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            {/* <FiPackage className="w-6 h-6" /> */}
            <span className="xl:w-56">{professional?.professionalName}</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {NavbarItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary ${
                  pathname === item.href
                    ? "text-white bg-greenscape rounded-xl"
                    : ""
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 mt-auto">
          <div className="flex items-center gap-3 px-3 py-3 transition-all rounded-lg text-muted-foreground hover:text-primary">
            <FiLogOut className="w-5 h-5" />
            <button onClick={handleClick}>Logout</button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
