"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ruler, CheckCircle } from "lucide-react";

export default function CraftsmanshipPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero */}
      <section className="relative h-[380px] sm:h-[460px] bg-[#1A1A1A] flex items-center justify-center text-center text-white px-4 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80"
          alt="Weaver at pit loom"
          fill
          className="object-cover brightness-[0.45]"
          priority
        />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
            Generational Mastery
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">
            The Soul of Our Craftsmanship
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#F7F0E6]/90 max-w-lg mx-auto">
            Explore the patient, meticulous artisanal disciplines behind every CRAFTTECH GLOBAL heirloom.
          </p>
        </div>
      </section>

      {/* Craft 1: Hand-Knotted Carpets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7A0D2E]">
            Artisan Discipline 01
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Hand-Knotted Carpets of Bhadohi & Mirzapur
          </h2>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
            A single 8x10 foot hand-knotted Persian carpet contains upwards of one million individual knots. Working side-by-side on traditional wooden vertical pit looms, master weavers follow rhythmic vocal chants called <em>Talim</em>, tying each wool tuft by hand.
          </p>
          <div className="space-y-2 text-xs text-neutral-700 pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#D4A437]" />
              <span>Over 250 to 450 knots per square inch (KPSI) density</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#D4A437]" />
              <span>Vegetable and botanical root-extracted permanent natural dyes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#D4A437]" />
              <span>Sun-dried and river-washed for decades of luster and longevity</span>
            </div>
          </div>
          <div className="pt-2">
            <Link
              href="/custom-orders"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#7A0D2E] hover:underline"
            >
              <span>Commission a Custom Loom Size →</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 relative h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg border border-[#D4A437]/30">
          <Image
            src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80"
            alt="Hand knotted carpet detail"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Craft 2: Nakashi Brass Metalwork */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 lg:order-2 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7A0D2E]">
            Artisan Discipline 02
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Lost-Wax Brass Casting & Nakashi Engraving
          </h2>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
            Moradabad’s celebrated metalsmiths begin with molten brass alloy poured into clay molds using the ancient lost-wax technique. Once cool, master engravers spend days using miniature steel chisels to carve delicate botanical scrolls, floral motifs, and sacred arabesques across the surface.
          </p>
          <div className="space-y-2 text-xs text-neutral-700 pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#D4A437]" />
              <span>100% solid brass with substantial heirloom heft</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#D4A437]" />
              <span>Hand-chiseled Nakashi filigree without automated machine stamping</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#D4A437]" />
              <span>Finished with protective anti-tarnish microcrystalline coats</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:order-1 relative h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg border border-[#D4A437]/30">
          <Image
            src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80"
            alt="Brass engraving"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Craft 3: Zardozi & Hand Block Printing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7A0D2E]">
            Artisan Discipline 03
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Royal Zardozi Velvet Embroidery & Block Prints
          </h2>
          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
            In Rajasthan, women artisan collectives practice Zardozi—the royal art of stitching pure metallic gold and silver threads onto dense velvet. Combined with Sanganeri hand block-printing using seasoned teak wooden stamps, our textiles bring imperial warmth into modern bedrooms and lounges.
          </p>
          <div className="pt-2">
            <Link
              href="/categories/home-decor"
              className="inline-flex items-center gap-2 bg-[#7A0D2E] text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-[#6B0B28]"
            >
              <span>Explore Home Textiles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 relative h-80 sm:h-96 rounded-xl overflow-hidden shadow-lg border border-[#D4A437]/30">
          <Image
            src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80"
            alt="Velvet cushion embroidery"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </div>
  );
}

