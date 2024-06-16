"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
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
import { categoryList } from "../Constants/Category-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [image, setImage] = useState(null);
  const [media, setMedia] = useState("");
  const [condition, setCondition] = useState({ sell: false, exchange: false });
  const [error, setError] = useState(null);

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
    if (user) {
      setUsername(user.userName); // Pre-fill username from context
      setUserId(user.userId);
    }
  }, [user]);

  const handleCheckboxChange = (e, type) => {
    setCondition((prevCondition) => ({
      ...prevCondition,
      [type]: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to add a product");
      return;
    }

    const product = {
      name,
      category,
      description,
      price,
      quantity,
      username,
      userId,
      condition,
      image: media,
    };

    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setError(null);
      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setImage(null);
      setCondition({ sell: false, exchange: false });
      console.log("new product added:", json);
    }
  };

  return (
    <div className="w-1/2 mx-auto my-8">
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a Product</h3>
        <div className="my-4">
          <label>Product name</label>
          <Input
            type="text"
            placeholder="Barrel Cactus"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
                  ? categoryList.find(
                      (categoryList) => categoryList.value === value
                    )?.label
                  : "Select a category..."}
                <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search category..." />
                <CommandEmpty>No categories found.</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {categoryList.map((category) => (
                      <CommandItem
                        key={category.value}
                        value={category.value}
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
          <label>Description</label>
          <Textarea
            placeholder="Product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
          />
        </div>
        <div className="my-4">
          <label>Price</label>
          <Input
            type="text"
            placeholder="6000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="price"
          />
        </div>
        <div className="my-4">
          <label>Quantity available</label>
          <Input
            type="text"
            placeholder="20"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            name="quantity"
          />
        </div>
        <div className="my-4">
          <label>Available for</label>
          <div>
            <label>
              <input
                type="checkbox"
                checked={condition.sell}
                onChange={(e) => handleCheckboxChange(e, "sell")}
              />
              Sell
            </label>
            <label>
              <input
                type="checkbox"
                checked={condition.exchange}
                onChange={(e) => handleCheckboxChange(e, "exchange")}
              />
              Exchange
            </label>
          </div>
        </div>
        <div className="my-4">
          <label>Insert images</label>
          <input
            id="picture"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
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
        <button type="submit">Add product</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Form;
