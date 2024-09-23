"use client";
import React from "react";
import { useState } from "react";
import loginIMage from "../../assets/login-image.png";
import logo from "../../assets/logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSignup } from "@/hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(name, email, password, city, country);
    if (success) {
      window.location.href = "/";
    }
  };

  return (
    <div className="flex w-full mt-24 bg-background text-textmain">
      <div className="w-1/2 mx-auto">
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
            Sign up to enjoy all the features.
          </h1>
          <form className="signup" onSubmit={handleSubmit}>
            <div className="relative mb-3" data-twe-input-wrapper-init>
              <div>
                <div className="loginInput">
                  <label className="relative text">Full name</label>
                  <input
                    type="text"
                    placeholder="Sunil Perera"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm input fmt-1 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-accent sm:text-sm focus:ring-1 placeholder:text-[14px]"
                  />
                </div>
                <div className="loginInput">
                  <label className="relative text">Email</label>
                  <input
                    type="text"
                    placeholder="sunil@gmail.com"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm input fmt-1 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-accent sm:text-sm focus:ring-1 placeholder:text-[14px]"
                  />
                </div>
                <div className="loginInput">
                  <label className="relative text">City</label>
                  <input
                    type="text"
                    placeholder="Colombo"
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm input fmt-1 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-accent sm:text-sm focus:ring-1 placeholder:text-[14px]"
                  />
                </div>
                <div className="loginInput">
                  <label className="relative text">Country</label>
                  <input
                    type="text"
                    placeholder="Sri Lanka"
                    name="country"
                    onChange={(e) => setCountry(e.target.value)}
                    className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm input fmt-1 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-accent sm:text-sm focus:ring-1 placeholder:text-[14px]"
                  />
                </div>
                <div className="loginInput">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm input fmt-1 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-accent sm:text-sm focus:ring-1 placeholder:text-[14px] mt-[20px]"
                  />
                </div>
                <div className="loginInput">
                  <input
                    type="password"
                    placeholder=" Retype password"
                    name="retypepassword"
                    className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm input fmt-1 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-accent sm:text-sm focus:ring-1 placeholder:text-[14px] mt-[20px]"
                  />
                </div>
                <Button
                  disabled={isLoading}
                  className="w-full bg-accent hover:bg-accentdark mt-[20px]"
                >
                  Sign up
                </Button>
                {error && <div className="text-red-500">{error}</div>}
              </div>
            </div>
          </form>
          <p className="text-textmain text-[14px] text-center py-4">
            Already have an account??{" "}
            <span className="underline text-accent">
              {" "}
              <Link href="/login">Log in</Link>
            </span>
          </p>
        </div>
      </div>
      {/* <div className="w-1/2">
        <Image src={loginIMage} className="w-full p-12" alt="logo"></Image>
      </div> */}
    </div>
  );
};

export default Signup;
