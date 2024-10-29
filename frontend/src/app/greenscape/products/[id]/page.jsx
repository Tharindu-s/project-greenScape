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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BuyExchangeButtons from "@/components/Products/ExchangeButton";
import { FiUser } from "react-icons/fi";
import { BASE_URL } from "@/components/Constants/server";
import InitializeConvo from "@/components/messenger/InitializeConvo";
import AddtoCartButton from "@/components/Products/AddtoCartButton";
import ReportProduct from "@/components/Products/Report";

async function getproductInfo(id) {
  if (!id) {
    throw new Error("Product ID is undefined");
  }

  const res = await fetch(`${BASE_URL}/api/products/${id}`, {
    next: {
      revalidate: 2,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

async function getReviewCount(id) {
  if (!id) {
    throw new Error("Product ID is undefined");
  }

  const res = await fetch(`${BASE_URL}/api/reviews/count/${id}`, {
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
    const reviewsCount = await getReviewCount(id);
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
                      {product.price} LKR
                    </h6>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1"></div>
                      <span className="pl-2 text-sm font-normal leading-7 text-gray-500 ">
                        {reviewsCount.reviewCount}{" "}
                        {reviewsCount.reviewCount > 1 ? "Reviews" : "Review"}
                      </span>
                    </div>
                  </div>
                  <p className="mb-5 text-base font-normal text-gray-500">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-2 mt-12 text-accent">
                    <FiUser size={20} />
                    <p className="font-inter text-[16px] font-medium">
                      <Link href={`/greenscape/profile/${product.userId}`}>
                        {product.username}
                      </Link>
                    </p>
                  </div>
                  <div className="flex gap-4 my-8">
                    {product.condition.sell && (
                      <div className="flex gap-2">
                        {" "}
                        <Button className="px-4 py-2 rounded-md font-inter text-accent bg-background hover:bg-[#DADBDA]">
                          Buy
                        </Button>
                        <AddtoCartButton
                          productId={product._id}
                          productName={product.name}
                          available={product.quantity}
                          price={product.price}
                          imgurl={product.image[0]}
                        />
                      </div>
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

                    {/* send a message */}
                    <InitializeConvo product={product} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ReportProduct productId={id} />
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
