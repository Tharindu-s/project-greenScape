import React from "react";
import { BiMessageSquare } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { TbArrowsExchange } from "react-icons/tb";
import Notifications from "./Notifications";
import Link from "next/link";

const NavbarIcons = () => {
  return (
    <div className="flex items-center gap-8">
      <Link href="/exchange">
        <TbArrowsExchange size={24} />
      </Link>
      <Link href="/chat">
        <BiMessageSquare size={24} />
      </Link>
      <Link href="/cart">
        <FiShoppingCart size={24} />
      </Link>
      <Notifications size={24} />
    </div>
  );
};

export default NavbarIcons;
