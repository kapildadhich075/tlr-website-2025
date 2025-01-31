import { NextResponse } from "next/server";
import { generateAsync } from "stability-client";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ... existing imports ...

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Generate images
    const response = await generateAsync({
      prompt:
        prompt ||
        "Professional YouTube thumbnail, trending on social media, high quality, 8k",
      apiKey: process.env.STABILITY_API_KEY || "",
      width: 1024,
      height: 576,
      steps: 50,
      engine: "stable-diffusion-xl-1024-v1-0",
      cfgScale: 7,
      samples: 4,
    });

    // Type assertion for clarity
    interface StabilityResponse {
      images: { buffer: Buffer }[];
    }

    const images = (response as StabilityResponse).images;

    // Upload to Cloudinary with error handling
    const uploadPromises = images.map(async (image) => {
      try {
        const base64 = image.buffer.toString("base64");
        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${base64}`,
          {
            folder: "thumbnails",
            timeout: 30000, // 30 seconds timeout
          }
        );
        return result.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload failed:", uploadError);
        throw new Error("Failed to upload one or more images");
      }
    });

    const thumbnailUrls = await Promise.all(uploadPromises);
    return NextResponse.json({ success: true, urls: thumbnailUrls });
  } catch (error) {
    console.error("Full error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate images",
        details: error instanceof Error ? error.message : JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}
