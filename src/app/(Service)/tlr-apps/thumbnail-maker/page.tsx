"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

export default function ThumbnailMaker() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/images");
        const data = await res.json();
        setThumbnails(data.images || []);
      } catch (err) {
        console.error("Error loading history:", err);
      }
    };
    fetchHistory();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.details || "Generation failed");
      }

      const data = await res.json();
      setThumbnails((prev) => [...data.urls, ...prev]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Generation failed";
      setError(errorMessage);
      console.error("Generation error:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            AI Thumbnail Generator
          </h1>
          <p className="text-gray-300 text-lg">
            Create stunning YouTube thumbnails with AI magic
          </p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  placeholder="Describe your perfect thumbnail..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={loading}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 h-12 text-lg"
                />
                <Sparkles className="absolute right-3 top-3 text-gray-400" />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12 text-lg"
                disabled={loading || !prompt}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-6 w-6" />
                )}
                {loading ? "Generating..." : "Create Magic"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="border-red-600">
            <AlertDescription className="text-red-400">
              ⚠️ {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading &&
            Array(4)
              .fill(0)
              .map((_, i) => (
                <Card
                  key={`loading-${i}`}
                  className="bg-gray-800 border-gray-700 animate-pulse"
                >
                  <CardContent className="p-0 aspect-video relative">
                    <div className="w-full h-full bg-gray-700 rounded-t-lg" />
                  </CardContent>
                  <CardFooter className="p-4">
                    <span className="text-gray-400">Generating...</span>
                  </CardFooter>
                </Card>
              ))}

          {thumbnails.map((url, index) => (
            <Card
              key={`thumbnail-${index}`}
              className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all"
            >
              <CardContent className="p-0 aspect-video relative">
                <Image
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="rounded-t-lg object-cover"
                  unoptimized
                  priority={index < 4}
                />
              </CardContent>
              <CardFooter className="p-4 flex justify-between">
                <span className="text-gray-300">Thumbnail {index + 1}</span>
                <Button
                  size="sm"
                  className="bg-gray-700 hover:bg-gray-600"
                  onClick={() => window.open(url, "_blank")}
                >
                  View Full
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
