import React from "react";
import {
  Globe,
  Search,
  TrendingUp,
  ShoppingBag,
  Palette,
  Code2,
} from "lucide-react";

export interface TechService {
  id: string;
  title: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  serviceParam: string;
}

export const TECH_SERVICES_DATA: TechService[] = [
  {
    id: "web-dev",
    title: "Website Development",
    shortDesc:
      "High-performance, modern digital storefronts and web portals engineered for speed, conversion, and effortless user journeys.",
    icon: Globe,
    features: [
      "Business websites",
      "E-commerce websites",
      "Custom web applications",
      "Responsive website design",
    ],
    serviceParam: "Website Development",
  },
  {
    id: "seo",
    title: "Search Engine Optimization (SEO)",
    shortDesc:
      "Data-driven search visibility strategies to propel your brand to top rankings, capturing high-intent organic visitors.",
    icon: Search,
    features: [
      "On-page SEO",
      "Technical SEO",
      "Keyword research",
      "Website optimization",
      "Local SEO",
    ],
    serviceParam: "SEO Services",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    shortDesc:
      "Targeted digital campaigns and creative performance marketing that amplify brand prestige and convert prospects into loyal patrons.",
    icon: TrendingUp,
    features: [
      "Social media marketing",
      "Google Ads campaigns",
      "Facebook & Instagram advertising",
      "Lead generation strategies",
    ],
    serviceParam: "Digital Marketing",
  },
  {
    id: "shopify-dev",
    title: "Shopify Development",
    shortDesc:
      "Bespoke Shopify store builds, custom liquid themes, and scalable app integrations tailored to global e-commerce excellence.",
    icon: ShoppingBag,
    features: [
      "Shopify store development",
      "Custom Shopify theme development",
      "Shopify app development",
      "Store customization",
    ],
    serviceParam: "Shopify Development",
  },
  {
    id: "branding-design",
    title: "Branding & Graphic Design",
    shortDesc:
      "Distinctive visual identities, regal brand guidelines, and high-impact design assets that command authority in your industry.",
    icon: Palette,
    features: [
      "Logo design",
      "Brand identity",
      "Marketing creatives",
      "Social media graphics",
    ],
    serviceParam: "Branding & Graphic Design",
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    shortDesc:
      "Tailor-made software architectures, enterprise management dashboards, and robust API workflows that automate business operations.",
    icon: Code2,
    features: [
      "Business management systems",
      "Custom web applications",
      "API integrations",
      "Business automation solutions",
    ],
    serviceParam: "Custom Software Development",
  },
];

