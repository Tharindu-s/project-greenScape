import {
  FiBell,
  FiPackage,
  FiUser,
  FiFile,
  FiMail,
  FiSend,
  FiStar,
  FiMessageSquare,
  FiPenTool,
} from "react-icons/fi";

export const NavbarItems = [
  { title: "Portfolio", icon: FiUser, href: "/dashboard/portfolio" },
  { title: "Projects", icon: FiFile, href: "/dashboard/projects" },
  { title: "Products", icon: FiPackage, href: "/dashboard/products" },
  { title: "Services", icon: FiBell, href: "/dashboard/services" },
  { title: "Inquiries", icon: FiMail, href: "/dashboard/inquiries" },
  { title: "To ship", icon: FiSend, href: "/dashboard/to-ship" },
  { title: "Chat", icon: FiMessageSquare, href: "/dashboard/chat" },
  { title: "Blog", icon: FiPenTool, href: "/dashboard/blogs" },
];
