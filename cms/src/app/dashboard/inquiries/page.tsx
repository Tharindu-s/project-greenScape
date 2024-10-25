"use client";
import React from "react";
import InquiryList from "@/components/inquiries/inquiyList";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";

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

const Inquiry = () => {
  const { professional } = useAuthContext();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [professionalId, setProfessionalId] = useState("");

  useEffect(() => {
    if (professional) {
      setProfessionalId(professional?.professionalId);
    }
  }, [professional]);

  useEffect(() => {
    fetch(`/api/inquiry/user/${professionalId}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
        setLoading(false);
      });
  }, [professionalId]);

  return (
    <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inquiries</h1>
      </div>
      <div
        className="flex items-start flex-1 p-6 border border-dashed rounded-lg shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <InquiryList inquiryList={data} />
      </div>
    </main>
  );
};

export default Inquiry;
