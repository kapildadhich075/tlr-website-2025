// components/ArticleInput.tsx

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import useGemini from "@/hooks/gemini";

interface ArticleInputProps {
  onArticleSubmit: (article: string) => void;
}

const ArticleInput: React.FC<ArticleInputProps> = ({ onArticleSubmit }) => {
  const [articleUrl, setArticleUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { generateTwitterBlog } = useGemini();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const blog = await generateTwitterBlog(articleUrl);
      onArticleSubmit(blog);
      setIsLoading(false);
      router.push("/blog"); // Redirect to blog view
    } catch (err) {
      console.error(err);
      setError("Failed to generate blog. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="articleUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Article URL:
          </label>
          <input
            type="url"
            id="articleUrl"
            value={articleUrl}
            onChange={(e) => setArticleUrl(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ref={inputRef}
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Blog"}
        </button>
      </form>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default ArticleInput;
