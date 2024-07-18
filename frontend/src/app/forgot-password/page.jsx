"use client";
import React, { useState } from "react";
import loginIMage from "../../assets/login-image.png";
import logo from "../../assets/logo.png";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";

// components

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      window.location.href = "/";
    }
  };

  return (
    <div className="flex w-full bg-background text-textmain">
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
          Insert your email to reset your password.
        </h1>
        <div>
          <div className="relative mb-3" data-twe-input-wrapper-init>
            <form onSubmit={handleSubmit}>
              <div className="loginInput">
                <label className="relative text">Email</label>
                <input
                  type="text"
                  placeholder="sunil@gmail.com"
                  name="input"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm input fmt-1 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-accent focus:ring-accent sm:text-sm focus:ring-1 placeholder:text-[14px]"
                />
              </div>

              <Button
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accentdark mt-[20px]"
              >
                Send
              </Button>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
