// hooks/useGemini.ts

import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const useGemini = () => {
  const [client, setClient] = useState<GoogleGenerativeAI | null>(null);

  useEffect(() => {
    const initGemini = async () => {
      try {
        const client = new GoogleGenerativeAI(
          process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
        );
        setClient(client);
      } catch (error) {
        console.error("Error initializing Gemini:", error);
      }
    };

    initGemini();
  }, []);

  const generateTwitterBlog = async (articleUrl: string) => {
    if (!client) {
      throw new Error("Gemini client not initialized");
    }

    const prompt = `**Generate a concise and engaging Twitter thread summarizing the key points of the following article:**

    * **Article URL:** ${articleUrl}

    **Guidelines:**

    * **Thread length:** 2-4 tweets maximum.
    * **Character limit:** 280 characters per tweet (be mindful of Twitter's character limit).
    * **Use hashtags:** Include relevant hashtags to increase visibility.
    * **Maintain a conversational tone:** Write as if you were directly addressing your followers.
    * **Include a compelling call to action:** Encourage readers to click the link and read the full article.
    * **Example:** 
        * Tweet 1: "Just read an amazing article about [topic]! [Key point 1] #[hashtag1] #[hashtag2]" 
        * Tweet 2: "[Key point 2] This is a must-read for anyone interested in [topic]. Link in bio! [hashtag3]"

    **Output format:** 
    * Return each tweet as a separate string in an array.`;

    try {
      const model = client.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const tweets = response.text().trim().split("\n").filter(Boolean);
      return tweets.join("\n\n");
    } catch (error) {
      console.error("Error generating Twitter blog:", error);
      throw error;
    }
  };

  const getGeneratedBlog = async (blogId: string) => {
    // TODO: Implement actual storage logic
    throw new Error(`Blog storage not implemented yet for ID: ${blogId}`);
  };

  return {
    generateTwitterBlog,
    getGeneratedBlog,
    client,
  };
};

export default useGemini;

// import axios from "axios";

// const API_BASE_URL = "https://us-central1-aiplatform.googleapis.com/v1beta1"; // Replace with actual Gemini API base URL.

// const geminiApi = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `AIzaSyAJqO3zq0n-Tj_CKJHEcVaCW3PsaM-ZbNg`, // Replace with your API Key
//   },
// });

// export interface ArticleSummaryResponse {
//   summary: string;
// }

// export interface TwitterBlogResponse {
//   blog: string;
// }

// export const summarizeArticle = async (
//   articleUrl: string
// ): Promise<ArticleSummaryResponse> => {
//   const response = await geminiApi.post<ArticleSummaryResponse>("/summarize", {
//     url: articleUrl,
//   });
//   return response.data;
// };

// export const generateTwitterBlog = async (
//   summary: string
// ): Promise<TwitterBlogResponse> => {
//   const response = await geminiApi.post<TwitterBlogResponse>(
//     "/generate-twitter-blog",
//     { summary }
//   );
//   return response.data;
// };
