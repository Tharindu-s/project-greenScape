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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { serviceList } from "../Constants/Category-data";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/lib/firebase";
const storage = getStorage(app);

const Form = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { professional } = useAuthContext();

  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [professionalname, setProfessionalname] = useState("");
  const [professionalId, setProfessionalId] = useState("");
  const [image, setImage] = useState(null);
  const [media, setMedia] = useState("");
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const upload = () => {
      const imageName = new Date().getTime() + image.name;
      const storageRef = ref(storage, imageName);

      const uploadTask = uploadBytesResumable(storageRef, image);

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
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    if (image) {
      upload();
    }
  }, [image]);

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
      image: media,
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
      setImage(null);
      console.log("new project added:", json);
    }
  };

  return (
    <div className="w-1/2 mx-auto my-8">
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new Project</h3>
        <div className="my-4">
          <label>Project name</label>
          <Input
            type="text"
            placeholder="Mr. Perera’s garden project"
            name="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div className="my-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? serviceList.find(
                      (serviceList) => serviceList.value === value
                    )?.label
                  : "Select a service..."}
                <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
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
                          setValue(currentValue === value ? "" : currentValue);
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
          <label>Description</label>
          <Textarea
            placeholder="project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
          />
        </div>
        <div className="my-4">
          <label>Location</label>
          <Input
            type="text"
            placeholder="Horana"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="my-4">
          <label>Insert images</label>
          <Input
            id="picture"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
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
        <Progress value={progress} className="h-2 mb-4 [&>*]:bg-accent" />
        <Button type="submit" className="bg-accent hover:bg-accentdark">
          Add project
        </Button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Form;
