import { Button } from "@/components/ui/button";
import React from "react";
import MyCourses from "../../../components/Courses/MyCourses";
import StudyPacks from "../../../components/Courses/StudyPacks";
import InquiryList from "@/components/inquiries/inquiyList";

const inquiryList = [
  {
    _id: "1",
    title: "Appointment for a consultation",
    description:
      "I need to do some adjustments to my garden, I would like to make an appointment for a consultation.",
    phone: "+94 77 123 4567",
  },
  {
    _id: "2",
    title: "Need to get a quotation for a new project",
    description:
      "I need to get a quotation for a new project, Can you contact me through whatsapp?.",
    phone: "+94 77 123 4567",
  },
];

const page = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inquiries</h1>
      </div>
      <div
        className="flex flex-1 items-start  rounded-lg border border-dashed shadow-sm p-6"
        x-chunk="dashboard-02-chunk-1"
      >
        <InquiryList inquiryList={inquiryList} />
      </div>
    </main>
  );
};

export default page;
