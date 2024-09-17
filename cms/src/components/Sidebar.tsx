"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarItems } from "../constants/navbar";
import { useAuthContext } from "@/hooks/useAuthContext";

const Sidebar = () => {
  const { professional } = useAuthContext();

  const pathname = usePathname();
  return (
    <aside className="hidden border-r bg-muted/40 md:block h-screen">
      <div className="flex h-screen flex-col gap-2 fixed">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            {/* <FiPackage className="h-6 w-6" /> */}
            <span className="">{professional?.professionalName}</span>
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
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          {/* <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
