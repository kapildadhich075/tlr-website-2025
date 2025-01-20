"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Mail, Phone, MapPin, ChevronRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import SplitText from "@/SplitText/SplitText";

const ContactInfo = ({
  Icon,
  text,
  href,
}: {
  Icon: React.ElementType;
  text: string;
  href: string;
}) => (
  <a
    href={href}
    className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-200"
  >
    <Icon className="h-5 w-5" />
    <span>{text}</span>
  </a>
);

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    console.log("Submitted:", { name, email, message });
    // Reset form fields
    setName("");
    setEmail("");
    setMessage("");
    // You might want to show a success message to the user here
  };

  return (
    <>
      <section className="relative h-[100vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/30">
          <video
            src="/videos/contact.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-70"
          />
        </div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 space-y-8">
          <SplitText
            text="Contact Us"
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
            Let&apos;s discuss your project and explore how we can bring your
            vision to life through exceptional video content.
          </p>

          <Button
            variant="secondary"
            size="lg"
            className="mt-8 rounded-full hover:scale-105 transition-all"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact-form")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Get Started
          </Button>
        </div>
      </section>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950">
        <div className="container mx-auto px-4 py-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
          >
            Get in Touch
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
            {/* Contact Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-6 text-white">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="min-h-[150px] bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2.5"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-6 text-white">
                Contact Information
              </h2>
              <div className="space-y-6 mb-8">
                <ContactInfo
                  Icon={Mail}
                  text="contact@studio.com"
                  href="mailto:contact@studio.com"
                />
                <ContactInfo
                  Icon={Phone}
                  text="+1 (555) 123-4567"
                  href="tel:+15551234567"
                />
                <ContactInfo
                  Icon={MapPin}
                  text="123 Creative Street, NY 10001"
                  href="#"
                />
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-white mb-4">
                  Our Location
                </h3>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-white/10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes+Square!5e0!3m2!1sen!2sus!4v1510579767645"
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Our Location"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className=" py-20 md:py-32">
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
        </div>
      </div>
      <Footer />
    </>
  );
}
