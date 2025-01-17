// components/ChatUI.tsx

import React, { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import useGemini from "@/hooks/gemini";
import { Twitter, Bot, Loader2, User } from "lucide-react";

const ChatUI: React.FC = () => {
  const params = useParams();
  const [blog, setBlog] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const { getGeneratedBlog, client } = useGemini();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (params.id) {
        try {
          const fetchedBlog = await getGeneratedBlog(params.id as string);
          setBlog(fetchedBlog);
          setMessages([
            "**You:** Here's the generated Twitter blog:",
            fetchedBlog,
          ]);
        } catch (error) {
          console.error("Error fetching blog:", error);
        }
      }
    };

    fetchBlog();
  }, [params.id, getGeneratedBlog]);

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!userInput.trim()) {
      return;
    }

    const userMessage = `**You:** ${userInput}`;
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    try {
      const response = await generateResponse(userInput, blog);
      setMessages((prev) => [...prev, `**Assistant:** ${response}`]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        "**Assistant:** I apologize, but I encountered an error. Please try again.",
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // Helper function to generate a response using Gemini
  const generateResponse = async (userInput: string, blog: string) => {
    if (!client) {
      throw new Error("Gemini client not initialized");
    }

    const prompt = `**Based on the following Twitter blog and the user's input, generate a concise and relevant response:**

    **Blog:**
    ${blog}

    **User input:**
    ${userInput}

    **Guidelines:**
    * **Maintain a conversational tone.**
    * **Consider the context of the blog.**
    * **Provide helpful and informative responses.**

    **Output format:**
    * Return the response as a single string.`;

    try {
      const model = client.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Error generating response:", error);
      throw error;
    }
  };

  const formatMessage = (message: string) => {
    if (message.startsWith("**You:**")) {
      return (
        <div className="flex items-start gap-2">
          <div className="rounded-full bg-indigo-600 p-2">
            <User className="w-4 h-4 text-white" />
          </div>
          <p>{message.replace("**You:**", "").trim()}</p>
        </div>
      );
    } else if (message.startsWith("**Assistant:**")) {
      return (
        <div className="flex items-start gap-2">
          <div className="rounded-full bg-gray-700 p-2">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <p>{message.replace("**Assistant:**", "").trim()}</p>
        </div>
      );
    }
    return <p>{message}</p>;
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-indigo-400 text-center">
        <span className="text-4xl">
          <Twitter />
        </span>{" "}
        Twitter Blog Chat
      </h1>
      <div className="bg-gray-800 rounded-lg p-4 shadow-xl mb-4">
        <div className="max-h-[60vh] overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                message.startsWith("**You:")
                  ? "bg-indigo-600/20"
                  : "bg-gray-700/20"
              }`}
            >
              {formatMessage(message)}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-row gap-2">
          <input
            type="text"
            value={userInput}
            onChange={handleUserInput}
            placeholder="Ask something about the blog..."
            className="p-4 w-full bg-gray-800 text-white border border-gray-700 rounded-lg shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     placeholder-gray-400"
            ref={inputRef}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="p-2 bg-indigo-600 rounded-lg font-semibold text-white 
                     transition-all duration-200 hover:bg-indigo-700 hover:scale-105
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!userInput.trim() || isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2 px-4 py-2">
                <Loader2 className="w-4 h-4 animate-spin" />
              </span>
            ) : (
              <span className="flex items-center gap-2 px-4 py-2">
                Send <span className="text-xl">→</span>
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatUI;
