"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type PlanType = "subscription" | "flat";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  price: {
    subscription: number;
    flat: number;
  };
  features: PlanFeature[];
}

const plans: Plan[] = [
  {
    name: "Basic",
    description: "Essential features for individuals",
    price: {
      subscription: 9.99,
      flat: 99,
    },
    features: [
      { name: "Basic feature 1", included: true },
      { name: "Basic feature 2", included: true },
      { name: "Advanced feature 1", included: false },
      { name: "Premium feature", included: false },
    ],
  },
  {
    name: "Pro",
    description: "Advanced tools for professionals",
    price: {
      subscription: 19.99,
      flat: 199,
    },
    features: [
      { name: "Basic feature 1", included: true },
      { name: "Basic feature 2", included: true },
      { name: "Advanced feature 1", included: true },
      { name: "Premium feature", included: false },
    ],
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large teams",
    price: {
      subscription: 49.99,
      flat: 499,
    },
    features: [
      { name: "Basic feature 1", included: true },
      { name: "Basic feature 2", included: true },
      { name: "Advanced feature 1", included: true },
      { name: "Premium feature", included: true },
    ],
  },
];

const PricingToggle = ({
  planType,
  onChange,
}: {
  planType: PlanType;
  onChange: (type: PlanType) => void;
}) => (
  <div className="flex items-center justify-center space-x-4 mb-8">
    <span
      className={`text-sm font-medium ${
        planType === "subscription" ? "text-primary" : "text-muted-foreground"
      }`}
    >
      Monthly
    </span>
    <Switch
      checked={planType === "flat"}
      onCheckedChange={() =>
        onChange(planType === "subscription" ? "flat" : "subscription")
      }
      aria-label="Toggle between subscription and flat pricing"
    />
    <span
      className={`text-sm font-medium ${
        planType === "flat" ? "text-primary" : "text-muted-foreground"
      }`}
    >
      Annual
    </span>
  </div>
);

const PricingCard = ({
  plan,
  planType,
}: {
  plan: Plan;
  planType: PlanType;
}) => (
  <div className="flex flex-col p-6 bg-white rounded-lg shadow-md border border-gray-200">
    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
    <p className="text-muted-foreground mb-4">{plan.description}</p>
    <div className="text-3xl font-bold mb-6">
      ₹
      {planType === "subscription"
        ? plan.price.subscription.toFixed(2)
        : plan.price.flat}
      <span className="text-sm font-normal text-muted-foreground">
        {planType === "subscription" ? "/mo" : "/year"}
      </span>
    </div>
    <ul className="space-y-3 mb-6">
      {plan.features.map((feature, index) => (
        <li key={index} className="flex items-center">
          {feature.included ? (
            <Check className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <div className="h-5 w-5 border border-gray-300 rounded-full mr-2" />
          )}
          <span
            className={
              feature.included ? "text-gray-700" : "text-muted-foreground"
            }
          >
            {feature.name}
          </span>
        </li>
      ))}
    </ul>
    <Button className="mt-auto">Choose {plan.name}</Button>
  </div>
);

export default function PricingList() {
  const [planType, setPlanType] = useState<PlanType>("subscription");

  return (
    <div className="container mx-auto px-4 py-16">
      <PricingToggle planType={planType} onChange={setPlanType} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <PricingCard key={index} plan={plan} planType={planType} />
        ))}
      </div>
    </div>
  );
}
