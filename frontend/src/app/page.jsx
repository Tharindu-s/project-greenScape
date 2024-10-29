"use client";
import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.location.href = "/greenscape";
  }, []);
  return <div></div>;
};

export default Home;
