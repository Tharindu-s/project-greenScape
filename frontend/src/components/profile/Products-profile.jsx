"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { categoryList } from "../Constants/Category-data";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

const handleDelete = async (productId) => {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      // Handle success, maybe update state or UI
      console.log("Product deleted successfully");
      toast.success("Product deleted successfully");
    } else {
      // Handle error
      console.error("Failed to delete product");
      toast.error("Failed to delete product");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    toast.error("Error deleting product");
  }
};

const ProductsProfile = ({ products }) => {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setValue(product.category);
    setCategory(product.category);
  };

  const handleSaveChanges = async () => {
    if (!currentProduct) return;

    const updatedProduct = {
      ...currentProduct,
      category: value,
    };

    try {
      const response = await fetch(`/api/products/${currentProduct._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        // Handle success, maybe update state or UI
        console.log("Product updated successfully");
        toast.success("Product updated successfully");
      } else {
        // Handle error
        console.error("Failed to update product");
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product");
    }
  };

  return (
    <div>
      {products && products.length > 0 ? (
        <div className="w-full ">
          {/* Card container */}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price(LKR)</TableHead>
                <TableHead className="text-right">Edit</TableHead>
              </TableRow>
            </TableHeader>
            {products.map((product) => (
              <TableBody key={product._id}>
                <TableRow>
                  <TableCell>
                    <Link key={product._id} href={`/products/${product._id}`}>
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell className="text-right">
                    {/* #############################  delete product  ############################# */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <span>
                          <Button className="my-1 mr-3 bg-red-400 hover:bg-red-500">
                            <MdDeleteForever size={20} />
                          </Button>
                        </span>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This product will get
                            permanently deleted if you click continue.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-400 hover:bg-red-500"
                            onClick={() => handleDelete(product._id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    {/* #############################  edit product  ############################# */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <span>
                          <Button
                            className="my-1 bg-accent hover:bg-accentdark"
                            onClick={() => handleEdit(product)}
                          >
                            <MdModeEdit size={20} />
                          </Button>
                        </span>
                      </DialogTrigger>
                      <DialogContent className="max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Edit product</DialogTitle>
                          <DialogDescription>
                            Make changes to this product here. Click save when
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
                              value={currentProduct?.name || ""}
                              onChange={(e) =>
                                setCurrentProduct((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="category" className="text-right">
                              Category
                            </Label>
                            {/* #############################  get category data  ############################# */}
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
                                        (categoryList) =>
                                          categoryList.value === value
                                      )?.label
                                    : "Select a category..."}
                                  <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search category..." />
                                  <CommandEmpty>
                                    No categories found.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    <CommandList>
                                      {categoryList.map((category) => (
                                        <CommandItem
                                          key={category.value}
                                          value={category.value}
                                          onSelect={(currentValue) => {
                                            setValue(
                                              currentValue === value
                                                ? ""
                                                : currentValue
                                            );
                                            setCategory(
                                              currentValue === value
                                                ? ""
                                                : currentValue
                                            );
                                            setCurrentProduct((prev) => ({
                                              ...prev,
                                              category:
                                                currentValue === value
                                                  ? ""
                                                  : currentValue,
                                            }));
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
                          <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="description" className="text-right">
                              Description
                            </Label>
                            <Textarea
                              id="description"
                              className="col-span-3 min-h-[300px]"
                              value={currentProduct?.description || ""}
                              onChange={(e) =>
                                setCurrentProduct((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="price" className="text-right">
                              Price
                            </Label>
                            <Input
                              id="price"
                              className="col-span-3"
                              value={currentProduct?.price || ""}
                              onChange={(e) =>
                                setCurrentProduct((prev) => ({
                                  ...prev,
                                  price: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="quantity" className="text-right">
                              Quantity
                            </Label>
                            <Input
                              id="quantity"
                              className="col-span-3"
                              value={currentProduct?.quantity || ""}
                              onChange={(e) =>
                                setCurrentProduct((prev) => ({
                                  ...prev,
                                  quantity: e.target.value,
                                }))
                              }
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
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
      ) : (
        // <ProductsSkeleton />
        <p className="px-4 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
          You haven't added any products yet.{" "}
          <Link
            href="/add"
            className="underline text-accent hover:text-accentdark"
          >
            Click here
          </Link>{" "}
          to add a new product
        </p>
      )}
    </div>
  );
};

export default ProductsProfile;
