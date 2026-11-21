"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Gem,
  ShieldCheck,
  Heart,
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Banner */}
      <section className="relative h-[420px] sm:h-[500px] bg-[#1A1A1A] flex items-center justify-center text-center text-white px-4 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1600&q=80"
          alt="CRAFTTECH GLOBAL Story"
          fill
          className="object-cover brightness-[0.4]"
          priority
        />
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A437]">
            Our Legacy & Provenance
          </span>
          <h1 className="font-serif text-3xl sm:text-6xl font-bold tracking-wide">
            Bringing Traditional Craftsmanship to Modern Living.
          </h1>
          <p className="font-sans text-xs sm:text-base text-[#F7F0E6]/90 max-w-2xl mx-auto leading-relaxed">
            CRAFTTECH GLOBAL is an international luxury handicraft and textile maison, dedicated to preserving master heritage traditions and delivering timeless heirlooms to discerning patrons worldwide.
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
            The Genesis
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#7A0D2E] leading-tight">
            Where Ancient Wisdom Meets Contemporary Palaces
          </h2>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
            Founded with a steadfast mission to celebrate India’s glorious generational artistry, CRAFTTECH GLOBAL operates at the intersection of cultural preservation and international luxury standards.
          </p>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
            Every carpet hand-knotted in Bhadohi, every Nakashi brass sculpture cast in Moradabad, and every Zardozi velvet cushion embroidered in Rajasthan represents hundreds of hours of patient, human devotion. We believe true luxury is born when hands, heart, and ancestral memory converge.
          </p>
          <div className="pt-2 flex items-center gap-4">
            <Link
              href="/craftsmanship"
              className="bg-[#7A0D2E] text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-[#6B0B28] flex items-center gap-2 shadow-sm"
            >
              <span>Explore Our Craftsmanship</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 relative h-96 sm:h-[460px] rounded-xl overflow-hidden shadow-xl border border-[#D4A437]/30">
          <Image
            src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80"
            alt="Artisanal metal craftsmanship"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section className="bg-[#FAF5EE] border-y border-[#D4A437]/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 text-center">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
              The Core Ethos
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              Our Guiding Principles
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-6 bg-white rounded-lg border border-[#D4A437]/25 shadow-xs space-y-3">
              <Gem className="w-8 h-8 text-[#7A0D2E]" />
              <h4 className="font-serif font-bold text-base text-[#1A1A1A]">Uncompromising Material</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Only pure New Zealand wool, mulberry silk, solid virgin brass, and organic linen pass our stringent master inspection.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-[#D4A437]/25 shadow-xs space-y-3">
              <Award className="w-8 h-8 text-[#7A0D2E]" />
              <h4 className="font-serif font-bold text-base text-[#1A1A1A]">Ancestral Lineage</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Collaborating directly with multi-generational master weaver and metalsmith families without exploitative middlemen.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-[#D4A437]/25 shadow-xs space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#7A0D2E]" />
              <h4 className="font-serif font-bold text-base text-[#1A1A1A]">International Standards</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Precision sizing, zero defect quality control, and certified insured logistics delivering worldwide.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-[#D4A437]/25 shadow-xs space-y-3">
              <Heart className="w-8 h-8 text-[#7A0D2E]" />
              <h4 className="font-serif font-bold text-base text-[#1A1A1A]">Artisan Welfare</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Reinvesting trade premiums directly into health security, educational stipends, and ergonomic workspace upgrades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Headquarters & Atelier with Interactive Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-4 text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FAF5EE] border border-[#D4A437]/40 px-3.5 py-1.5 rounded-full text-xs text-[#7A0D2E] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A437]" />
            <span>Official Corporate Presence</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            Visit Our Atelier & Headquarters
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Headquartered in the historic, regal state of Rajasthan, CRAFTTECH GLOBAL serves patrons, architects, and interior designers across India, the United States, Europe, and the Middle East.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Official Address & Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border-2 border-[#D4A437]/40 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="border-b border-[#D4A437]/20 pb-4">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D4A437] block mb-1">
                  Registered Corporate Office
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#7A0D2E]">
                  CRAFTTECH GLOBAL
                </h3>
              </div>

              {/* Exact Address formatted prominently */}
              <div className="space-y-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#FAF5EE] border border-[#D4A437]/50 flex items-center justify-center flex-shrink-0 text-[#7A0D2E]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-xs leading-relaxed text-neutral-800">
                    <strong className="block text-sm text-[#1A1A1A] font-serif mb-1">
                      Headquarters Address:
                    </strong>
                    <div className="font-sans space-y-0.5 text-neutral-700">
                      <p className="font-semibold text-[#1A1A1A]">H - 13,</p>
                      <p className="font-semibold text-[#1A1A1A]">GANDHI NAGAR,</p>
                      <p className="font-semibold text-[#1A1A1A]">NAKA MADAAR,</p>
                      <p className="font-bold text-[#7A0D2E]">AJMER - 305001,</p>
                      <p className="font-semibold text-[#1A1A1A]">RAJASTHAN, INDIA.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-2 border-t border-neutral-100">
                  <div className="w-10 h-10 rounded-full bg-[#FAF5EE] border border-[#D4A437]/50 flex items-center justify-center flex-shrink-0 text-[#7A0D2E]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-neutral-700">
                    <strong className="block text-sm text-[#1A1A1A] font-serif mb-0.5">
                      Visiting & Concierge Hours:
                    </strong>
                    <p>Monday – Saturday: 9:00 AM – 8:00 PM IST</p>
                    <p className="text-neutral-500 text-[11px]">Private viewing appointments available by request.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-2 border-t border-neutral-100">
                  <div className="w-10 h-10 rounded-full bg-[#FAF5EE] border border-[#D4A437]/50 flex items-center justify-center flex-shrink-0 text-[#7A0D2E]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-neutral-700">
                    <strong className="block text-sm text-[#1A1A1A] font-serif mb-0.5">
                      Client Services & Trade Liaison:
                    </strong>
                    <p>Phone: +91 98765 43210</p>
                    <p>International: +1 (800) 492-CRAFT</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-2 border-t border-neutral-100">
                  <div className="w-10 h-10 rounded-full bg-[#FAF5EE] border border-[#D4A437]/50 flex items-center justify-center flex-shrink-0 text-[#7A0D2E]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-neutral-700">
                    <strong className="block text-sm text-[#1A1A1A] font-serif mb-0.5">
                      Electronic Mail:
                    </strong>
                    <p>care@crafttechglobal.com</p>
                    <p>trade@crafttechglobal.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-4 border-t border-[#D4A437]/20 flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=H-13+Gandhi+Nagar+Naka+Madaar+Ajmer+Rajasthan+305001"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#7A0D2E] text-white text-xs font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#6B0B28] transition-colors shadow-xs"
              >
                <Navigation className="w-4 h-4 text-[#D4A437]" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3 text-white/70" />
              </a>
              <Link
                href="/contact"
                className="flex-1 border border-[#7A0D2E] text-[#7A0D2E] text-xs font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-1.5 hover:bg-[#FAF5EE] transition-colors"
              >
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Embedded Google Map (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF5EE] rounded-2xl border-2 border-[#D4A437]/40 overflow-hidden shadow-sm flex flex-col">
            {/* Map Top Bar */}
            <div className="bg-[#0D2D5B] text-white px-5 py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4A437]" />
                <span className="font-semibold tracking-wide">
                  Ajmer, Rajasthan • 305001
                </span>
              </div>
              <span className="text-[#D4A437] text-[11px] font-sans uppercase tracking-wider hidden sm:inline">
                Interactive Map View
              </span>
            </div>

            {/* Google Map Iframe */}
            <div className="relative w-full h-[380px] sm:h-[480px] lg:h-full min-h-[380px] bg-neutral-100">
              <iframe
                title="CRAFTTECH GLOBAL Headquarters Location - Ajmer, Rajasthan"
                src="https://maps.google.com/maps?q=H-13,+Gandhi+Nagar,+Naka+Madaar,+Ajmer,+Rajasthan+305001&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Floating Address Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-[#D4A437]/40 shadow-md">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-6 relative flex-shrink-0">
                    <Image src="/images/brand/emblem.png" alt="CG" fill className="object-contain" />
                  </div>
                  <div className="text-[11px] text-neutral-800">
                    <p className="font-bold text-[#7A0D2E]">CRAFTTECH GLOBAL</p>
                    <p className="text-neutral-600">H-13, Gandhi Nagar, Naka Madaar</p>
                    <p className="text-neutral-600">Ajmer - 305001, Rajasthan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
