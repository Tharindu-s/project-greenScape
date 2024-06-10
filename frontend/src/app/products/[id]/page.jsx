import Image from "next/image";
import productImg from "../../../assets/product.png";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import WriteReview from "@/components/Products/WriteReview";
import ReviewsList from "@/components/Products/ReviewsList";

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
      <div className="md:px-10 lg:px-12 xl:px-24 2xl:px-64 mt-14">
        <div className="flex w-full gap-6">
          <div className="w-1/2">
            <Image src={productImg}></Image>
          </div>
          <div className="w-1/2 text-textmain">
            <div className="leading-snug">
              <h1 className="font-poppins font-medium text-[32px]">
                {product.name}
              </h1>
              <p className="font-inter font-light text-[28px]">
                {product.price}LKR
              </p>
            </div>
            <p className="font-inter font-light text-[16px] my-3">
              {product.quantity}Items avaialble
            </p>
            <div className="flex gap-6 my-3">
              <p className="font-inter text-accent font-semibold text-[14px]">
                Seller rating {product.quantity}
              </p>
              <p className="font-inter text-accent font-semibold text-[14px]">
                {product.quantity} Reviews
              </p>
            </div>
            <p className="font-inter text-[16px]">{product.description}</p>
            <div className="flex gap-2 mt-12">
              <FaUserCircle size={24} />
              <p className="font-inter text-[16px]">{product.username}</p>
            </div>
            <div className="flex gap-4">
              {product.condition.sell && (
                <Button className="px-4 py-2 rounded-md font-inter text-accent bg-background hover:bg-[#DADBDA]">
                  Buy
                </Button>
              )}
              {/* Conditional rendering for exchange button */}
              {product.condition.exchange && (
                <Button className="px-4 py-2 text-black rounded-md font-inter bg-background hover:bg-[#DADBDA]">
                  Exchange
                </Button>
              )}
            </div>
          </div>
        </div>
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
