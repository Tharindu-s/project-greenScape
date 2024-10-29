"use client";
import Services from "@/components/home/Services-common";
import React, { useState, useEffect } from "react";

async function getServices() {
  const res = await fetch("http://localhost:4000/api/service", {
    next: {
      revalidate: 2,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }
  return res.json();
}

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      const fetchedServices = await getServices();
      console.log(fetchedServices);
      setServices(fetchedServices);
      setFilteredServices(fetchedServices);
    }

    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [searchTerm, priceRange, services]);

  const filterServices = () => {
    let updatedServices = services;

    if (searchTerm) {
      updatedServices = updatedServices.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceRange.min !== 0 || priceRange.max !== Infinity) {
      updatedServices = updatedServices.filter(
        (service) =>
          service.price >= priceRange.min && service.price <= priceRange.max
      );
    }

    setFilteredServices(updatedServices);
  };

  return (
    <div className="mt-40">
      <Services services={filteredServices} />
    </div>
  );
}
