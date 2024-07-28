import React from "react";
import Link from "next/link";
import logo from "../../assets/logo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <div>
      <footer className="w-full ">
        <div className="w-full px-4 mx-auto bg-gray-50 sm:px-6 lg:px-8 xl:px-64">
          <div className="grid grid-cols-2 gap-3 py-10 sm:grid-cols-4 lg:grid-cols-6 md:gap-8 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
            <div className="mb-10 col-span-full lg:col-span-2 lg:mb-0">
              <Image
                src={logo}
                alt="logo"
                width={200}
                height={200}
                className="w-24 h-24 mx-auto md:mx-0"
              />
              <p className="py-8 text-sm text-center text-gray-500 lg:max-w-xs lg:text-left">
                Trusted in more than 100 countries & 5 million customers. Have
                any query ?
              </p>
            </div>

            <div className="text-left lg:mx-auto ">
              <h4 className="text-lg font-medium text-gray-900 mb-7">
                GreenScape
              </h4>
              <ul className="text-sm transition-all duration-500">
                <li className="mb-6">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Home
                  </a>
                </li>
                <li className="mb-6">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    About
                  </a>
                </li>
                <li className="mb-6">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Features
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-left lg:mx-auto ">
              <h4 className="text-lg font-medium text-gray-900 mb-7">
                Products
              </h4>
              <ul className="text-sm transition-all duration-500">
                <li className="mb-6">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Figma UI System
                  </a>
                </li>
                <li className="mb-6">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Icons Assets
                  </a>
                </li>
                <li className="mb-6">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Responsive Blocks
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Components Library
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-left lg:mx-auto">
              <h4 className="text-lg font-medium text-gray-900 mb-7">
                Resources
              </h4>
              <ul className="text-sm transition-all duration-500">
                <li className="mb-6">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    FAQs
                  </a>
                </li>
                <li className="mb-6">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Quick Start
                  </a>
                </li>
                <li className="mb-6">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    User Guide
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-left lg:mx-auto">
              <h4 className="text-lg font-medium text-gray-900 mb-7">Blogs</h4>
              <ul className="text-sm transition-all duration-500">
                <li className="mb-6">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    News
                  </a>
                </li>
                <li className="mb-6">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Tips & Tricks
                  </a>
                </li>
                <li className="mb-6">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    New Updates
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Events
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 py-7">
            <div className="flex flex-col items-center justify-center lg:justify-between lg:flex-row">
              <span className="text-sm text-gray-500 ">
                ©GreenScape 2024, All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
