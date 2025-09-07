"use client";

import { useState } from "react";
import ServiceCard from "./ServiceCard";
import { Service } from "@/types/Services";
import Link from "next/link";

export default function ServicesSection() {
  // Fake services list (could later come from props, DB, or API)
  const govServices: Service[] = [
    { id: "1", title: "ID Renewal", subtitle: "Renew your National ID card" },
    { id: "2", title: "Passport Services", subtitle: "Apply or renew your passport" },
    { id: "3", title: "Driving License", subtitle: "Renew or replace driving license" },
    { id: "4", title: "Car Licensing", subtitle: "Renew car license & pay fees" },
    { id: "5", title: "Marriage Certificate", subtitle: "Request official documents" },
    { id: "6", title: "Electricity Bills", subtitle: "Check & pay your bills online" },
  ];

  // State for search query
  const [query, setQuery] = useState("");

  // Filtered list
  const filteredServices = govServices.filter((service) =>
    service.title.toLowerCase().includes(query.toLowerCase()) ||
    service.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        {/* Header */}
        <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            You Can Find Any Services You Want
          </h1>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            With The Community We Stand
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 flex justify-center">
          <input
            type="text"
            placeholder="Search for a service..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          ) : (
            <p className="col-span-full text-gray-500">No services found.</p>
          )}
        </div>

        {/* CTA Button */}
        <Link href="/services/new">
        <button className="flex mx-auto mt-16 text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
          Add More
        </button>
        </Link>
        <span className="flex mx-auto mt-16 text-white bg-green-500 border-0 py-2 px-8 focus:outline-none  rounded text-lg"></span>
        <Link href="/chatbot">
        <button className="flex mx-auto mt-16 text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
          Ask ChatGPT
        </button>
        </Link>
        
      </div>
    </section>
  );
}
