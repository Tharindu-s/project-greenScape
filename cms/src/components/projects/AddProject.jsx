"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { serviceList } from "@/constants/service-types";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/lib/firebase";
import { FiPlus } from "react-icons/fi";
const storage = getStorage(app);

const AddProject = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { professional } = useAuthContext();

  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [professionalname, setProfessionalname] = useState("");
  const [professionalId, setProfessionalId] = useState("");
  const [images, setImages] = useState([]);
  // const [image, setImage] = useState(null);
  const [media, setMedia] = useState([]);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const upload = async () => {
      const uploadTasks = images.map((image) => {
        const imageName = new Date().getTime() + image.name;
        const storageRef = ref(storage, imageName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progress);
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              console.error(error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  resolve(downloadURL);
                })
                .catch((error) => reject(error));
            }
          );
        });
      });

      try {
        const urls = await Promise.all(uploadTasks);
        setMedia(urls); // Assuming you want to store all URLs
        console.log(urls);
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    };

    if (images.length > 0) {
      upload();
    }
  }, [images]);

  useEffect(() => {
    if (professional) {
      setProfessionalname(professional.professionalName); // Pre-fill username from context
      setProfessionalId(professional.professionalId);
    }
  }, [professional]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!professional) {
      setError("You must be logged in to add a project");
      return;
    }

    const project = {
      projectName,
      location,
      category,
      description,
      professionalname,
      professionalId,
      images: media,
    };

    const response = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${professional.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      setProjectName("");
      setDescription("");
      setImages([]);
      console.log("new project added:", json);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="gap-3 flex mb-6  items-center p-4  border border-gray-200 rounded-xl hover:bg-slate-100">
        <FiPlus />
        Add a new project
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle className="text-center font-semibold">
            Add a new project
          </DialogTitle>
          <DialogDescription className="text-center">
            Add a new project to your portfolio
          </DialogDescription>
        </DialogHeader>
        <div className="mx-auto my-2">
          <form className="create" onSubmit={handleSubmit}>
            <div className="my-4">
              <label className="text-[14px] pl-1">Project name</label>
              <Input
                type="text"
                className="w-[400px] mt-2"
                placeholder="Mr. Perera’s garden project"
                name="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label className="text-[14px] pl-1">Service</label>
              <br />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[400px] justify-between mt-2"
                  >
                    {value
                      ? serviceList.find(
                          (serviceList) => serviceList.value === value
                        )?.label
                      : "Select a service..."}
                    <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Search service..." />
                    <CommandEmpty>No services found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {serviceList.map((service) => (
                          <CommandItem
                            key={service.value}
                            value={service.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setCategory(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === service.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {service.label}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="my-4">
              <label className="text-[14px] pl-1">Description</label>
              <Textarea
                placeholder="project description"
                className="mt-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
              />
            </div>
            <div className="my-4 ">
              <label className="text-[14px] pl-1">Location</label>
              <Input
                type="text"
                className="mt-2"
                placeholder="Horana"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <Input
              className="hidden"
              id="professionalName"
              type="text"
              value={professionalname}
              disabled
              onChange={(e) => setProfessionalname(e.target.value)}
            />
            <Input
              className="hidden"
              id="userId"
              type="text"
              value={professionalId}
              disabled
              onChange={(e) => setProfessionalId(e.target.value)}
            />
            <div className="w-full flex-col justify-start items-start gap-2.5 flex my-4">
              <label className="text-[14px] pl-1">Insert images</label>
              <label
                for="dropzone-file"
                className="flex flex-col items-center justify-center py-9 w-full border border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 px-6"
              >
                <div className="mb-3 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <g id="Upload 02">
                      <path
                        id="icon"
                        d="M16.296 25.3935L19.9997 21.6667L23.7034 25.3935M19.9997 35V21.759M10.7404 27.3611H9.855C6.253 27.3611 3.33301 24.4411 3.33301 20.8391C3.33301 17.2371 6.253 14.3171 9.855 14.3171V14.3171C10.344 14.3171 10.736 13.9195 10.7816 13.4326C11.2243 8.70174 15.1824 5 19.9997 5C25.1134 5 29.2589 9.1714 29.2589 14.3171H30.1444C33.7463 14.3171 36.6663 17.2371 36.6663 20.8391C36.6663 24.4411 33.7463 27.3611 30.1444 27.3611H29.2589"
                        stroke="green"
                        stroke-width="1.6"
                        stroke-linecap="round"
                      />
                    </g>
                  </svg>
                </div>
                <span className="text-center text-gray-400 text-xs font-normal leading-4 mb-1">
                  Upload upto 4 images
                </span>
                <h6 className="text-center text-gray-900 text-sm font-medium leading-5">
                  Click here to upload
                </h6>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setImages([...images, ...files]);
                  }}
                  multiple
                />
                <Progress
                  value={progress}
                  className="h-1 w-64 my-3 [&>*]:bg-greenscape"
                />
              </label>
            </div>

            <Button
              type="submit"
              className="bg-greenscape hover:bg-green-500 hover:text-white w-full"
            >
              Add project
            </Button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProject;
