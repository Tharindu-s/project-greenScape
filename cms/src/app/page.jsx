"use client";
import Form from "@/components/Common/ProjectForm";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { professional } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!professional) {
      router.push("/login");
    }
  }, [professional, router]);

  return (
    <main>
      {professional && (
        <Link href="/add-project">
          <Button>Welcome to Professional CMS-Greenscape</Button>
        </Link>
      )}
    </main>
  );
}
