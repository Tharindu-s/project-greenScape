"use client";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import Projects from "@/components/home/Projects-common";
import Projectsprofile from "@/components/profile/Projects-profile";

export default function Home() {
  const { professional } = useAuthContext();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/projects", {
        headers: { Authorization: `Bearer ${professional.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        setProjects(json);
      }
    };

    if (professional) {
      fetchWorkouts();
    }
  }, [professional]);
  return (
    <div className="relative home">
      {/* <Projects projects={projects} /> */}
      <Projectsprofile projects={projects} />
    </div>
  );
}
