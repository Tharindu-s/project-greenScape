"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dashboard } from "@/components/Dashboard";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Home() {
  const { professional } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!professional) {
      router.push("/login");
    }
  }, [professional, router]);

  if (!professional) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <Dashboard />
    </main>
  );
}
