"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ProfileSkeleton from "@/components/skeletons/skeleton-profile-hero";
import EditProfile from "@/components/profile/EditProfile";
import { PiBuildingOffice } from "react-icons/pi";
import ProjectsList from "@/components/projects/ProjectsList";

const page = () => {
  const { toast } = useToast();
  const { professional } = useAuthContext();
  const professionalId = professional?.professionalId;
  const [userdata, setUserdata] = useState(null);
  const [projects, setProjects] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [editUserdata, setEditUserdata] = useState({
    name: "",
    city: "",
    bio: "",
  });

  useEffect(() => {
    if (professionalId) {
      fetch(`/api/professional/${professionalId}`)
        .then((res) => res.json())
        .then((userdata) => {
          setUserdata(userdata);
          setEditUserdata({
            name: userdata.name,
            city: userdata.city,
            bio: userdata.bio || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [professionalId]);

  useEffect(() => {
    if (professionalId) {
      fetch(`/api/projects/user/${professionalId}`)
        .then((res) => res.json())
        .then((projects) => {
          setProjects(projects);
        })
        .catch((error) => {
          console.error("Error fetching projects data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [professionalId]);

  if (isLoading) return <ProfileSkeleton />;
  if (!professional) return <p>No profile data</p>;

  return (
    <div>
      {userdata ? (
        <section className="relative pt-40 pb-24">
          <img
            src="https://pagedone.io/asset/uploads/1705473378.png"
            alt="cover-image"
            className="w-full absolute top-0 left-0 z-0 h-60"
          />
          <div className="w-full max-w-full mx-auto px-6 lg:px-24 md:px-8">
            <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
              <img
                src="https://pagedone.io/asset/uploads/1705471668.png"
                alt="user-avatar-image"
                className="border-4 border-solid border-white rounded-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row max-sm:gap-5 justify-between mb-5">
              <div className="block">
                <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-1 sm:flex text-center">
                  {userdata.name} <EditProfile userdata={userdata} />
                </h3>
                <div className="text-greenscape flex items-center gap-2">
                  {" "}
                  <PiBuildingOffice size={20} />
                  <p className="font-normal leading-7 text-center sm:text-left  text-greenscape">
                    {userdata.city}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 justify-center md:justify-start">
                <Button variant="outline">Message </Button>
              </div>
            </div>
            <div className="w-full rounded-[30px] overflow-hidden border border-solid border-[#e6e6e6] p-9 mt-20">
              <h1 className="font-poppins text-[24px] font-semibold text-textmain mb-6">
                Who are we?
              </h1>
              <p>{userdata.bio}</p>
            </div>
            <div className="w-full rounded-[30px] overflow-hidden border border-solid border-[#e6e6e6] p-9 mt-20">
              <h1 className="font-poppins text-[24px] font-semibold text-textmain mb-6">
                Our projects
              </h1>
              <ProjectsList projectsList={projects} />
            </div>
          </div>
        </section>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default page;
