import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const page = () => {
  return (
    <div className="mt-32">
      <section className="py-24 ">
        <div className="w-full px-4 mx-auto max-w-7xl md:px-5 lg-6">
          <div className="grid grid-cols-1 gap-8">
            <div className="grid max-w-sm grid-cols-12 mx-auto sm:max-w-full">
              <div className="col-span-12 lg:col-span-10 ">
                <div className="gap-6 sm:flex">
                  <img
                    src="https://pagedone.io/asset/uploads/1704364560.png"
                    alt="Robert image"
                    className="w-32 h-32 rounded-full"
                  />
                  <div className="text">
                    <p className="mt-6 mb-2 text-lg font-medium leading-8 text-gray-900 sm:mt-0">
                      Robert Karmazov
                    </p>

                    <p className="text-base font-medium leading-8 text-gray-900 ">
                      Very satisfied
                    </p>

                    <p className="mb-4 text-base font-normal leading-7 text-gray-400 lg:pr-8 ">
                      description
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger>View more</DialogTrigger>
                          <DialogContent className="w-[300px] md:w-[500px] rounded-xl">
                            <DialogHeader>
                              <DialogDescription className="pt-4">
                                <p className="mb-4 text-base font-normal leading-7 text-gray-900">
                                  description
                                </p>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <p className="text-sm font-medium leading-7 text-gray-400 lg:hidden lg:text-center whitespace-nowrap">
                        Nov 01, 2023
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row col-span-12 pt-12 lg:col-span-2 max-lg:hidden lg:flex-col max-lg:pt-6 ">
                <p className="text-lg font-medium leading-8 text-gray-400 lg:text-center whitespace-nowrap">
                  Nov 01, 2023
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
