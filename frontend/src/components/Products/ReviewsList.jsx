import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

async function getReviewsList(productId) {
  if (!productId) {
    throw new Error("Product ID is undefined");
  }

  try {
    const res = await fetch(`http://localhost:4000/api/reviews/${productId}`, {
      next: {
        revalidate: 2,
      },
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(
        `Failed to fetch reviews for this product: ${errorMessage}`
      );
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
}

export default async function ReviewsList({ productId }) {
  function timeAgo(dateString) {
    const currentDate = new Date();
    const createdAtDate = new Date(dateString);
    const timeDifference = currentDate.getTime() - createdAtDate.getTime();
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysAgo === 0) {
      return "Today";
    } else if (daysAgo === 1) {
      return "Yesterday";
    } else {
      return `${daysAgo} days ago`;
    }
  }

  console.log("Received productId:", productId); // Log the productId to debug

  if (!productId) {
    return <div>Error: Product ID is missing</div>;
  }

  try {
    const reviews = await getReviewsList(productId);
    return (
      <div>
        <h1 className="font-poppins text-[24px] font-semibold text-textmain mt-16 mb-10">
          Reviews
        </h1>
        {reviews.length === 0 ? (
          <div className="text-center text-gray-500">No reviews yet</div>
        ) : (
          reviews.map((review) => (
            <div
              className="w-full max-w-full px-4 py-4 mx-auto md:px-5 lg-6"
              key={review.id}
            >
              <div className="">
                <div className="grid max-w-sm grid-cols-12 mx-auto sm:max-w-full">
                  <div className="col-span-12 lg:col-span-10 ">
                    <div className="gap-6 sm:flex">
                      <img
                        src="https://placehold.it/100x100"
                        alt="Username"
                        className="w-16 h-16 rounded-full"
                      />
                      <div className="text">
                        <p className="mt-6 mb-2 text-lg font-medium leading-8 text-gray-900 sm:mt-0">
                          {review.username}
                        </p>

                        <p className="text-base font-medium leading-8 text-gray-900 ">
                          {review.title}
                        </p>

                        <p className="w-[800px] mb-4 text-base font-normal leading-7 text-gray-400 lg:pr-8 ">
                          {review.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger className="text-accent">
                                See more
                              </DialogTrigger>
                              <DialogContent className="w-[300px] md:w-[500px] rounded-xl">
                                <DialogHeader>
                                  <DialogDescription className="pt-4">
                                    <p className="mb-4 text-base font-normal leading-7 text-gray-900">
                                      {review.content}
                                    </p>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <p className="text-sm leading-7 text-gray-400 lg:hidden lg:text-center whitespace-nowrap">
                            {timeAgo(review.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row col-span-12 pt-12 lg:col-span-2 max-lg:hidden lg:flex-col max-lg:pt-6 ">
                    <p className="text-sm leading-8 text-gray-400 lg:text-center whitespace-nowrap">
                      {timeAgo(review.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  } catch (error) {
    console.error(error);
  }
}
