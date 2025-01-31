"use client";

import { useState, useRef } from "react";
import { CldImage } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function Page() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 500,
    height: 500,
  });

  //   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (!file) return;

  //     setLoading(true);
  //     setError("");

  //     try {
  //       const formData = new FormData();
  //       formData.append("file", file);

  //       const res = await fetch("/api/uploadCrop", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       if (!res.ok) {
  //         throw new Error("Upload failed");
  //       }

  //       const data = await res.json();
  //       setImage(data.secure_url);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : "Upload failed");
  //       console.error("Upload error:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Image Cropping</h1>
        <p className="text-muted-foreground">
          Upload and crop images with Cloudinary
        </p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              className="w-full"
              disabled={loading}
              onClick={handleButtonClick}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                "Choose Image"
              )}
            </Button>

            {error && <p className="text-red-500 text-sm">{error}</p>} */}

            {
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Width: {dimensions.width}px</Label>
                    <Slider
                      min={100}
                      max={1000}
                      step={10}
                      value={[dimensions.width]}
                      onValueChange={(value) =>
                        setDimensions((prev) => ({ ...prev, width: value[0] }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Height: {dimensions.height}px</Label>
                    <Slider
                      min={100}
                      max={1000}
                      step={10}
                      value={[dimensions.height]}
                      onValueChange={(value) =>
                        setDimensions((prev) => ({ ...prev, height: value[0] }))
                      }
                    />
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setDimensions({ width: 500, height: 500 })}
                  >
                    Reset Dimensions
                  </Button>
                </div>

                <CldImage
                  src={`cld-sample-5`}
                  width={dimensions.width}
                  height={dimensions.height}
                  crop={{
                    type: "auto",
                    source: true,
                  }}
                  alt="Uploaded image"
                  className="rounded-lg"
                />
                {/* <Button variant="link" className="w-full" asChild>
                  <a href={image} target="_blank" rel="noopener noreferrer">
                    View full image
                  </a>
                </Button> */}
              </div>
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
