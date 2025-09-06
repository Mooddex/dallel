
import Link from "next/link";
import PostCard from "./PostCard";

interface Post {
  id: string;
  name: string;
  date: string;
  content: {
    location: string;
    authorty: string;
    servicetype: string;
    requireddocs: string;
    fees: string;
    notes: string;
  };
  likes: number;
  dislikes: number;
};

export default function Profile() {
  const posts: Post[] = [
    {
      id: "1",
      name: "Mahmoud Salama",
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
      name: "Mahmoud Salama",
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
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-white">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-8">
        <img
          src="/me.png"
          alt="Profile picture"
          className="w-28 h-28 rounded-full shadow-md"
        />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Mahmoud Salama
        </h2>
        <p className="text-gray-500">@mahmoud.dev</p>
        <p className="mt-2 text-gray-600 max-w-md">
          Lawyer turned web developer. Building cool stuff with Next.js 🚀
        </p>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-300" />

      {/* Posts Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Services & Posts
          </h3>
          
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <Link href="/posts/new">
            + New Post
           </Link>
          </button>
         
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
}
