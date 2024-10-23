import userIcon from "../../../assets/Profile/userIcon.png";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import Products from "../../../components/home/Products-common";
import Blogs from "@/components/home/Blogs-common";
import StarRating from "@/components/Common/StarRating";
import RateSeller from "@/components/Common/RateSeller";

async function getProductInfo(id) {
  if (!id) {
    throw new Error("Product ID is undefined");
  }

  const res = await fetch(`http://localhost:4000/api/products/user/${id}`, {
    next: {
      revalidate: 2,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

async function getBlogInfo(id) {
  if (!id) {
    throw new Error("Blog ID is undefined");
  }

  const res = await fetch(`http://localhost:4000/api/blogs/user/${id}`, {
    next: {
      revalidate: 2,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

async function getUserInfo(id) {
  if (!id) {
    throw new Error("Product ID is undefined");
  }

  const res = await fetch(`http://localhost:4000/api/user/${id}`, {
    next: {
      revalidate: 2,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

async function getRating(id) {
  if (!id) {
    throw new Error("User ID is undefined");
  }

  const res = await fetch(
    `http://localhost:4000/api/sellerrating/overall/${id}`,
    {
      next: {
        revalidate: 2,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch rating");
  }

  return res.json();
}

export default async function UserInfo({ params }) {
  console.log("Received params:", params); // Log the params to debug
  const { id } = params;

  if (!id) {
    return <div>Error: User ID is missing</div>;
  }

  try {
    const user = await getUserInfo(id);
    const products = await getProductInfo(id);
    const blogs = await getBlogInfo(id);
    const rating = await getRating(id);

    return (
      <div>
        {/* hero */}
        <div className="px-4 md:px-10 lg:px-12 xl:px-24 2xl:px-64 ">
          <div className="relative w-full mt-16 mb-10 h-80 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="absolute -bottom-20 left-4">
              <Image
                src={userIcon}
                height={200}
                width={200}
                alt="Profile image"
              ></Image>
            </div>
          </div>
          <div className="mt-24 ml-12">
            <div className="flex items-center gap-4">
              <h1 className="font-poppins font-semibold text-[36px]">
                {user.name}
              </h1>
            </div>
            <div className="flex items-center gap-1 font-poppins text-[16px] text-accent">
              <FaLocationDot size={16} />
              <p>{user.city}</p>
            </div>
          </div>
          {/* bio */}
          <div className="w-full rounded-[30px] overflow-hidden border border-solid border-[#e6e6e6] p-9 mt-20">
            <h1 className="font-poppins text-[24px] font-semibold text-textmain mb-6">
              Bio
            </h1>
            <p>{user.bio}</p>
            <h1 className="font-poppins text-[24px] font-semibold text-textmain mb-6 mt-8 ">
              Seller rating
            </h1>

            <StarRating rating={rating.averageRating} />
          </div>
          <div className="w-full rounded-[30px] overflow-hidden border border-solid border-[#e6e6e6] p-9 mt-20">
            <RateSeller sellerId={id} />
          </div>
        </div>

        <div>
          <Products products={products} />
        </div>
        <div>
          <Blogs blogs={blogs} />
        </div>
      </div>
    );
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
}
