"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { FaLocationDot } from "react-icons/fa6";
import userIcon from "../../assets/Profile/userIcon.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import ProductsProfile from "@/components/profile/Products-profile";
import ProfileSkeleton from "@/components/skeletons/skeleton-profile-hero";

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

const Profile = () => {
  const { toast } = useToast();
  const { user } = useAuthContext();
  const userId = user?.userId;
  const [userdata, setUserdata] = useState(null);
  const [products, setProducts] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [editUserdata, setEditUserdata] = useState({
    name: "",
    city: "",
    bio: "",
  });

  useEffect(() => {
    if (userId) {
      fetch(`/api/user/${userId}`)
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
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetch(`/api/products/user/${userId}`)
        .then((res) => res.json())
        .then((products) => {
          setProducts(products);
        })
        .catch((error) => {
          console.error("Error fetching products data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditUserdata((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSaveChanges = () => {
    fetch(`/api/user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editUserdata),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUserdata(updatedUser);
        toast({
          title: "Changes saved",
          description: "Your profile has been successfully updated.",
        });
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        toast({
          title: "Error",
          description: "There was a problem updating your user data.",
          status: "error",
        });
      });
  };

  if (isLoading) return <ProfileSkeleton />;
  if (!user) return <p>No profile data</p>;

  return (
    <div>
      {userdata ? (
        <div>
          {/* hero */}
          <div className="px-4 md:px-10 lg:px-12 xl:px-24 2xl:px-64 ">
            <div className="relative w-full mt-16 mb-10 h-80 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500">
              <div className="absolute -bottom-20 left-4">
                <Image
                  src={userIcon}
                  height={200}
                  width={200}
                  alt="Profile image"
                ></Image>
              </div>
            </div>
            <div className="mt-24 ml-12">
              <div className="flex items-center gap-4">
                <h1 className="font-poppins font-semibold text-[36px]">
                  {userdata.name}
                </h1>
                {/* edit profile */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[600px] ">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          className="col-span-3"
                          value={editUserdata.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="city" className="text-right">
                          City
                        </Label>
                        <Input
                          id="city"
                          className="col-span-3"
                          value={editUserdata.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="bio" className="text-right">
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          className="col-span-3 min-h-[300px]"
                          value={editUserdata.bio}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        className="bg-accent hover:bg-accentdark"
                        onClick={handleSaveChanges}
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center gap-1 font-poppins text-[16px] text-accent">
                <FaLocationDot size={16} />
                <p>{userdata.city}</p>
              </div>
            </div>
            {/* bio */}
            <div className="w-full rounded-[30px] overflow-hidden border border-solid border-[#e6e6e6] p-9 mt-20">
              <h1 className="font-poppins text-[24px] font-semibold text-textmain mb-6">
                Bio
              </h1>
              <p>{userdata.bio}</p>
              <h1 className="font-poppins text-[24px] font-semibold text-textmain mb-6 mt-8 ">
                Products interested in
              </h1>

              <div className="relative w-fit mt-[-1.00px] font-inter font-semibold text-accent text-sm tracking-0 leading-normal bg-[#EDF0F8] py-2 px-4 rounded-3xl">
                Home plants
              </div>
            </div>
          </div>

          <div>
            <h1 className="font-poppins text-[24px] font-semibold text-textmain mt-16 mb-10 px-4 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
              Your listings
            </h1>
            <ProductsProfile products={products} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
