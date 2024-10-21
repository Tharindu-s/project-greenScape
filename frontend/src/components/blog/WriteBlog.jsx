"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, React } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/lib/firebase";
import { Progress } from "../ui/progress";
import { toast } from "react-hot-toast";
import { BlogCategories } from "../Constants/Blog-data";

const storage = getStorage(app);

const WriteBlog = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [images, setImages] = useState();
  const [media, setMedia] = useState();
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const upload = async () => {
      if (!images) {
        console.error("No image selected");
        return;
      }

      const image = images;

      if (!image.name) {
        console.error("Invalid image file");
        return;
      }

      const imageName = new Date().getTime() + image.name;
      const storageRef = ref(storage, imageName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      try {
        const downloadURL = await new Promise((resolve, reject) => {
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
                .then((downloadURL) => resolve(downloadURL))
                .catch((error) => reject(error));
            }
          );
        });

        setMedia(downloadURL); // store the URL directly
        console.log(downloadURL);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    if (images) {
      upload();
    }
  }, [images]);

  useEffect(() => {
    if (user) {
      setUsername(user.userName); // Pre-fill username from context
      setUserId(user.userId);
      console.log("user info", user.userName, user.userId);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!title || !content || !category) {
      setError("Please fill in all the required fields.");
      toast.error("Please fill in all the required fields.");
      return;
    }

    if (!user) {
      setError("You must be logged in to add a blog.");
      toast.error("You must be logged in to add a blog.");
      return;
    }

    const blog = {
      title,
      content,
      category,
      username,
      userId,
      coverImg: media, // Use the uploaded image/media
    };

    try {
      // Make the API request
      const response = await fetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify(blog),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Token from auth context
        },
      });

      const json = await response.json();

      if (!response.ok) {
        // Handle server-side errors
        const errorMsg =
          json.error || "An error occurred while adding the blog.";
        setError(errorMsg);
        console.error("Server error:", json.error || json); // Log for debugging
        toast.error(`Error: ${errorMsg}`);
      } else {
        // Success case
        setError(null); // Clear any previous errors
        setTitle("");
        setContent("");
        setCategory("");
        setImages(null);
        setProgress(0); // Reset progress bar
        console.log("New blog added:", json);
        toast.success("Blog added successfully!");
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error("Network error:", error); // Log for debugging
      setError("Network error. Please try again later.");
      toast.error(`Network error: ${error.message}`);
    }
  };

  return (
    <div className="mt-48 w-[400px]">
      <form onSubmit={handleSubmit}>
        <h1 className="pt-5 pb-2">Title</h1>
        <Input
          type="text"
          placeholder="Blog title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h1 className="pt-5 pb-2">Category</h1>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[400px] justify-between"
            >
              {value
                ? BlogCategories.find(
                    (BlogCategories) => BlogCategories.value === value
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
                  {BlogCategories.map((category) => (
                    <CommandItem
                      key={category.value}
                      value={category.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setCategory(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === category.value ? "opacity-100" : "opacity-0"
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
        <h1 className="pt-5 pb-2">Content</h1>
        <Textarea
          type="text"
          placeholder="Write your content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <h1 className="pt-5 pb-2">Cover image</h1>
        <div className="w-full flex-col justify-start items-start gap-2.5 flex my-4">
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
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            </div>
            <span className="mb-1 text-xs font-normal leading-4 text-center text-gray-400">
              Upload upto 1 image
            </span>
            <h6 className="text-sm font-medium leading-5 text-center text-gray-900">
              Click here to upload
            </h6>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                setImages(file);
              }}
            />

            <Progress
              value={progress}
              className="h-1 w-64 my-3 [&>*]:bg-greenscape"
            />
          </label>
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
        <Button
          className="py-6 px-7 rounded-3xl bg-accent hover:bg-accentdark"
          type="submit"
          disabled={!images || (progress > 0 && progress < 100)}
        >
          Add Blog
        </Button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default WriteBlog;
