import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Search,
  TrendingUp,
  ShoppingBag,
  Palette,
  Code2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Zap,
  Users2,
  Layers,
} from "lucide-react";
import { TECH_SERVICES_DATA } from "@/lib/database/techServicesData";

export const metadata: Metadata = {
  title: "Technology & Digital Solutions | CRAFTTECH GLOBAL",
  description:
    "Empowering businesses with innovative technology, website development, SEO, digital marketing, Shopify stores, and custom software solutions.",
};

export default function ServicesPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Header */}
      <section className="relative bg-[#0D2D5B] text-white py-20 sm:py-28 overflow-hidden">
        {/* Decorative Gold Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4A437]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#7A0D2E]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#FAF5EE]/10 border border-[#D4A437]/50 px-4 py-1.5 rounded-full text-xs text-[#D4A437] font-semibold tracking-wider uppercase backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Engineering & Strategic Growth</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
            Technology & Digital Solutions
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#F7F0E6]/90 max-w-2xl mx-auto leading-relaxed">
            Empowering businesses with innovative technology, creative digital strategies, and solutions that drive growth.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact?service=General%20Technology%20Consultation#consultation"
              className="bg-[#7A0D2E] text-white text-xs sm:text-sm font-semibold py-3.5 px-8 rounded-full hover:bg-[#6B0B28] transition-all shadow-md uppercase tracking-wider flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#D4A437]" />
              <span>Get a Free Consultation</span>
            </Link>
            <Link
              href="#services-catalog"
              className="bg-white/10 text-white text-xs sm:text-sm font-semibold py-3.5 px-8 rounded-full hover:bg-white/20 transition-all border border-white/30 uppercase tracking-wider"
            >
              View Service Portfolio ↓
            </Link>
          </div>
        </div>
      </section>

      {/* Core Technology Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FAF5EE] rounded-3xl p-8 sm:p-12 border border-[#D4A437]/35 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#7A0D2E] text-[#D4A437] flex items-center justify-center flex-shrink-0 shadow-sm">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#1A1A1A] mb-1">
                Modern Architectures
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Engineered with modern frameworks for lightning speeds, high security, and 99.9% uptime.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0D2D5B] text-[#D4A437] flex items-center justify-center flex-shrink-0 shadow-sm">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#1A1A1A] mb-1">
                Conversion-Led Design
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Every layout and campaign is crafted to captivate user attention and generate measurable sales.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D4A437] text-[#1A1A1A] flex items-center justify-center flex-shrink-0 shadow-sm">
              <Users2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#1A1A1A] mb-1">
                Dedicated Concierge
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Direct collaborative consultation from project inception through global deployment and scaling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detailed Catalog */}
      <section id="services-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A437]">
            Full Capabilities
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            Comprehensive Digital Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Tailored digital strategies designed for heritage brands, luxury retailers, and ambitious enterprises worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TECH_SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-7 border-2 border-[#D4A437]/30 shadow-xs hover:border-[#7A0D2E] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF5EE] border border-[#D4A437]/50 flex items-center justify-center text-[#7A0D2E]">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1A1A1A]">
                    {service.title}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-1">
                      Included Capabilities:
                    </span>
                    {service.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A437] flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.serviceParam)}#consultation`}
                    className="w-full bg-[#FAF5EE] hover:bg-[#7A0D2E] text-[#7A0D2E] hover:text-white border border-[#D4A437]/50 py-2.5 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-colors duration-200"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Global Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#7A0D2E] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl border-2 border-[#D4A437]/50 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
              Start Your Digital Transformation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Ready to Accelerate Your Digital Growth?
            </h2>
            <p className="text-xs sm:text-sm text-[#F7F0E6]/90 leading-relaxed">
              Our mission is to connect creativity, craftsmanship, and technology to deliver meaningful value to customers and businesses worldwide.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/contact?service=General%20Technology%20Consultation#consultation"
              className="inline-flex items-center gap-2 bg-[#D4A437] text-[#1A1A1A] text-xs sm:text-sm font-semibold py-3.5 px-8 rounded-full hover:bg-white transition-all shadow-md uppercase tracking-wider"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

