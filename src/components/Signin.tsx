import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function Signin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-gray-100 rounded-lg p-8 shadow-md">
        <h2 className="text-gray-900 text-2xl font-semibold mb-6 text-center">
          Sign In
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-2 px-3 leading-6 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-2 px-3 leading-6 transition-colors duration-200 ease-in-out"
          />
        </div>

        <button className="w-full text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg cursor-pointer mb-4">
          Sign In
        </button>
         {/* Google Sign Up */}
              <button className="flex items-center justify-center gap-2 text-gray-700 bg-white border border-gray-300 py-2 px-8 mt-3 rounded text-lg cursor-pointer hover:bg-gray-100">
                <FcGoogle size={24} />
                Sign in with Google
              </button>

        <p className="text-center text-gray-500 text-sm">
          New here?{" "}
          <Link href="/signup" className="text-green-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
