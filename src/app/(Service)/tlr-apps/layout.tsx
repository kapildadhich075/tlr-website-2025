import React from "react";
import Link from "next/link";

export default function TlrAppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-2xl font-bold hover:scale-105 transition-transform flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm"
              >
                <span className="text-yellow-300">🏠</span>
                <span className="bg-gradient-to-r from-yellow-200 to-pink-200 text-transparent bg-clip-text">
                  Home
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
          {children}
        </div>
      </main>
    </div>
  );
}
