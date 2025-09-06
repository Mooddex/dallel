"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddNewService() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newService = {
      id: Date.now().toString(), // simple id
      title: formData.title,
      subtitle: formData.subtitle,
    };

    console.log("New Service:", newService);

    // TODO: Send newService to the backend or update state

    // Navigate back to services list
    router.push("/services");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
          Add New Service
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Service Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <textarea
          name="subtitle"
          placeholder="Service Subtitle / Description"
          value={formData.subtitle}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
        >
          Add Service
        </button>
      </form>
    </div>
  );
}
