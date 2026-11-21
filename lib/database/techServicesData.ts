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
  tags: string[];
  deliverables: string[];
  timeline: string;
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
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Fast Loading"],
    deliverables: [
      "Custom UI/UX & Responsive Layout",
      "Clean, SEO-Optimized Codebase",
      "Cross-Browser & Device QA Testing",
      "Content Management & Hosting Setup",
    ],
    timeline: "2 – 4 Weeks",
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
    tags: ["Keyword Strategy", "Technical Audit", "Core Web Vitals", "Schema Markup"],
    deliverables: [
      "Comprehensive Technical SEO Audit",
      "High-Intent Keyword Map",
      "On-Page Content & Meta Optimization",
      "Monthly Ranking & Organic Traffic Reports",
    ],
    timeline: "Ongoing (Monthly)",
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
    tags: ["Google Search & Shopping", "Meta Ads", "Retargeting", "Conversion Tracking"],
    deliverables: [
      "Targeted Ad Creative & Copywriting",
      "Audience Segmentation & Funnel Setup",
      "Conversion Tracking & Pixel Setup",
      "Weekly ROAS Performance Optimization",
    ],
    timeline: "Active Campaign Management",
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
    tags: ["Shopify Plus", "Liquid", "Storefront API", "Payment Gateways"],
    deliverables: [
      "Bespoke Shopify Theme Architecture",
      "Cart & Checkout Customization",
      "Payment & Shipping Gateway Setup",
      "Third-Party App & ERP Synchronization",
    ],
    timeline: "2 – 5 Weeks",
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
    tags: ["Brand Book", "Vector Logos", "Typography", "Social Media Kits"],
    deliverables: [
      "Primary Logo, Secondary Marks & Badges",
      "Color Palette & Typography Guidelines",
      "Social Media Templates & Banner Kit",
      "Packaging & Marketing Print Assets",
    ],
    timeline: "1 – 3 Weeks",
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
    tags: ["Full-Stack", "REST & GraphQL APIs", "PostgreSQL", "Cloud Automation"],
    deliverables: [
      "Architecture Blueprint & Scope Spec",
      "Custom Admin / Operator Portals",
      "Secure REST / GraphQL API Layer",
      "Automated Webhooks & Reporting",
    ],
    timeline: "4 – 8 Weeks",
  },
];
