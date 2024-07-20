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
import BuyExchangeButtons from "@/components/Products/Buy-ExchangeButton";

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
                  <img
                    src={product.image}
                    alt="Yellow Tropical Printed Shirt image"
                    className="h-full max-lg:mx-auto lg:ml-auto rounded-xl"
                  />
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
                      <div className="flex items-center gap-1">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_12029_1640)">
                            <path
                              d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                              fill="#FBBF24"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_12029_1640">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
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
                  <div className="flex gap-2 mt-12">
                    <FaUserCircle size={24} />
                    <p className="font-inter text-[16px]">
                      <Link href={`/profile/${product.userId}`}>
                        {product.username}
                      </Link>
                    </p>
                  </div>
                  <div className="flex gap-4">
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
