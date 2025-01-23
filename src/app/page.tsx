"use client";

import { useEffect, useState } from "react";
import { Accordion } from "rizzui";
// import Hyperspeed from "@/Hyperspeed/Hyperspeed";

import SplitText from "@/SplitText/SplitText";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRightIcon,
  ClockIcon,
  ContactIcon,
  BrushIcon,
  HeadsetIcon,
  ImageIcon,
  SettingsIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PricingList from "@/components/Pricing-List";
import Footer from "@/components/Footer";

const data = [
  {
    title: "Fast Turnaround Times",
    icon: <ClockIcon />,
    defaultOpen: true,
    content: {
      point1:
        "<span class='font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'>48-Hour Video Creation:</span> From the moment you brief us, we're on a mission to deliver your edited video within just 48 hours.",
      point2:
        "<span class='font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'>24-Hour Edit Turnaround:</span> Need quick adjustments? Count on us for 24-hour turnaround on edits, keeping your content fresh and relevant.",
    },
  },
  {
    title: "Tailored Editing Solutions",
    icon: <ContactIcon />,
    defaultOpen: false,
    content: `
      <span class='font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'>Personalized Editing Approach: </span>We believe every project is unique. That's why our skilled editors work closely with you, adapting our techniques and style to fit your specific vision and goals. From cinematic masterpieces to engaging social media content, we tailor our services to meet your diverse needs.</span>
    `,
  },
  {
    title: "Art Director Oversight",
    icon: <BrushIcon />,
    defaultOpen: false,
    content: `
       <span class='font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'>Art Director Oversight:</span> Every project at Indie Video Editors is meticulously reviewed by our experienced art directors, ensuring that each video meets our high standards of creativity and quality.
    `,
  },
  {
    title: "24x7 Customer Support",
    icon: <HeadsetIcon />,
    defaultOpen: false,
    content: `
      <span class='font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'>24x7 Customer Support:</span> Our dedicated support team is available around the clock, ready to assist you at every step.
    `,
  },
  {
    title: "Optimized for Social Media",
    icon: <ImageIcon />,
    defaultOpen: false,
    content: `
       <span class='font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'>Making Every Second Count:</span> We specialize in creating captivating content for platforms like Instagram, TikTok, and more. We also have the capability to create multiple versions of a video tailored for different social media platforms using a single set of raw footage and data.  
    `,
  },
  {
    title: "Comprehensive Services",
    icon: <SettingsIcon />,
    defaultOpen: false,
    content: `
        <span class='font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'>Our services go beyond traditional editing.</span> We offer 3D and 2D animation, multi-cam editing, color correction, captions and more, ensuring that every aspect of your video is polished to perfection.  
      `,
  },
];

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading state
  }

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0">
          <video
            src="https://ik.imagekit.io/tlredits/bg.mp4?updatedAt=1736847512233"
            autoPlay
            muted
            loop
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
          <SplitText
            text="Unleash Your Brand's Potential"
            className="text-center text-5xl md:text-6xl lg:text-7xl font-bold text-white max-w-7xl mx-auto font-[anzo6]"
            delay={150}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
            onLetterAnimationComplete={() => {}}
          />

          {/* Optional: Add hero subtitle */}
          <p className="mt-6 text-3xl md:text-7xl text-white/80 text-center max-w-3xl mx-auto animate-fade-in font-light font-[anzo3]">
            FROM RAW TO{" "}
            <span className=" bg-gradient-to-r from-white to-purple-500 text-transparent bg-clip-text font-[anzo1]">
              WOW
            </span>
          </p>

          {/* Optional: Add CTA button */}
          <Link
            href="#pricing"
            className="mt-8 px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition-all animate-fade-in"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#pricing")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            View Editing Plans
          </Link>
        </div>
      </section>

      {/* Rest of your content */}
      <div className="min-h-screen bg-white flex">
        <div className="w-full h-full max-w-7xl mx-auto text-left px-4 py-10">
          <div className="flex flex-col gap-4">
            <p className="text-black text-2xl md:text-5xl font-extralight leading-tight">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Empowering Your Videos
              </span>
              <br />
              with Speed, Creativity, <br />
              and Cutting Edge Techniques
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-2">
              <div className="relative py-10 ">
                <Image
                  src="https://ik.imagekit.io/umdiwr6ma/wedding-235.jpg?updatedAt=1707418453673"
                  alt="Hero"
                  width={300}
                  height={400}
                  className="w-full object-cover rounded-lg "
                />
              </div>
              <div className="rounded-3xl border">
                {data.map((item) => (
                  <div
                    key={item.title}
                    onMouseEnter={(e) => {
                      const accordion = e.currentTarget.querySelector(
                        '[role="button"]'
                      ) as HTMLElement;
                      accordion?.click();
                    }}
                  >
                    <Accordion
                      defaultOpen={item.defaultOpen}
                      className="mx-8 my-2 border-b last-of-type:border-b-0 group"
                    >
                      <Accordion.Header>
                        {({ open }) => (
                          <div className="flex w-full items-center justify-between py-5 text-left">
                            <div className="flex items-center gap-4">
                              <div className="p-2 rounded-full bg-gray-100">
                                {item.icon}
                              </div>
                              <div className="grid gap-1">
                                <h3 className="text-xl font-semibold">
                                  {item.title}
                                </h3>
                              </div>
                            </div>
                            <div
                              className={cn(
                                "h-5 w-5 transform transition-transform duration-300",
                                open && "rotate-90"
                              )}
                            >
                              <ChevronRightIcon />
                            </div>
                          </div>
                        )}
                      </Accordion.Header>
                      <Accordion.Body className="mb-7 ml-8">
                        {typeof item.content === "object" ? (
                          <>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.content.point1,
                              }}
                            />
                            <br />
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.content.point2,
                              }}
                            />
                          </>
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        )}
                      </Accordion.Body>
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className=" bg-white flex" id="pricing">
        <div className="w-full h-full max-w-7xl mx-auto text-left px-4 my-auto">
          <h1 className="text-black text-2xl md:text-5xl font-extralight leading-tight">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Choose the Plan
            </span>
            <br />
            that Fits Your Needs
          </h1>
          <PricingList />
        </div>
      </div>

      <div className="bg-white py-20 md:py-32">
        <div className="w-full h-full max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl bg-black p-8 md:p-16">
            {/* Background Video */}
            <video
              src="https://ik.imagekit.io/tlredits/bg-tlr.mp4?updatedAt=1737115935562"
              autoPlay
              muted
              loop
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl">
                Unsure about which plan is right for you?
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
                Have specific video editing needs? Let&apos;s talk about it!
              </p>
              <a
                href="https://calendly.com/info-thelectureroom/30min"
                target="_blank"
                className="inline-flex items-center px-6 py-3 text-lg font-medium text-black bg-white rounded-full hover:bg-opacity-90 transition-all"
              >
                Schedule free 40-Min call
                <ChevronRightIcon className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
