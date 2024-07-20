import React from "react";

const page = () => {
  return (
    <div className="mt-32">
      {" "}
      <section className="relative ">
        <div className="w-full px-4 mx-auto sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 gap-16 mx-auto lg:grid-cols-2 max-md:px-2 ">
            <div className="img">
              <div className="h-full img-box max-lg:mx-auto ">
                <img
                  src="https://pagedone.io/asset/uploads/1700471600.png"
                  alt="Yellow Tropical Printed Shirt image"
                  className="h-full max-lg:mx-auto lg:ml-auto"
                />
              </div>
            </div>
            <div className="flex w-full pr-0 my-0 data lg:pr-8 xl:justify-start max-lg:pb-10 xl:my-2 lg:my-5">
              <div className="w-full max-w-xl data">
                <p className="mb-4 text-lg font-medium leading-8 text-indigo-600">
                  Clothing&nbsp; /&nbsp; Menswear
                </p>
                <h2 className="mb-2 text-3xl font-bold leading-10 text-gray-900 capitalize font-manrope">
                  Basic Yellow Tropical Printed Shirt
                </h2>
                <div className="flex flex-col mb-6 sm:flex-row sm:items-center">
                  <h6 className="pr-5 mr-5 text-2xl font-semibold leading-9 text-gray-900 border-gray-200 font-manrope sm:border-r">
                    $220
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
                  Introducing our vibrant Basic Yellow Tropical Printed Shirt -
                  a celebration of style and sunshine! Embrace the essence of
                  summer wherever you go with this eye-catching piece that
                  effortlessly blends comfort and tropical flair.{" "}
                  <a href="#" className="text-indigo-600">
                    More....
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
