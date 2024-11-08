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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/lib/firebase";
import { FiPlus } from "react-icons/fi";
import { serviceList } from "../../constants/service-types";
const storage = getStorage(app);
import { toast } from "react-hot-toast";

const AddService = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { professional } = useAuthContext();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [images, setImages] = useState([]);
  const [media, setMedia] = useState([]);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  // const isprofessional = true;

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
      setUsername(professional.professionalName); // Pre-fill username from context
      setUserId(professional.professionalId); // Pre-fill userId from context
    }
  }, [professional]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!professional) {
      setError("You must be logged in to add a service");
      return;
    }

    const service = {
      name,
      category,
      description,
      price,
      quantity,
      username,
      userId,
      username,
      image: media,
    };

    const response = await fetch("/api/service", {
      method: "POST",
      body: JSON.stringify(service),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${professional.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      toast.error("Error adding service");
    }

    if (response.ok) {
      setError(null);
      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setImages([]);
      setUsername;
      console.log("new service added:", json);
      toast.success("Product added succesfully");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-3 p-4 mb-6 border border-gray-200 rounded-xl hover:bg-slate-100">
        <FiPlus />
        Add a new service
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle className="font-semibold text-center">
            Add a new service
          </DialogTitle>
          <DialogDescription className="text-center">
            Add a new service
          </DialogDescription>
        </DialogHeader>
        <div className="mx-auto my-2">
          <form className="create" onSubmit={handleSubmit}>
            <div className="my-4">
              <label className="text-[14px] pl-1">Service name</label>
              <Input
                type="text"
                className="w-[400px] mt-2"
                placeholder="Garden decoration"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="my-4">
              <label className="text-[14px] pl-1">category</label>
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
                      : "Select a category..."}
                    <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandEmpty>No categories found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {serviceList.map((category) => (
                          <CommandItem
                            key={category.value}
                            value={category.value}
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
                                value === category.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {category.label}
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
                placeholder="Description"
                className="mt-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
              />
            </div>
            <div className="my-4 ">
              <label className="text-[14px] pl-1">Price</label>
              <Input
                type="text"
                className="mt-2"
                placeholder="6000"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <Input
              className="hidden"
              id="username"
              type="text"
              value={username}
              disabled
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              className="hidden"
              id="userId"
              type="text"
              value={userId}
              disabled
              onChange={(e) => setUserId(e.target.value)}
            />
            <div className="w-full flex-col justify-start items-start gap-2.5 flex my-4">
              <label className="text-[14px] pl-1">Insert images</label>
              <label
                for="dropzone-file"
                className="flex flex-col items-center justify-center w-full px-6 border border-gray-300 border-dashed cursor-pointer py-9 rounded-2xl bg-gray-50"
              >
                <div className="flex items-center justify-center mb-3">
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
                <span className="mb-1 text-xs font-normal leading-4 text-center text-gray-400">
                  Upload upto 4 images
                </span>
                <h6 className="text-sm font-medium leading-5 text-center text-gray-900">
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
              className="w-full bg-greenscape hover:bg-green-500 hover:text-white"
            >
              Add product
            </Button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddService;
