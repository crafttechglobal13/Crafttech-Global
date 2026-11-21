"use client";

import React from "react";
import Link from "next/link";
import {
  Globe,
  Search,
  TrendingUp,
  ShoppingBag,
  Palette,
  Code2,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { TECH_SERVICES_DATA } from "@/lib/database/techServicesData";

export default function TechServicesSection() {
  return (
    <section
      id="tech-services"
      aria-labelledby="tech-services-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24"
    >
      <div className="relative rounded-3xl bg-gradient-to-b from-[#FAF5EE] via-white to-[#F7F0E6] border-2 border-[#D4A437]/40 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-14">
        {/* Subtle Decorative Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A437]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7A0D2E]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center bg-[#0D2D5B] text-[#D4A437] px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase border border-[#D4A437]/50 shadow-xs">
            <span>Digital Excellence • Enterprise Innovation</span>
          </div>

          <h2
            id="tech-services-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight"
          >
            Technology & Digital Solutions
          </h2>

          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4A437] to-transparent mx-auto" />

          <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Empowering businesses with innovative technology, creative digital strategies, and solutions that drive growth.
          </p>
        </div>

        {/* Services Grid (6 Cards) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TECH_SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative bg-white/95 rounded-2xl p-6 sm:p-7 border border-[#D4A437]/35 shadow-xs hover:shadow-xl hover:border-[#7A0D2E] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF5EE] border border-[#D4A437]/50 flex items-center justify-center text-[#7A0D2E] group-hover:bg-[#7A0D2E] group-hover:text-[#D4A437] transition-colors duration-300 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4A437] bg-[#FAF5EE] px-2.5 py-1 rounded-full border border-[#D4A437]/30">
                      Bespoke
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#1A1A1A] group-hover:text-[#7A0D2E] transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="pt-3 border-t border-neutral-100 space-y-2">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A437] flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Direct Action */}
                <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.serviceParam)}#consultation`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A0D2E] hover:text-[#D4A437] transition-colors group/link"
                  >
                    <span>Inquire Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-[10px] text-neutral-400 font-sans uppercase tracking-wider">
                    Crafttech Digital
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Row: Dual Conversion Buttons */}
        <div className="relative z-10 mt-12 pt-10 border-t border-[#D4A437]/30 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0D2D5B] text-white text-xs sm:text-sm font-semibold py-3.5 px-8 rounded-full hover:bg-[#0A244A] border border-[#D4A437]/40 transition-all shadow-md active:scale-95 uppercase tracking-wider"
          >
            <span>Explore Our Services</span>
            <ArrowRight className="w-4 h-4 text-[#D4A437]" />
          </Link>

          <Link
            href="/contact?service=General%20Technology%20Consultation#consultation"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#7A0D2E] text-white text-xs sm:text-sm font-semibold py-3.5 px-8 rounded-full hover:bg-[#6B0B28] transition-all shadow-md active:scale-95 uppercase tracking-wider"
          >
            <MessageSquare className="w-4 h-4 text-[#D4A437]" />
            <span>Get a Free Consultation</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

