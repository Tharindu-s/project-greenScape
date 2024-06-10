import React from "react";

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
        <ul>
          {reviews.map((review) => (
            <li key={review._id}>
              <div className="flex w-full gap-4">
                <div className="flex items-center justify-center w-8 h-8 bg-red-400 rounded-full">
                  {review.username.charAt(0)}
                </div>
                <div>
                  <div>
                    <h2 className="font-inter font-medium text-[16px] text-textmain">
                      {review.username}
                    </h2>
                    <p className="font-inter text-[12px] pb-5 text-textmuted">
                      {timeAgo(review.createdAt.slice(0, 10))}
                    </p>
                    <h2 className="font-inter text-[16px] text-textmain">
                      {review.title}
                    </h2>
                    <p className="font-inter text-[16px] text-textmuted">
                      {review.content}
                    </p>
                  </div>
                </div>
              </div>
              <hr className="mt-5 mb-10" />
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
}
