import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-slate-50">
      <div className="container flex flex-col items-center px-4 py-24 mx-auto">
        <div className="mb-6">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={75}
            className="mx-auto"
          />
        </div>
        <nav className="mb-6">
          <ul className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Services
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="text-sm text-center text-gray-500">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
