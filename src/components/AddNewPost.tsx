"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddNewPost() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    authorty: "",
    servicetype: "",
    requireddocs: "",
    fees: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      id: Date.now().toString(), // simple id
      name: formData.name,
      date: formData.date,
      content: {
        location: formData.location,
        authorty: formData.authorty,
        servicetype: formData.servicetype,
        requireddocs: formData.requireddocs,
        fees: formData.fees,
        notes: formData.notes,
      },
      likes: 0,
      dislikes: 0,
    };

    console.log("New Post:", newPost);

    // TODO: send newPost to your backend or update state

    // Navigate back to posts list
    router.push("/posts");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
          Add New Post
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Author Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="text"
          name="authorty"
          placeholder="Authority"
          value={formData.authorty}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="text"
          name="servicetype"
          placeholder="Service Type"
          value={formData.servicetype}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="text"
          name="requireddocs"
          placeholder="Required Documents"
          value={formData.requireddocs}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="text"
          name="fees"
          placeholder="Fees"
          value={formData.fees}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
        >
          Add Post
        </button>
      </form>
    </div>
  );
}
