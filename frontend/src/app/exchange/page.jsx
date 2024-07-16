import RequestList from "@/components/Exchange/RequestList";
import React from "react";

const page = () => {
  return (
    <div className="mt-24">
      <h1 className="font-poppins text-[24px] font-semibold text-textmain mt-16 mb-10 px-4 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
        Ongoing Exchanges
      </h1>
      <RequestList />
    </div>
  );
};

export default page;
