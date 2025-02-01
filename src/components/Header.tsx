"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { SignInButton } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full h-20 px-4 py-10 z-50  fixed transition-all duration-300 border-b ${
        scrolled
          ? "bg-black/80 backdrop-blur-sm border-gray-800"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="w-full h-full max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="transition-transform hover:scale-105">
            <Image
              src="https://ik.imagekit.io/umdiwr6ma/tlr%20logo.png?updatedAt=1706964634422"
              alt="Company Logo"
              width={70}
              height={70}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center space-x-8 text-gray-200 font-[anzo2]">
          <li>
            <Link
              href="/"
              className="hover:text-white transition-colors duration-200 font-medium "
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-white transition-colors duration-200 font-medium"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="hover:text-white transition-colors duration-200 font-medium"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-white transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
          </li>
          <li>
            <SignedIn>
              <Link
                href={isAdmin ? "/admin" : "/dashboard"}
                className="hover:text-white transition-colors duration-200 font-medium"
              >
                {isAdmin ? "Admin Panel" : "Dashboard"}
              </Link>
            </SignedIn>
          </li>
          <li className="ml-2">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-10 h-10 rounded-full border-2 border-white hover:border-blue-400 transition-colors duration-200",
                  },
                }}
              />
            </SignedIn>
          </li>
        </ul>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="text-white w-6 h-6 hover:text-gray-300 transition-colors" />
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="bg-black/95 backdrop-blur-lg border-t border-gray-800 text-white"
          >
            <SheetTitle className="text-white text-xl font-bold">
              <Image
                src="https://ik.imagekit.io/umdiwr6ma/tlr%20logo.png?updatedAt=1706964634422"
                alt="Company Logo"
                width={70}
                height={70}
                className="object-contain"
              />
            </SheetTitle>
            <div className="mt-8">
              <ul className="flex flex-col space-y-6 text-gray-200">
                <li>
                  <Link
                    href="/"
                    className="text-lg font-medium hover:text-white transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-lg font-medium hover:text-white transition-colors duration-200"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-lg font-medium hover:text-white transition-colors duration-200"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-lg font-medium hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <SignedIn>
                    <Link
                      href={isAdmin ? "/admin" : "/dashboard"}
                      className="text-lg font-medium hover:text-white transition-colors duration-200"
                    >
                      {isAdmin ? "Admin Panel" : "Dashboard"}
                    </Link>
                  </SignedIn>
                </li>
                <li className="pt-4">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="w-full bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors duration-200">
                        Sign In
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox:
                            "w-10 h-10 rounded-full border-2 border-white hover:border-blue-400 transition-colors duration-200",
                        },
                      }}
                    />
                  </SignedIn>
                </li>
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
