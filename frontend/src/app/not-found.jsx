import React from "react";

const NotFound = () => {
  return (
    <main class="h-screen w-full flex flex-col justify-center items-center bg-background">
      <h1 class="text-9xl font-extrabold text-black tracking-widest">404</h1>
      <div class="bg-accent px-2 text-sm rounded rotate-12 absolute text-white">
        Page Not Found
      </div>
      <button class="mt-5">
        <a class="relative inline-block text-sm font-medium text-accent group active:text-orange-500 focus:outline-none focus:ring">
          <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-accent group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span class="relative block px-8 py-3 bg-background border border-current">
            <router-link to="/">Go Home</router-link>
          </span>
        </a>
      </button>
    </main>
  );
};

export default NotFound;
