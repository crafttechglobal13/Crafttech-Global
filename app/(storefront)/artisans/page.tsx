"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export default function ArtisansPage() {
  const artisans = [
    {
      name: "Master Weavers of Bhadohi",
      region: "Bhadohi, Uttar Pradesh",
      craft: "Pit-Loom Wool & Silk Carpets",
      years: "4th Generation Lineage",
      bio: "Preserving the intricate Persian Talim notation, our master weavers knot millions of individual knots to create rugs celebrated in palaces and embassies.",
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "The Nakashi Brass Smiths",
      region: "Moradabad, Uttar Pradesh",
      craft: "Lost-Wax Brass & Bronze Chasing",
      years: "3rd Generation Lineage",
      bio: "Master metal artisans who cast and sculpt royal elephant figurines, amphoras, and lamps using age-old clay and wax molds.",
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Jaipur Zardozi Collective",
      region: "Jaipur, Rajasthan",
      craft: "Zari Velvet Needlework & Block Printing",
      years: "Women Artisan Guild",
      bio: "Empowering female artisans who embroider metallic gold thread and botanical motifs onto deep ruby and emerald velvets.",
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      <div className="relative h-72 sm:h-80 bg-[#1A1A1A] flex items-center justify-center text-center text-white px-4">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
            Human Dedication
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">
            The Master Artisans
          </h1>
          <p className="text-xs sm:text-sm text-[#F7F0E6]/85">
            Behind every knot, chisel mark, and embroidered thread is an artisan family keeping heritage alive.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artisans.map((artisan, i) => (
            <div
              key={i}
              className="bg-white/80 rounded-xl border border-[#D4A437]/30 overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div className="relative h-60 w-full">
                <Image src={artisan.image} alt={artisan.name} fill className="object-cover" />
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between text-xs">
                <div>
                  <span className="text-[10px] font-bold text-[#D4A437] uppercase tracking-wider block">
                    {artisan.region} • {artisan.years}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mt-1">
                    {artisan.name}
                  </h3>
                  <p className="text-neutral-600 mt-2 leading-relaxed">{artisan.bio}</p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="font-semibold text-[#7A0D2E]">{artisan.craft}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

