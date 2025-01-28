// Note: ServiceAppCard Component
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import Link from "next/link";

export interface ServiceAppCardProps {
  service: {
    title: string;
    description: string;
    icon: React.ReactNode;
    badge: string;
    gradient: string;
    link: string;
  };
}

export const ServiceAppCard = ({ service }: ServiceAppCardProps) => {
  return (
    <Link href={service.link}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className={`h-2 bg-gradient-to-r ${service.gradient}`} />
        <CardHeader className="relative">
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="text-xs">
              {service.badge}
            </Badge>
          </div>
          <CardTitle className="flex items-center space-x-2">
            <span
              className={`p-2 rounded-full bg-gradient-to-br ${service.gradient}`}
            >
              {service.icon}
            </span>
            <span>{service.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{service.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};
