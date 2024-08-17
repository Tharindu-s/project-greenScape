import React from "react";
import product from "../../assets/product.png";
import Image from "next/image";

const page = () => {
  return (
    <div className="my-20">
      <section className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
        <div className="relative z-10 w-full px-4 mx-auto max-w-7xl md:px-5 lg-6">
          <div className="grid grid-cols-12">
            <div className="w-full col-span-12 pb-8 xl:col-span-8 lg:pr-8 pt-14 lg:py-24 max-xl:max-w-3xl max-xl:mx-auto">
              <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 className="text-lg font-semibold leading-10 text-black font-poppins">
                  Your Cart
                </h2>
                <h2 className="font-semibold leading-8 text-gray-600 text-md font-poppins">
                  3 Items
                </h2>
              </div>
              <div className="grid grid-cols-12 pb-6 mt-8 border-b border-gray-200 max-md:hidden">
                <div className="col-span-12 md:col-span-7">
                  <p className="text-sm font-normal leading-8 text-gray-400">
                    Product Details
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="grid grid-cols-5">
                    <div className="col-span-3">
                      <p className="text-sm font-normal leading-8 text-right text-gray-400">
                        Quantity
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-normal leading-8 text-right text-gray-400">
                        Total
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
                <div className="w-full md:max-w-[126px]">
                  <Image
                    src={product}
                    width={126}
                    height={126}
                    className="mx-auto rounded-xl"
                    alt="cart image"
                  ></Image>
                </div>
                <div className="grid w-full grid-cols-1 md:grid-cols-4">
                  <div className="md:col-span-2">
                    <div className="flex flex-col max-[500px]:items-center gap-3">
                      <h6 className="text-base font-semibold leading-7 text-black">
                        Golden Barrel Cactus
                      </h6>
                      <h6 className="text-base font-normal leading-7 text-gray-500">
                        Cacti
                      </h6>
                      <h6 className="text-base font-medium leading-7 text-gray-600 transition-all duration-300 font-inter group-hover:text-accent">
                        3000 LKR
                      </h6>
                    </div>
                  </div>
                  <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                    <div className="flex items-center h-full">
                      <button className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                        <svg
                          className="transition-all duration-500 stroke-gray-900 group-hover:stroke-black"
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            strokeLinecap="round"
                          />
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            strokeOpacity="0.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            strokeOpacity="0.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                        placeholder="1"
                      />
                      <button className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                        <svg
                          className="transition-all duration-500 stroke-gray-900 group-hover:stroke-black"
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke=""
                            strokeLinecap="round"
                          />
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke=""
                            strokeOpacity="0.2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke=""
                            strokeOpacity="0.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                    <p className="text-lg font-bold leading-8 text-center text-gray-600 transition-all duration-300 group-hover:text-accent">
                      3000 LKR
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-3xl col-span-12 py-24 mx-auto xl:col-span-4 bg-gray-50 max-xl:px-6 xl:max-w-lg rounded-2xl lg:pl-8">
              <h2 className="pb-8 font-semibold leading-10 text-black border-b border-gray-300 text-md font-poppins">
                Order Summary
              </h2>
              <div className="mt-8">
                <div className="flex items-center justify-between pb-6">
                  <p className="text-sm font-normal leading-8 text-black">
                    1 Items
                  </p>
                  <p className="text-sm font-medium leading-8 text-black">
                    3000 LKR
                  </p>
                </div>
                <form>
                  <label className="flex  items-center mb-1.5 text-gray-600 text-sm font-medium">
                    Shipping
                  </label>

                  <div className="flex items-center justify-between py-8">
                    <p className="text-lg font-medium leading-8 text-black">
                      1 Items
                    </p>
                    <p className="text-lg font-semibold leading-8 text-accent">
                      3000 LKR
                    </p>
                  </div>
                  <button className="w-full px-6 py-3 font-semibold text-center text-white transition-all duration-500 font-inter text-md bg-accent rounded-xl hover:bg-accentdark">
                    Checkout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
