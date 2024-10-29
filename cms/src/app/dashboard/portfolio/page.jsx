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
import ProductsList from "@/components/products/ProductsList";
import ServicesList from "@/components/services/ServicesList";

const page = () => {
  const { toast } = useToast();
  const { professional } = useAuthContext();
  const professionalId = professional?.professionalId;
  const [userdata, setUserdata] = useState(null);
  const [projects, setProjects] = useState(null);
  const [products, setProducts] = useState(null);
  const [services, setServices] = useState(null);
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

  useEffect(() => {
    if (professionalId) {
      fetch(`/api/products/user/${professionalId}`)
        .then((res) => res.json())
        .then((projects) => {
          setProducts(projects);
        })
        .catch((error) => {
          console.error("Error fetching projects data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [professionalId]);

  useEffect(() => {
    if (professionalId) {
      fetch(`/api/service/professional/${professionalId}`)
        .then((res) => res.json())
        .then((projects) => {
          setServices(projects);
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
            className="absolute top-0 left-0 z-0 w-full h-60"
          />
          <div className="w-full max-w-full px-6 mx-auto lg:px-24 md:px-8">
            <div className="relative z-10 flex items-center justify-center mb-5 sm:justify-start">
              <img
                src={`https://dummyimage.com/200.png/bfe3b4/&text=${userdata.name.charAt(
                  0
                )}`}
                alt="user-avatar-image"
                className="border-4 border-white border-solid rounded-full"
              />
            </div>
            <div className="flex flex-col justify-between mb-5 sm:flex-row max-sm:gap-5">
              <div className="block">
                <h3 className="mb-1 text-4xl font-bold text-center text-gray-900 font-manrope sm:flex">
                  {userdata.name} <EditProfile userdata={userdata} />
                </h3>
                <div className="flex items-center gap-2 text-greenscape">
                  {" "}
                  <PiBuildingOffice size={20} />
                  <p className="font-normal leading-7 text-center sm:text-left text-greenscape">
                    {userdata.city}
                  </p>
                </div>
              </div>
              <div className="flex justify-center gap-4 md:justify-start"></div>
            </div>
            <div className="w-full rounded-[30px] overflow-hidden border border-solid border-[#e6e6e6] p-9 mt-20">
              <h1 className="font-poppins text-[24px] font-semibold text-textmain mb-6">
                Bio?
              </h1>
              <p>{userdata.bio}</p>
            </div>
            <div className="w-full rounded-[30px] overflow-hidden border border-solid border-[#e6e6e6] p-9 mt-20">
              <h1 className="font-poppins text-[24px] font-semibold text-textmain mb-6 ">
                Your products
              </h1>
              <ProductsList productsList={products} />
              <h1 className="font-poppins text-[24px] font-semibold text-textmain mb-6 mt-8">
                Your services
              </h1>
              <ServicesList services={services} />
              <h1 className="font-poppins text-[24px] font-semibold text-textmain mb-6 mt-8">
                Your projects
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
