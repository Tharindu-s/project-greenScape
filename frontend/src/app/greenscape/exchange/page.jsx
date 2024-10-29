import RecievedRequestsList from "@/components/Exchange/RecievedRequestList ";
import SentRequestList from "@/components/Exchange/SentRequestList ";
import React from "react";

const page = () => {
  return (
    <div className="pt-2 my-24">
      <h1 className="font-poppins text-[24px] font-semibold text-textmain mt-16 mb-10 px-4 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
        Received reqeusts
      </h1>
      <RecievedRequestsList />
      <h1 className="font-poppins text-[24px] font-semibold text-textmain mt-16 mb-10 px-4 md:px-10 lg:px-12 xl:px-24 2xl:px-64">
        Sent requests
      </h1>
      <SentRequestList />
    </div>
  );
};

export default page;
