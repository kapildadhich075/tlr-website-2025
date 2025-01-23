"use client";

import { ChatUI } from "@/components/ChatUI";
import { useEffect, useState } from "react";
// pages/index.tsx

const Home: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading state
  }

  return (
    <div className="container mx-auto">
      <ChatUI />
    </div>
  );
};

export default Home;
