import Image from "next/image";
import productImg from "../../../assets/product.png";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import WriteReview from "@/components/Products/WriteReview";
import ReviewsList from "@/components/Products/ReviewsList";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
import BuyExchangeButtons from "@/components/Products/ExchangeButton";
import { FiUser } from "react-icons/fi";

async function getproductInfo(id) {
  if (!id) {
    throw new Error("Product ID is undefined");
  }

  const res = await fetch(`http://localhost:4000/api/products/${id}`, {
    next: {
      revalidate: 2,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductInfo({ params }) {
  console.log("Received params:", params); // Log the params to debug
  const { id } = params;

  if (!id) {
    return <div>Error: Product ID is missing</div>;
  }

  try {
    const product = await getproductInfo(id);
    return (
      <div className="mt-32 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
        <div className="my-12">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <section className="relative ">
          <div className="w-full px-4 mx-auto sm:px-6 lg:px-0">
            <div className="grid grid-cols-1 gap-16 mx-auto lg:grid-cols-2 max-md:px-2 ">
              <div className="img">
                <div className="h-full img-box max-lg:mx-auto ">
                  <Carousel className="w-full ">
                    <CarouselContent>
                      {product.image.map((img, index) => (
                        <CarouselItem key={index}>
                          <img
                            src={img}
                            alt="Yellow Tropical Printed Shirt image"
                            className="w-full h-[300px] md:h-[600px] object-cover max-lg:mx-auto lg:ml-auto rounded-xl"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                  {/* <img
                    src={product.image[0]}
                    alt="Yellow Tropical Printed Shirt image"
                    className="h-full max-lg:mx-auto lg:ml-auto rounded-xl"
                  /> */}
                </div>
              </div>
              <div className="flex w-full pr-0 my-0 data lg:pr-8 xl:justify-start max-lg:pb-10 xl:my-2 lg:my-5">
                <div className="w-full max-w-xl data">
                  <p className="mb-4 text-lg font-medium leading-8 text-indigo-600"></p>
                  <h2 className="mb-2 text-3xl font-bold leading-10 text-gray-900 capitalize font-manrope">
                    {product.name}
                  </h2>
                  <div className="flex flex-col mb-6 sm:flex-row sm:items-center">
                    <h6 className="pr-5 mr-5 text-2xl font-semibold leading-9 text-gray-900 border-gray-200 font-manrope sm:border-r">
                      ${product.price}
                    </h6>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1"></div>
                      <span className="pl-2 text-sm font-normal leading-7 text-gray-500 ">
                        1624 review
                      </span>
                    </div>
                  </div>
                  <p className="mb-5 text-base font-normal text-gray-500">
                    Introducing our vibrant Basic Yellow Tropical Printed Shirt
                    - a celebration of style and sunshine! Embrace the essence
                    of summer wherever you go with this eye-catching piece that
                    effortlessly blends comfort and tropical flair.{" "}
                    <a href="#" className="text-indigo-600">
                      More....
                    </a>
                  </p>
                  <div className="flex items-center gap-2 mt-12 text-accent">
                    <FiUser size={20} />
                    <p className="font-inter text-[16px] font-medium">
                      <Link href={`/profile/${product.userId}`}>
                        {product.username}
                      </Link>
                    </p>
                  </div>
                  <div className="flex gap-4 my-8">
                    {product.condition.sell && (
                      <Button className="px-4 py-2 rounded-md font-inter text-accent bg-background hover:bg-[#DADBDA]">
                        Buy
                      </Button>
                    )}
                    {/* Conditional rendering for exchange button */}
                    {product.condition.exchange && (
                      <div>
                        <BuyExchangeButtons
                          productId={product._id}
                          productName={product.name}
                          recieverName={product.username}
                          recieverId={product.userId}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* show reviews */}
        <div>
          <ReviewsList productId={id} />
        </div>
        {/* add a review */}
        <div>
          <WriteReview productId={id} />
        </div>
      </div>
    );
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
}
