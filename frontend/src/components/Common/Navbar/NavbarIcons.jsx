import React from "react";
import { BiMessageSquare } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import Notifications from "./Notifications";

const NavbarIcons = () => {
  return (
    <div className="flex items-center gap-8">
      <FiShoppingCart size={24} />
      <BiMessageSquare size={24} />
      {/* notification menu */}
      <Notifications />
    </div>
  );
};

export default NavbarIcons;
