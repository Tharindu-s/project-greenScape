"use client";
import { Dashboard } from "@/components/Dashboard";
import { useEffect } from "react";

export default async function Home() {
  useEffect(() => {
    window.location.href = "/dashboard/users";
  }, []);
  return (
    <main>
      <Dashboard />
    </main>
  );
}
