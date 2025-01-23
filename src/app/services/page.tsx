"use client";

import Ballpit from "@/Ballpit/Ballpit";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function Services() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading state
  }

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 mx-auto text-center justify-center items-center flex">
          <h1 className="text-white text-4xl md:text-8xl font-bold bg-clip-text text-transparent font-[anzo6]">
            Conquer Content Challenges <br />
            with Exceptional Solutions
          </h1>
        </div>
        <Ballpit
          count={100}
          gravity={0.7}
          friction={0.8}
          wallBounce={0.95}
          followCursor={true}
        />

        <div className="absolute inset-0 -z-10">
          <video
            src="https://ik.imagekit.io/tlredits/moon.mp4?updatedAt=1737115754621"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover "
          />
        </div>
      </section>

      <div className="min-h-screen text-black bg-gradient-to-tl font-[anzo3] from-slate-950 via-pink-900 to-slate-950">
        <div className="w-full max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-[anzo3] text-white">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Content Creation Card */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="h-16 w-16 mb-6 bg-blue-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Content Creation</h3>
              <p className="text-gray-600">
                Engaging content that captures your audience&apos;s attention
                and drives results.
              </p>
            </div>

            {/* Social Media Management Card */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="h-16 w-16 mb-6 bg-purple-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Social Media</h3>
              <p className="text-gray-600">
                Strategic social media management to build your brand and engage
                your community.
              </p>
            </div>

            {/* Video Production Card */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="h-16 w-16 mb-6 bg-red-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Video Production</h3>
              <p className="text-gray-600">
                High-quality video content that tells your story and connects
                with viewers.
              </p>
            </div>

            {/* Digital Marketing Card */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="h-16 w-16 mb-6 bg-green-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Digital Marketing</h3>
              <p className="text-gray-600">
                Data-driven strategies to increase your online presence and
                drive growth.
              </p>
            </div>

            {/* Brand Strategy Card */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="h-16 w-16 mb-6 bg-yellow-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Brand Strategy</h3>
              <p className="text-gray-600">
                Comprehensive brand development to establish your unique market
                position.
              </p>
            </div>

            {/* Web Development Card */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="h-16 w-16 mb-6 bg-indigo-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Web Development</h3>
              <p className="text-gray-600">
                Custom web solutions that combine aesthetics with powerful
                functionality.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
