"use client";
import React from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useState } from "react";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
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

const Form = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to add a product");
      return;
    }

    const product = { name, category, description, price, quantity };

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

    // Inside handleSubmit after successful submission
    if (response.ok) {
      setError(null);
      document.getElementById("name").value = "";
      document.getElementById("description").value = "";
      document.getElementById("price").value = "";
      document.getElementById("quantity").value = "";
      document.getElementById("picture").value = "";
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
            id="name"
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
          <label>Category</label>
          <br />
          <Select onChange={(e) => setCategory(e.target.value)}></Select>
        </div>
        <div className="my-4">
          <label>Description</label>
          <Textarea
            placeholder="Product description"
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            id="description"
          />
        </div>
        <div className="my-4">
          <label>Price</label>
          <Input
            type="text"
            placeholder="6000"
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            id="price"
          />
        </div>
        <div className="my-4">
          <label>Quantity available</label>
          <Input
            type="text"
            placeholder="20"
            onChange={(e) => setQuantity(e.target.value)}
            name="quantity"
            id="quantity"
          />
        </div>
        <div className="my-4">
          <label>Insert images</label>
          <Input id="picture" type="file"  onChange={(e) => setImage(e.target.value)}/>
        </div>

        <button>Add product</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Form;
