import { FaRegUser } from "react-icons/fa6";
import { GrProjects } from "react-icons/gr";
import { GoProjectSymlink } from "react-icons/go";
import { AiOutlineProduct } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { RiCustomerService2Line } from "react-icons/ri";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineReviews } from "react-icons/md";

export const navbarItems = [
  {
    id: 1,
    title: "Portfolio",
    url: "/portfolio",
    icon: <GrProjects size={24} />,
    iconMini: <GrProjects size={16} />,
    tooltip: "Portfolio",
  },
  {
    id: 2,
    title: "Projects",
    url: "/projects",
    icon: <GoProjectSymlink size={28} />,
    iconMini: <GoProjectSymlink size={19} />,
    tooltip: "Projects",
  },
  {
    id: 3,
    title: "Products",
    url: "/products",
    icon: <AiOutlineProduct size={32} />,
    iconMini: <AiOutlineProduct size={19} />,
    tooltip: "Products",
  },
  {
    id: 4,
    title: "Inquiries",
    url: "/inquiries",
    icon: <RiCustomerService2Line size={28} />,
    iconMini: <RiCustomerService2Line size={19} />,
    tooltip: "Inquiries",
  },
  {
    id: 5,
    title: "Messages",
    url: "/messages",
    icon: <FiMessageSquare size={28} />,
    iconMini: <FiMessageSquare size={19} />,
    tooltip: "Messages",
  },
  {
    id: 6,
    title: "To ship",
    url: "/to-ship",
    icon: <LiaShippingFastSolid size={28} />,
    iconMini: <LiaShippingFastSolid size={19} />,
    tooltip: "To ship",
  },
  {
    id: 7,
    title: "Reviews",
    url: "/reviews",
    icon: <MdOutlineReviews size={28} />,
    iconMini: <MdOutlineReviews size={19} />,
    tooltip: "Reviews",
  },
];
