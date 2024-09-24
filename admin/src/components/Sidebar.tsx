"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarItems } from "../constants/navbar";
import { useAuthContext } from "@/hooks/useAuthContext";

const Sidebar = () => {
  const { admin } = useAuthContext();

  const pathname = usePathname();
  return (
    <aside className="hidden h-screen border-r bg-muted/40 md:block">
      <div className="fixed flex flex-col h-screen gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            {/* <FiPackage className="w-6 h-6" /> */}
            <span className="">{admin?.adminName}</span>
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
