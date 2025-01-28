import { Bot, Youtube, Camera, Sparkles } from "lucide-react";

import { ServiceAppCard } from "./ServiceAppCard";

export default function ServicesShowcase() {
  const services = [
    {
      title: "Twitter Bot Creator",
      description:
        "Create custom Twitter bots to automate your social media presence and engage with your audience.",
      icon: <Bot className="w-6 h-6" />,
      badge: "AI-Powered",
      gradient: "from-blue-500 to-purple-600",
      link: "/tlr-apps/twitter-bot",
    },
    {
      title: "YouTube Script Writer",
      description:
        "Generate compelling scripts for your YouTube videos to boost engagement and views.",
      icon: <Youtube className="w-6 h-6" />,
      badge: "SEO Optimized",
      gradient: "from-red-500 to-yellow-500",
      link: "/tlr-apps/youtube-script",
    },
    {
      title: "Instagram Story Ideas",
      description:
        "   Get creative Instagram story ideas to keep your followers engaged and grow your audience.        ",
      icon: <Camera className="w-6 h-6" />,
      badge: "Trending",
      gradient: "from-pink-500 to-orange-400",
      link: "/tlr-apps/instagram-story-ideas",
    },
    {
      title: "Content Idea Generator",
      description:
        "Get innovative content ideas for your blog, social media, or marketing campaigns.",
      icon: <Sparkles className="w-6 h-6" />,
      badge: "AI-Assisted",
      gradient: "from-green-400 to-cyan-500",
      link: "/tlr-apps/content-idea-generator",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Our Creative Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <ServiceAppCard key={index} service={service} />
        ))}
      </div>
    </div>
  );
}
