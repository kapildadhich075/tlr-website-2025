"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SocialIcon = ({
  Icon,
  href,
}: {
  Icon: React.ElementType;
  href: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white  hover:text-purple-500"
  >
    <Icon className="h-6 w-6" />
  </a>
);

const ContactInfo = ({
  Icon,
  text,
}: {
  Icon: React.ElementType;
  text: string;
}) => (
  <div className="flex items-center space-x-2">
    <Icon className="h-5 w-5 text-purple-500" />
    <span className="text-base">{text}</span>
  </div>
);

export default function FooterAndContact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email and message to your server
    const formData = {
      email: email,
      message: message,
    };

    const mailtoLink = `mailto:info.thelectureroom@gmail.com?subject=Message from ${email}&body=${message}`;
    window.open(mailtoLink, "_blank");

    console.log("Submitted:", formData);
    // Reset form fields
    setEmail("");
    setMessage("");
    // You might want to show a success message to the user here
  };

  return (
    <footer className="bg-black/80 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/">
              <Image
                src="https://ik.imagekit.io/umdiwr6ma/tlr%20logo.png?updatedAt=1706964634422"
                alt="Company Logo"
                width={70}
                height={70}
                className="mb-4"
              />
            </Link>
            <p className="text-gray-300 mb-4">
              We&apos;re dedicated to providing the best service to our
              customers. Reach out to us for any questions or support.
            </p>
            <div className="flex space-x-4">
              <SocialIcon Icon={Facebook} href="https://facebook.com" />
              <SocialIcon Icon={Twitter} href="https://twitter.com" />
              <SocialIcon Icon={Instagram} href="https://instagram.com" />
              <SocialIcon Icon={Linkedin} href="https://linkedin.com" />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Contact Us</h3>
            <div className="space-y-5 text-gray-300">
              <ContactInfo Icon={Mail} text="info.thelectureroom@gmail.com" />
              <ContactInfo
                Icon={Phone}
                text="+91 94604 16451 | +91 91660 48255"
              />
              <ContactInfo
                Icon={MapPin}
                text={`201, Shet's Residency, JP Nagar 7th Phase Bengaluru(Karnataka) - 560078`}
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Textarea
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button
                type="submit"
                className="bg-white text-black hover:bg-gray-200"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} TLR Studios LLP. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
