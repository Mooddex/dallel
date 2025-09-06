"use client";

import { useState } from "react";
import { Dialog, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import logo from "@/img/loogo.png";
import Image from "next/image";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md border-b border-gray-300">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <div className="w-10 h-10 text-white p-2 bg-green-500 rounded-full flex items-center justify-center">
              D
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* Desktop Links */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link href="/services" className="text-sm font-semibold text-black">
            Features
          </Link>
          <Link href="/profile" className="text-sm font-semibold text-black">
            Profile
          </Link>
          <Link href="/posts" className="text-sm font-semibold text-black">
            Posts
          </Link>
        </PopoverGroup>

        {/* Logout Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="#" className="text-sm font-semibold text-black">
            logout <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu (Dialog) */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50 bg-black/30" aria-hidden="true" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image alt="logo" src={logo} className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="space-y-2 py-6">
              <Link
                href="/services"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100"
              >
                Features
              </Link>
              <Link
                href="/profile"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                href="/posts"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100"
              >
                Posts
              </Link>
              <Link
                href="#"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-red-600 hover:bg-gray-100"
              >
                Logout
              </Link>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
