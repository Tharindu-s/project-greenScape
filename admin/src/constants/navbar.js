import {
  FiBell,
  FiPackage,
  FiBellOff,
  FiUser,
  FiPenTool,
} from "react-icons/fi";

export const NavbarItems = [
  { title: "Products", icon: FiPackage, href: "/dashboard/products" },
  { title: "Services", icon: FiBell, href: "/dashboard/services" },
  { title: "Users", icon: FiUser, href: "/dashboard/users" },
  { title: "Blogs", icon: FiPenTool, href: "/dashboard/blogs" },
  { title: "Notifications", icon: FiBellOff, href: "/dashboard/notifications" },
];
