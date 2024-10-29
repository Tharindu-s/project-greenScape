"use client";
import { useEffect } from "react";

export default async function Home() {
  useEffect(() => {
    window.location.href = "/dashboard/portfolio";
  }, []);

  return (
    <main>
      <h1>sdasd</h1>
    </main>
  );
}
