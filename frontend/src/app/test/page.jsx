"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const page = () => {
  return (
    <div className="mt-32">
      <section className="relative flex justify-center">
        <img
          src="https://pagedone.io/asset/uploads/1702362010.png"
          alt="gradient background image"
          className="fixed object-cover w-full h-full"
        />
        <div className="absolute max-w-lg px-6 py-20 mx-auto lg:px-8">
          <img
            src="https://pagedone.io/asset/uploads/1702362108.png"
            alt="pagedone logo"
            className="mx-auto mb-8 lg:mb-11"
          />
          <div className="bg-white shadow-xl rounded-2xl">
            <form action="" className="mx-auto lg:p-11 p-7">
              <div className="mb-11">
                <h1 className="mb-2 text-3xl font-bold leading-10 text-center text-gray-900 font-manrope">
                  Welcome Back
                </h1>
                <p className="text-base font-medium leading-6 text-center text-gray-500">
                  Let’s get started with your 30 days free trial
                </p>
              </div>
              <input
                type="text"
                className="w-full h-12 px-4 mb-6 text-lg font-normal leading-7 text-gray-900 border border-gray-300 rounded-full shadow-sm placeholder:text-gray-400 focus:outline-none"
                placeholder="Username"
              />
              <input
                type="password"
                className="w-full h-12 px-4 mb-1 text-lg font-normal leading-7 text-gray-900 border border-gray-300 rounded-full shadow-sm placeholder:text-gray-400 focus:outline-none"
                placeholder="Password"
              />
              <a href="#" className="flex justify-end mb-6">
                <span className="text-base font-normal leading-6 text-right text-indigo-600">
                  Forgot Password?
                </span>
              </a>
              <button className="w-full h-12 text-base font-semibold leading-6 text-center text-white transition-all duration-700 bg-indigo-600 rounded-full shadow-sm hover:bg-indigo-800 mb-11">
                Login
              </button>
              <a
                href="#"
                className="flex justify-center text-base font-medium leading-6 text-gray-900"
              >
                {" "}
                Don’t have an account?{" "}
                <span className="pl-3 font-semibold text-indigo-600">
                  {" "}
                  Sign Up
                </span>
              </a>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
