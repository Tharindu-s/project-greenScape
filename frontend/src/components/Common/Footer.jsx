import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-14 bg-slate-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={75}
            className="mx-auto"
          />
          <ul className="flex flex-col items-center justify-center py-16 mb-10 text-lg transition-all duration-500 border-b border-gray-200 gap-7 md:flex-row md:gap-12">
            <li>
              <a href="/" className="text-gray-800 hover:text-gray-900">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="text-gray-800 hover:text-gray-900">
                Products
              </a>
            </li>
            <li>
              <a href="/services" className="text-gray-800 hover:text-gray-900">
                Services
              </a>
            </li>
            <li>
              <a href="/blogs" className="text-gray-800 hover:text-gray-900">
                Blogs
              </a>
            </li>
          </ul>

          <span className="block text-center text-gray-500 text-xm">
            ©<Link href="/">pagedone</Link>2024, All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
