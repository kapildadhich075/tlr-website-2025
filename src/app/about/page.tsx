"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Edit, Film, Award } from "lucide-react";
import Footer from "@/Components/Footer";
import SplitText from "@/SplitText/SplitText";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const services = [
  {
    icon: Camera,
    title: "Video Production",
    description: "High-quality video content for all your needs",
  },
  {
    icon: Edit,
    title: "Post-Production",
    description: "Expert editing and visual effects",
  },
  {
    icon: Film,
    title: "Animation",
    description: "2D and 3D animation services",
  },
  {
    icon: Award,
    title: "Branded Content",
    description: "Tailored videos to enhance your brand",
  },
];

const portfolio = [
  {
    title: "Project 1",
    description: "A short description of the project",
    image:
      "https://ik.imagekit.io/tlredits/Service/IMG_0217.JPG?updatedAt=1693119934389",
    details:
      "This is a detailed description of Project 1. You can add more information about the project, including the challenge, solution, and results.",
  },
];

const teamMembers = [
  {
    name: "Jane Doe",
    role: "Creative Director",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "John Smith",
    role: "Lead Cinematographer",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Emily Johnson",
    role: "Senior Editor",
    image: "/placeholder.svg?height=300&width=300",
  },
];

export default function AboutSection() {
  return (
    <>
      <section className="relative h-[100vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/30">
          <video
            src="/videos/about-us.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-70"
          />
        </div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 space-y-8">
          <SplitText
            text="About Our Video Agency"
            className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white max-w-7xl mx-auto font-[anzo6]"
            delay={150}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
            onLetterAnimationComplete={() => {}}
          />

          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto text-center">
            We&apos;re passionate about creating compelling visual stories that
            captivate audiences and drive results for our clients.
          </p>

          <Button
            variant="secondary"
            size="lg"
            className="mt-8 rounded-full hover:scale-105 transition-all"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#about-content")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Discover More
          </Button>
        </div>
      </section>

      <section
        id="about-content"
        className="py-20 text-white bg-gradient-to-tl from-slate-950 via-purple-950 to-slate-950"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Our Story</h3>
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground">
                  Founded in 2019, our video agency has been at the forefront of
                  visual storytelling for over a decade.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our mission is to transform ideas into powerful visual
                  experiences that resonate with audiences and achieve our
                  client&apos;s goals.
                </p>
              </div>
              <Button
                size="lg"
                className="rounded-full hover:scale-105 transition-all"
              >
                Learn More About Us
              </Button>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <video
                src="/videos/ourstory.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover "
              />
            </div>
          </div>

          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-12">
              Our Portfolio
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {portfolio.map((project, index) => (
                <div
                  key={index}
                  className="relative aspect-square group overflow-hidden rounded-xl"
                >
                  <Image
                    src={project.image}
                    alt={`Portfolio item ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="rounded-full"
                        >
                          View Project
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side="top"
                        className="h-[90vh] sm:h-[80vh] overflow-y-auto"
                      >
                        <div className="container max-w-4xl mx-auto">
                          <SheetHeader className="text-left">
                            <SheetTitle>{project.title}</SheetTitle>
                            <SheetDescription className="text-justify">
                              {project.description}
                            </SheetDescription>
                          </SheetHeader>
                          <div className="mt-6 space-y-4">
                            <div className="relative w-full max-w-2xl mx-auto aspect-video rounded-lg overflow-hidden">
                              <Image
                                src={project.image}
                                alt={project.title}
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-justify">
                              {project.details}
                            </p>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-12">
              Our Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <service.icon className="h-12 w-12 mx-auto text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h4 className="text-xl font-semibold mb-3">
                      {service.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-center mb-12">
              Meet Our Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{member.name}</h4>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
