"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Gem,
  Award,
  ShieldCheck,
  Globe,
  Headphones,
  CheckCircle,
} from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { dbService } from "@/lib/database/db";
import TechServicesSection from "@/components/home/TechServicesSection";

export default function HomePage() {
  const products = dbService.getProducts();
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 5);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  const [heroIndex, setHeroIndex] = useState(0);
  const heroSlides = [
    {
      title: "Bringing Traditional Craftsmanship to Modern Living.",
      highlight: "Modern Living.",
      desc: "Explore a thoughtfully curated collection of handcrafted carpets, rugs and home decor, created to bring character and elegance into every space.",
      image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1800&q=85",
      cta: "/shop?category=carpets-rugs",
    },
    {
      title: "Artisanal Nakashi Brass & Sacred Metal Sculptures.",
      highlight: "Sacred Metal Sculptures.",
      desc: "Directly from the royal master artisans of Moradabad and Jaipur. Each sculpture is hand-cast and hand-chiseled with centuries of heritage.",
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1800&q=85",
      cta: "/categories/handicrafts",
    },
    {
      title: "Hand-Embroidered Velvet & Regal Home Accents.",
      highlight: "Regal Home Accents.",
      desc: "Elevate your sanctuary with heritage Zardozi velvet cushions, hand block-printed runners, and enchanting Moroccan brass lanterns.",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1800&q=85",
      cta: "/categories/home-decor",
    },
  ];

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      dbService.subscribeNewsletter(newsletterEmail.trim());
      setNewsletterSuccess(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* =========================================================================
          SECTION 1: HERO BANNER
      ========================================================================= */}
      <section className="relative w-full h-[520px] sm:h-[620px] lg:h-[700px] overflow-hidden bg-[#1A1A1A]">
        {/* Slide Image */}
        <div className="absolute inset-0">
          <Image
            src={heroSlides[heroIndex].image}
            alt="CRAFTTECH GLOBAL Luxury Hero Banner"
            fill
            className="object-cover object-center transition-all duration-700 brightness-[0.78]"
            priority
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 flex flex-col justify-center">
          <div className="max-w-2xl text-white space-y-4 sm:space-y-6">
            <span className="inline-block text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#D4A437] uppercase">
              Heritage • Luxury • Authenticity
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-wide">
              Bringing Traditional Craftsmanship to{" "}
              <span className="italic text-[#D4A437]">Modern Living.</span>
            </h1>

            <p className="font-sans text-xs sm:text-base text-[#F7F0E6]/90 leading-relaxed font-normal max-w-xl">
              {heroSlides[heroIndex].desc}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="bg-[#7A0D2E] text-white px-7 py-3 rounded-full font-sans text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-[#6B0B28] transition-all shadow-lg active:scale-95 border border-[#7A0D2E]"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/about"
                className="bg-transparent text-[#F7F0E6] px-7 py-3 rounded-full font-sans text-xs sm:text-sm font-semibold hover:bg-white/10 hover:text-white transition-all border border-[#D4A437]/70"
              >
                Discover Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Controls: Previous & Next */}
        <button
          onClick={() =>
            setHeroIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center border border-white/20 transition-all backdrop-blur-xs"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() =>
            setHeroIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center border border-white/20 transition-all backdrop-blur-xs"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                heroIndex === i ? "w-7 h-2 bg-[#D4A437]" : "w-2 h-2 bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SHOP BY CATEGORY (3 Cards)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A437]">
            Curated Spaces
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1A1A1A]">
            Shop by Category
          </h2>
          <div className="w-16 h-0.5 bg-[#D4A437] mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* 1. Carpets & Rugs */}
          <div className="group relative h-[380px] sm:h-[420px] rounded-lg overflow-hidden shadow-md border border-[#D4A437]/25 flex flex-col justify-end p-6 text-white">
            <Image
              src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80"
              alt="Carpets & Rugs"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="relative z-10 space-y-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#D4A437]">
                Heritage Weaves
              </span>
              <h3 className="font-serif text-2xl font-bold">Carpets & Rugs</h3>
              <p className="text-xs text-[#F7F0E6]/85 line-clamp-2">
                Timeless designs for every space, hand-knotted by generations of weavers.
              </p>
              <Link
                href="/categories/carpets-rugs"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4A437] hover:text-white pt-2 group-hover:translate-x-1 transition-all"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 2. Handicrafts */}
          <div className="group relative h-[380px] sm:h-[420px] rounded-lg overflow-hidden shadow-md border border-[#D4A437]/25 flex flex-col justify-end p-6 text-white">
            <Image
              src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80"
              alt="Handicrafts"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="relative z-10 space-y-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#D4A437]">
                Sacred Artisanship
              </span>
              <h3 className="font-serif text-2xl font-bold">Handicrafts</h3>
              <p className="text-xs text-[#F7F0E6]/85 line-clamp-2">
                Artisan creations, made with love, celebrating royal brass, metal and woodcraft.
              </p>
              <Link
                href="/categories/handicrafts"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4A437] hover:text-white pt-2 group-hover:translate-x-1 transition-all"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 3. Home Decor */}
          <div className="group relative h-[380px] sm:h-[420px] rounded-lg overflow-hidden shadow-md border border-[#D4A437]/25 flex flex-col justify-end p-6 text-white">
            <Image
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80"
              alt="Home Decor"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="relative z-10 space-y-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#D4A437]">
                Refined Living
              </span>
              <h3 className="font-serif text-2xl font-bold">Home Decor</h3>
              <p className="text-xs text-[#F7F0E6]/85 line-clamp-2">
                Add elegance to your home with embroidered cushions, lanterns, and textiles.
              </p>
              <Link
                href="/categories/home-decor"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4A437] hover:text-white pt-2 group-hover:translate-x-1 transition-all"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: BESTSELLERS
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-3 border-b border-[#D4A437]/30">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A437]">
              Customer Favorites
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              Bestsellers
            </h2>
          </div>
          <Link
            href="/shop?badge=Bestseller"
            className="text-xs font-semibold text-[#7A0D2E] hover:text-[#D4A437] flex items-center gap-1.5 transition-colors mt-2 sm:mt-0"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 5 Bestseller Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: OUR CRAFTSMANSHIP & VALUES (Split Layout)
      ========================================================================= */}
      <section className="bg-[#FAF5EE] border-y border-[#D4A437]/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Narrative */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A437]">
              The Heart of CRAFTTECH
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#7A0D2E] leading-tight">
              Crafted by Hands. <br />
              <span className="text-[#1A1A1A]">Inspired by Heritage.</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              At CRAFTTECH GLOBAL, we celebrate traditional craftsmanship and timeless design, bringing you handmade treasures from skilled artisans. Each rug, sculpture, and textile carries centuries of generational mastery.
            </p>
            <div className="pt-2">
              <Link
                href="/craftsmanship"
                className="inline-flex items-center gap-2 bg-[#7A0D2E] text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-[#6B0B28] transition-colors shadow-sm"
              >
                <span>Our Craftsmanship</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Center: Authentic Artisan Photograph */}
          <div className="lg:col-span-5 relative h-72 sm:h-96 rounded-lg overflow-hidden shadow-lg border border-[#D4A437]/40">
            <Image
              src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"
              alt="Master weaver handcrafting carpet on traditional loom"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white px-3 py-1.5 rounded text-[11px] font-sans border border-white/20">
              Master Weaver • Bhadohi, India
            </div>
          </div>

          {/* Right: 4-5 Value Props */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="flex items-start gap-3 p-3 bg-white/80 rounded border border-[#D4A437]/20 shadow-xs">
              <div className="p-2 rounded-full bg-[#7A0D2E]/10 text-[#7A0D2E]">
                <Gem className="w-5 h-5 text-[#7A0D2E]" />
              </div>
              <div>
                <h4 className="font-serif text-xs font-bold text-[#1A1A1A]">
                  Thoughtfully Selected Products
                </h4>
                <p className="text-[11px] text-neutral-600">
                  Ethically sourced authentic craft traditions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white/80 rounded border border-[#D4A437]/20 shadow-xs">
              <div className="p-2 rounded-full bg-[#7A0D2E]/10 text-[#7A0D2E]">
                <Award className="w-5 h-5 text-[#7A0D2E]" />
              </div>
              <div>
                <h4 className="font-serif text-xs font-bold text-[#1A1A1A]">
                  Quality Craftsmanship
                </h4>
                <p className="text-[11px] text-neutral-600">
                  100% genuine wool, pure silk, and solid brass.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white/80 rounded border border-[#D4A437]/20 shadow-xs">
              <div className="p-2 rounded-full bg-[#7A0D2E]/10 text-[#7A0D2E]">
                <ShieldCheck className="w-5 h-5 text-[#7A0D2E]" />
              </div>
              <div>
                <h4 className="font-serif text-xs font-bold text-[#1A1A1A]">
                  Secure Shopping
                </h4>
                <p className="text-[11px] text-neutral-600">
                  256-bit encrypted payments with Razorpay & Stripe.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white/80 rounded border border-[#D4A437]/20 shadow-xs">
              <div className="p-2 rounded-full bg-[#7A0D2E]/10 text-[#7A0D2E]">
                <Globe className="w-5 h-5 text-[#7A0D2E]" />
              </div>
              <div>
                <h4 className="font-serif text-xs font-bold text-[#1A1A1A]">
                  International Shipping
                </h4>
                <p className="text-[11px] text-neutral-600">
                  Express insured global delivery across 60+ countries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: NEW ARRIVALS
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-3 border-b border-[#D4A437]/30">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A437]">
              Fresh from the Ateliers
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop?badge=New"
            className="text-xs font-semibold text-[#7A0D2E] hover:text-[#D4A437] flex items-center gap-1.5 transition-colors mt-2 sm:mt-0"
          >
            <span>View All New Releases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: NEWSLETTER BANNER (Global Navy with Gold Accents)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#0D2D5B] rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-[#D4A437]/40 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Subtle gold ornamentation overlay */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#D4A437]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-xl text-center lg:text-left space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A437]">
              Join The Craft Circle
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Stay Connected with Our World of Craftsmanship.
            </h3>
            <p className="text-xs sm:text-sm text-[#F7F0E6]/80">
              Subscribe to receive exclusive access to limited-edition collector releases, artisan stories, and royal member privileges.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {newsletterSuccess ? (
              <div className="flex items-center gap-2 bg-green-900/60 text-green-200 border border-green-400 px-6 py-3 rounded-full text-xs font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>You are subscribed to the CRAFTTECH GLOBAL newsletter.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-white text-[#1A1A1A] text-xs px-4 py-3 rounded-full w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[#D4A437]"
                />
                <button
                  type="submit"
                  className="bg-[#D4A437] text-[#1A1A1A] font-semibold text-xs px-6 py-3 rounded-full hover:bg-white transition-colors uppercase tracking-wider shadow-md"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: SOCIAL MEDIA GALLERY (Follow Us @ CRAFTTECH GLOBAL)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A437]">
            Social Impressions
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A] mt-1">
            Follow Us @ CRAFTTECH GLOBAL
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=600&q=80",
          ].map((url, i) => (
            <div
              key={i}
              className="relative aspect-square rounded overflow-hidden group shadow-xs border border-[#D4A437]/20"
            >
              <Image
                src={url}
                alt={`CRAFTTECH Global Lifestyle ${i + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#7A0D2E]/0 group-hover:bg-[#7A0D2E]/40 transition-colors flex items-center justify-center">
                <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  @crafttechglobal
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: TECHNOLOGY & DIGITAL SOLUTIONS
      ========================================================================= */}
      <TechServicesSection />
    </div>
  );
}

