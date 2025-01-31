import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import SplashCursor from "@/components/SplashCursor/SplashCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Lecture Room",
  description: "The Lecture Room, your video editing partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SplashCursor TRANSPARENT={true} />
          <Header />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
