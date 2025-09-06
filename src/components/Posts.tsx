"use client";

import { useState } from "react";
import { Posts } from "@/types/posts";
import PostCard from "./PostCard";
import Link from "next/link";
export default function PostsComponent() {
  const posts: Posts[] = [
    {
      id: "1",
      name: "Ahmed Ali",
      date: "2025-09-01",
      content: {
        location: "Cairo",
        authorty: "Civil Registry",
        servicetype: "ID Renewal",
        requireddocs: "Old ID card, Birth Certificate",
        fees: "150 EGP",
        notes: "Processing time is around 7 days",
      },
      likes: 12,
      dislikes: 1,
    },
    {
      id: "2",

      name: "Sara Mahmoud",
      date: "2025-09-02",
      content: {
        location: "Giza",
        authorty: "Passport Authority",
        servicetype: "Passport Renewal",
        requireddocs: "Old passport, National ID, 2 photos",
        fees: "500 EGP",
        notes: "Urgent service available at extra cost",
      },
      likes: 25,
      dislikes: 3,
    },
    {
      id: "3",

      name: "Omar Khaled",
      date: "2025-09-03",
      content: {
        location: "Alexandria",
        authorty: "Traffic Department",
        servicetype: "Driving License Renewal",
        requireddocs: "Old license, Medical certificate",
        fees: "300 EGP",
        notes: "Eye test required before submission",
      },
      likes: 18,
      dislikes: 2,
    },
    {
      id: "4",

      name: "Mona Hassan",
      date: "2025-09-04",
      content: {
        location: "Mansoura",
        authorty: "Marriage Registry",
        servicetype: "Marriage Certificate",
        requireddocs: "National IDs, Family Book",
        fees: "200 EGP",
        notes: "Available same day",
      },
      likes: 9,
      dislikes: 0,
    },
    {
      id: "5",

      name: "Youssef Ibrahim",
      date: "2025-09-05",
      content: {
        location: "Tanta",
        authorty: "Electricity Authority",
        servicetype: "Bill Payment",
        requireddocs: "Customer number",
        fees: "Varies",
        notes: "Can be paid online or at kiosks",
      },
      likes: 30,
      dislikes: 4,
    },
  ];

  // State for search query
  const [query, setQuery] = useState("");

  // Filtered list
  const filteredPosts = posts.filter(
    (post) =>
      post.content.authorty.toLowerCase().includes(query.toLowerCase()) ||
      post.content.servicetype.toLowerCase().includes(query.toLowerCase())
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
          <div className="mb-12 flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Search for a service or authority..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-gray-100"
          />
          <Link
            href="/posts/new"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            + New Post
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="col-span-full text-gray-500">No services found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
