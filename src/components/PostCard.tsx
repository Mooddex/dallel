"use client";

import { Posts } from "@/types/posts";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";

interface PostCardProps {
  post: Posts;
}

export default function PostCard({ post }: PostCardProps) {
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);

  function like() {
    setLikes((prev) => prev + 1);
  }

  function dislike() {
    setDislikes((prev) => prev + 1);
  }

  return (
    <div className="p-4 w-full flex items-center justify-center">
      <div className="px-6 py-5 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition rounded-xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          {/* Name and Date */}
          <div>
            <span
              className="block font-semibold text-lg text-gray-900 dark:text-gray-100"              
            >
              {post.name}
            </span>
            <span
              className="block text-xs text-gray-500 dark:text-gray-400"
            >
              {post.date}
            </span>
          </div>

          {/* Edit Button */}
          <button className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition"
          
          >
            <span>Edit</span>
          </button>
        </div>

        {/* Content */}
        <div className="text-gray-700 dark:text-gray-200 leading-snug space-y-1 border-t border-b py-3">
          {Object.entries(post.content).map(([key, value]) => (
            <p key={key}>
              <span className="font-medium capitalize text-gray-900 dark:text-gray-100">
                {key}:
              </span>{" "}
              {value}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <button
              className="flex items-center space-x-1 px-2 py-1 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition"
              onClick={like}
            >
              <ThumbsUp className="h-5 w-5 text-blue-500" />
              <span className="text-gray-600 dark:text-gray-300">{likes}</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="flex items-center space-x-1 px-2 py-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition"
              onClick={dislike}
            >
              <ThumbsDown className="h-5 w-5 text-red-500" />
              <span className="text-gray-600 dark:text-gray-300">
                {dislikes}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
