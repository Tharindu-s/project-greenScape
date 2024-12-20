"use client";
import React, { useState } from "react";
import loginIMage from "../../assets/login-image.png";
import logo from "../../assets/logo.png";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import Link from "next/link";

// components

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/user/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      console.log("Email sent successfully");
    } else {
      setError("Email not found. Please try again.");
    }
  };

  return (
    <div className="flex w-full my-24 text-textmain">
      <div className="w-1/4 mx-auto ">
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
                  placeholder="greenscape@gmail.com"
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
