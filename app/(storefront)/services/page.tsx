import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Layers,
  Zap,
  ShieldCheck,
  Code2,
  Laptop,
  Rocket,
  Cpu,
  Clock,
  Phone,
  Check,
} from "lucide-react";
import { TECH_SERVICES_DATA } from "@/lib/database/techServicesData";

export const metadata: Metadata = {
  title: "Technology & Digital Solutions | CRAFTTECH GLOBAL",
  description:
    "Empowering businesses worldwide with bespoke web development, high-converting Shopify stores, organic SEO domination, and custom software systems.",
};

const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Shopify Plus",
  "Tailwind CSS",
  "PostgreSQL",
  "AWS Cloud",
  "Cloudflare",
  "Google Ads",
  "Meta Ads",
];

const METHODOLOGY_STEPS = [
  {
    step: "01",
    title: "Discovery & Architecture",
    description:
      "We analyze your business goals, target audience, and workflows to craft a technical architecture specification and milestone roadmap.",
  },
  {
    step: "02",
    title: "Bespoke UI/UX Design",
    description:
      "Our creative team designs pixel-perfect, responsive wireframes and interactive prototypes that marry brand elegance with conversion psychology.",
  },
  {
    step: "03",
    title: "Engineering & Rigorous QA",
    description:
      "We write clean, modular, and maintainable code with comprehensive cross-browser testing, accessibility compliance, and security audits.",
  },
  {
    step: "04",
    title: "Deployment & Growth Scaling",
    description:
      "Smooth cloud deployment, Core Web Vitals optimization, analytics tracking, and continuous post-launch performance monitoring.",
  },
];

const FAQS = [
  {
    q: "How do I get started with a technology or web project?",
    a: "Simply click 'Get a Free Consultation' or contact us with your project details. We schedule an initial discovery call within 24 hours to review your requirements, timeline, and budget, and provide a complimentary proposal.",
  },
  {
    q: "Can you customize or migrate an existing website to Shopify or Next.js?",
    a: "Yes. We specialize in both greenfield development and seamless zero-downtime migrations from platforms like WordPress, WooCommerce, or custom CMSs to modern Shopify Plus or Next.js architectures with full SEO preservation.",
  },
  {
    q: "How do your SEO and Digital Marketing strategies generate results?",
    a: "We conduct deep competitor audits, optimize on-page schema and Core Web Vitals, and build data-driven organic ranking funnels alongside hyper-targeted Google and Meta ad campaigns to maximize Return On Ad Spend (ROAS).",
  },
  {
    q: "Do you offer ongoing technical maintenance and support after launch?",
    a: "Absolutely. We provide flexible retainer and maintenance packages covering security updates, server monitoring, feature additions, speed optimization, and 24/7 emergency support.",
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0D2D5B] text-white py-16 sm:py-24 lg:py-28 overflow-hidden">
        {/* Subtle Luxury Gold & Maroon Radial Elements */}
        <div className="absolute top-0 right-0 w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-[#D4A437]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#7A0D2E]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center bg-[#FAF5EE]/10 border border-[#D4A437]/60 px-4 py-1.5 rounded-full text-xs text-[#D4A437] font-semibold tracking-[0.2em] uppercase backdrop-blur-xs">
            <span>CRAFTTECH GLOBAL • Technology & Digital Solutions</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight text-[#F7F0E6]">
            Engineering High-Performance Digital Solutions for Modern & Heritage Brands
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-sm sm:text-base lg:text-lg text-[#F7F0E6]/90 max-w-2xl mx-auto leading-relaxed">
            Empowering businesses with innovative technology, creative digital strategies, and solutions that drive growth.
          </p>

          {/* Dual Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?service=General%20Technology%20Consultation#consultation"
              className="w-full sm:w-auto bg-[#7A0D2E] text-white text-xs sm:text-sm font-semibold py-3.5 px-8 rounded-full hover:bg-[#6B0B28] transition-all shadow-lg uppercase tracking-wider flex items-center justify-center gap-2 border border-[#D4A437]/40"
            >
              <MessageSquare className="w-4 h-4 text-[#D4A437]" />
              <span>Get a Free Consultation</span>
            </Link>
            <Link
              href="#services-catalog"
              className="w-full sm:w-auto bg-white/10 text-white text-xs sm:text-sm font-semibold py-3.5 px-8 rounded-full hover:bg-white/20 transition-all border border-[#D4A437]/40 uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Explore Services Portfolio</span>
              <ArrowRight className="w-4 h-4 text-[#D4A437]" />
            </Link>
          </div>

          {/* Trust Metrics Bar */}
          <div className="pt-8 sm:pt-12 border-t border-[#D4A437]/25 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="space-y-1">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#D4A437]">
                100+
              </div>
              <div className="text-[11px] sm:text-xs text-[#F7F0E6]/80 uppercase tracking-wider">
                Projects Delivered
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#D4A437]">
                99.9%
              </div>
              <div className="text-[11px] sm:text-xs text-[#F7F0E6]/80 uppercase tracking-wider">
                System Reliability
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#D4A437]">
                4.9 / 5
              </div>
              <div className="text-[11px] sm:text-xs text-[#F7F0E6]/80 uppercase tracking-wider">
                Client Satisfaction
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#D4A437]">
                24 / 7
              </div>
              <div className="text-[11px] sm:text-xs text-[#F7F0E6]/80 uppercase tracking-wider">
                Dedicated Concierge
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TECH STACK MARQUEE / BADGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF5EE] rounded-2xl p-6 sm:p-8 border border-[#D4A437]/35 text-center space-y-4 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7A0D2E]">
            Modern Tech Stack & Cloud Infrastructure
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="bg-white px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#1A1A1A] border border-[#D4A437]/40 shadow-xs hover:border-[#7A0D2E] transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES DETAILED CATALOG */}
      <section id="services-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A437] bg-[#0D2D5B] px-3.5 py-1 rounded-full border border-[#D4A437]/50">
            Enterprise Capabilities
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A]">
            Comprehensive Technology Services
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4A437] to-transparent mx-auto" />
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xl mx-auto">
            From bespoke online storefronts to automated business tools, our cross-functional team delivers end-to-end digital solutions tailored to your growth goals.
          </p>
        </div>

        {/* 6 Core Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TECH_SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            return (
              <div
                id={service.id}
                key={service.id}
                className="group relative bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#D4A437]/30 shadow-xs hover:border-[#7A0D2E] hover:shadow-xl transition-all duration-300 flex flex-col justify-between scroll-mt-28"
              >
                <div className="space-y-5">
                  {/* Icon Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 rounded-2xl bg-[#FAF5EE] border border-[#D4A437]/50 flex items-center justify-center text-[#7A0D2E] group-hover:bg-[#7A0D2E] group-hover:text-[#D4A437] transition-colors duration-300 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4A437] bg-[#0D2D5B] text-white px-2.5 py-1 rounded-full border border-[#D4A437]/40">
                      {service.timeline}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A] group-hover:text-[#7A0D2E] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed mt-2">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-[#FAF5EE] text-[#0D2D5B] font-medium px-2 py-0.5 rounded border border-[#D4A437]/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Included Core Capabilities */}
                  <div className="space-y-2 pt-3 border-t border-neutral-100">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A0D2E] block">
                      Key Capabilities:
                    </span>
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A437] flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
                      Deliverables:
                    </span>
                    {service.deliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-neutral-600">
                        <span className="w-1 h-1 rounded-full bg-[#D4A437] flex-shrink-0" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Link */}
                <div className="pt-6 mt-6 border-t border-neutral-100">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.serviceParam)}#consultation`}
                    className="w-full bg-[#FAF5EE] hover:bg-[#7A0D2E] text-[#7A0D2E] hover:text-white border border-[#D4A437]/60 py-3 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-xs"
                  >
                    <span>Request Proposal for {service.title.split(" ")[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. METHODOLOGY & DELIVERY PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF5EE] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#D4A437]/40 shadow-sm space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A0D2E]">
              Our Proven Methodology
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              How We Deliver Exceptional Results
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600">
              A disciplined, transparent, four-stage lifecycle engineered to take ideas from concept to global scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHODOLOGY_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-6 border border-[#D4A437]/30 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="font-serif text-2xl font-bold text-[#D4A437]">
                    {step.step}
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#1A1A1A] mt-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed mt-2">
                    {step.description}
                  </p>
                </div>
                <div className="pt-2 text-[10px] uppercase font-bold tracking-wider text-[#0D2D5B]">
                  Phase {step.step} Complete
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE CRAFTTECH GLOBAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-2xl p-7 border border-[#D4A437]/35 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#0D2D5B] text-[#D4A437] flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">
              Performance & Security First
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We build using modern architectures, ensuring 100/100 Core Web Vitals, ultra-fast loading, and robust defense against vulnerabilities.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-[#D4A437]/35 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#7A0D2E] text-[#D4A437] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">
              100% Code & Asset Ownership
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              You retain full, unencumbered ownership of all codebases, design Figma files, creative assets, and domain configurations from day one.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-[#D4A437]/35 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#D4A437] text-[#1A1A1A] flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">
              Artisan Craft Meets Tech
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We bring the same meticulous precision that defines generational handcrafted rugs to our clean, high-performance software engineering.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A437]">
            Answers to Common Inquiries
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 sm:p-6 border border-[#D4A437]/30 shadow-xs space-y-2"
            >
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#1A1A1A]">
                {faq.q}
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. HIGH-CONVERTING BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#7A0D2E] via-[#6B0B28] to-[#0D2D5B] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl border-2 border-[#D4A437]/50 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
              Start Your Digital Transformation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
              Ready to Accelerate Your Digital Growth?
            </h2>
            <p className="text-xs sm:text-sm text-[#F7F0E6]/90 leading-relaxed">
              Our mission is to connect creativity, craftsmanship, and technology to deliver meaningful value to customers and businesses worldwide.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?service=General%20Technology%20Consultation#consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4A437] text-[#1A1A1A] text-xs sm:text-sm font-semibold py-3.5 px-8 rounded-full hover:bg-white transition-all shadow-md uppercase tracking-wider"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+919079212937"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 text-white text-xs sm:text-sm font-semibold py-3.5 px-8 rounded-full hover:bg-white/20 transition-all border border-[#D4A437]/50 uppercase tracking-wider"
            >
              <Phone className="w-4 h-4 text-[#D4A437]" />
              <span>Call Us: +91 90792 12937</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
