import React from "react";
import { ImLinkedin } from "react-icons/im";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaFacebookSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import Link from "next/link";
import logo from "../../assets/logo.png";
import Image from "next/image";
import { services } from "../Constants/Navbar-data";
import { materials } from "../Constants/Navbar-data";
import { plants } from "../Constants/Navbar-data";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white">
        <div className="max-w-screen-xl px-4 py-16 mx-auto space-y-8 sm:px-6 lg:space-y-16 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-teal-600">
              <Image src={logo} height={100} width={100} alt="logo"></Image>
            </div>
            <ul className="flex justify-start gap-6 mt-8 sm:mt-0 sm:justify-end text-accent">
              <Link href="#">
                <ImLinkedin className="mb-8" size={28} />
              </Link>
              <Link href="#">
                <IoLogoWhatsapp className="mb-8" size={28} />
              </Link>
              <Link href="#">
                <BiLogoInstagramAlt className="mb-8" size={28} />
              </Link>
              <Link href="#">
                <FaFacebookSquare className="mb-8" size={28} />
              </Link>
              <Link href="#">
                <MdEmail className="mb-8" size={28} />
              </Link>
              <Link href="#">
                <IoCall className="mb-8" size={28} />
              </Link>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 pt-8 border-t border-gray-100 sm:grid-cols-2 lg:grid-cols-4 lg:pt-16">
            <div>
              <p className="font-medium text-gray-900">Plants</p>
              {plants.map((plantType) => (
                <div key={plantType.title}>
                  <ul className="mt-6 space-y-4 text-sm">
                    <li>
                      <a
                        href={plantType.href}
                        className="text-gray-700 transition hover:opacity-75"
                      >
                        {plantType.title}
                      </a>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <div>
              <p className="font-medium text-gray-900">Materials</p>
              {materials.map((material) => (
                <div key={material.title}>
                  <ul className="mt-6 space-y-4 text-sm">
                    <li>
                      <a
                        href={material.href}
                        className="text-gray-700 transition hover:opacity-75"
                      >
                        {material.title}
                      </a>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <div>
              <p className="font-medium text-gray-900">Services</p>
              {services.map((service) => (
                <div key={service.title}>
                  <ul className="mt-6 space-y-4 text-sm">
                    <li>
                      <a
                        href={service.href}
                        className="text-gray-700 transition hover:opacity-75"
                      >
                        {service.title}
                      </a>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-500">
            &copy; 2022. Company Name. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
