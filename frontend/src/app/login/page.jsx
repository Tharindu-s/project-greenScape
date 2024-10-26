"use client";
import React, { useState } from "react";
import loginIMage from "../../assets/login-image.png";
import logo from "../../assets/logo.png";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";

// components

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      window.location.href = "/";
    }
  };

  return (
    <div className="flex my-24 text-textmain ">
      <div className="w-1/2 mx-auto ">
        <div className="w-1/3 mx-auto ">
          <Link href="/">
            <Image
              src={logo}
              height={100}
              width={100}
              className="mx-auto my-16"
              alt="logo"
            ></Image>
          </Link>
          <h1 className="text-[14px] tracking-normal font-inter text-center">
            Log in to enjoy all the features.
          </h1>
          <div>
            <div className="relative mb-3" data-twe-input-wrapper-init>
              <form onSubmit={handleSubmit}>
                <div className="loginInput">
                  <label className="relative text">Email</label>
                  <input
                    type="text"
                    placeholder="greescape@gmail.com"
                    name="input"
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm input fmt-1 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-accent sm:text-sm focus:ring-1 placeholder:text-[14px]"
                  />
                </div>

                <div className="loginInput">
                  <input
                    type="password"
                    placeholder="Type your password"
                    name="input"
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm input fmt-1 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-accent sm:text-sm focus:ring-1 placeholder:text-[14px] mt-[20px]"
                  />
                  <Link
                    href="/forgot-password"
                    className="text-center text-accent"
                  >
                    <p className="mt-2 text-sm underline">Forgot password?</p>
                  </Link>
                </div>

                <Button
                  disabled={isLoading}
                  className="w-full bg-accent hover:bg-accentdark mt-[20px]"
                >
                  Log in
                </Button>
                {error && <p className="text-red-500">{error}</p>}
              </form>
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
      {/* <div className="w-1/2">
        <Image src={loginIMage} className="w-[75%] p-12" alt="logo"></Image>
      </div> */}
    </div>
  );
};

export default Login;
