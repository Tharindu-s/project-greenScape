import React from "react";
import loginIMage from "../../assets/login-image.png";
import logo from "../../assets/logo.png";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import Link from "next/link";

// components

const Login = () => {
  return (
    <div className="flex w-full bg-background text-textmain">
      <div className="w-1/2 ">
        <div className="w-1/3 mx-auto ">
          <Link href="/">
            <Image
              src={logo}
              height={100}
              width={100}
              className="mx-auto my-16"
            ></Image>
          </Link>
          <h1 className="text-[14px] tracking-normal font-inter text-center">
            Sign up to enjoy all the features.
          </h1>
          <div>
            <div class="relative mb-3" data-twe-input-wrapper-init>
              <div>
                <div class="loginInput">
                  <label for="input" className="relative text">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="sunil@gmail.com"
                    name="input"
                    className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm input fmt-1 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-accent sm:text-sm focus:ring-1 placeholder:text-[14px]"
                  />
                </div>

                <div class="loginInput">
                  <input
                    type="text"
                    placeholder="Password"
                    name="input"
                    className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm input fmt-1 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-accent sm:text-sm focus:ring-1 placeholder:text-[14px] mt-[20px]"
                  />
                </div>

                <Button className="w-full bg-accent hover:bg-accentdark mt-[20px]">
                  Log in
                </Button>
              </div>
            </div>
          </div>
          <p className="text-textmain text-[14px] text-center py-4">
            Don't have an account??
            <span className="underline text-accent">
              {" "}
              <Link href="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
      <div className="w-1/2">
        <Image src={loginIMage} className="w-full p-12"></Image>
      </div>
    </div>
  );
};

export default Login;
