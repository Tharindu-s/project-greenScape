import userIcon from "../../../assets/Profile/userIcon.png";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import Products from "../../../components/home/Products-common";
import Services from "@/components/home/Services-common";
import { ProjectsList } from "@/components/professionals/Projects";

async function getProductInfo(id) {
  if (!id) {
    throw new Error("Product ID is undefined");
  }

  const res = await fetch(
    `http://localhost:4000/api/products/professional/${id}`,
    {
      next: {
        revalidate: 2,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

async function getServiceInfo(id) {
  if (!id) {
    throw new Error("Product ID is undefined");
  }

  const res = await fetch(
    `http://localhost:4000/api/service/professional/${id}`,
    {
      next: {
        revalidate: 2,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  return res.json();
}

async function getUserInfo(id) {
  if (!id) {
    throw new Error("Product ID is undefined");
  }

  const res = await fetch(`http://localhost:4000/api/professional/${id}`, {
    next: {
      revalidate: 2,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

async function getProjectInfo(id) {
  if (!id) {
    throw new Error("Product ID is undefined");
  }

  const res = await fetch(`http://localhost:4000/api/projects/user/${id}`, {
    next: {
      revalidate: 2,
    },
  });

  console.log(res);

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
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
    const services = await getServiceInfo(id);
    const projects = await getProjectInfo(id);
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
          </div>
        </div>
        <div>
          <ProjectsList projects={projects} />
        </div>
        <div>
          <Products products={products} />
        </div>
        <div>
          <Services services={services} />
        </div>
      </div>
    );
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
}
