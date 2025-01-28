// components/BlogView.tsx
"use client";

import useGemini from "@/hooks/gemini";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const BlogView: React.FC = () => {
  const params = useParams();
  const [blog, setBlog] = useState("");
  const { getGeneratedBlog } = useGemini();

  useEffect(() => {
    const fetchBlog = async () => {
      if (params.id) {
        try {
          const fetchedBlog = await getGeneratedBlog(params.id as string);
          setBlog(fetchedBlog);
        } catch (error) {
          console.error("Error fetching blog:", error);
        }
      }
    };

    fetchBlog();
  }, [params.id, getGeneratedBlog]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Twitter Blog</h1>
      <div className="whitespace-pre-wrap text-white">{blog}</div>
    </div>
  );
};

export default BlogView;
