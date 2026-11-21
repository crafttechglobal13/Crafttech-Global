"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  variant?: "header" | "footer" | "emblem" | "full";
  className?: string;
  href?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function BrandLogo({
  variant = "header",
  className = "",
  href = "/",
  size = "md",
}: BrandLogoProps) {
  // Dimension definitions calibrated for crisp rendering and natural aspect ratios
  const dimensions = {
    sm: {
      headerH: 36,
      headerW: 196,
      footerH: 40,
      footerW: 218,
      emblemW: 42,
      emblemH: 34,
      fullW: 180,
      fullH: 122,
    },
    md: {
      headerH: 44,
      headerW: 240,
      footerH: 48,
      footerW: 262,
      emblemW: 52,
      emblemH: 42,
      fullW: 220,
      fullH: 150,
    },
    lg: {
      headerH: 52,
      headerW: 284,
      footerH: 56,
      footerW: 306,
      emblemW: 66,
      emblemH: 53,
      fullW: 270,
      fullH: 184,
    },
    xl: {
      headerH: 64,
      headerW: 350,
      footerH: 68,
      footerW: 371,
      emblemW: 84,
      emblemH: 68,
      fullW: 340,
      fullH: 231,
    },
  }[size];

  // 1. Full Stacked Logo Variant (Transparent, No Box, No Circle)
  if (variant === "full") {
    const content = (
      <div
        className={`relative inline-flex flex-col items-center justify-center transition-transform duration-300 hover:scale-[1.02] ${className}`}
        style={{ width: dimensions.fullW }}
      >
        <Image
          src="/images/brand/logo_full.png"
          alt="CRAFTTECH GLOBAL — Rooted in Heritage. Designed for the World."
          width={dimensions.fullW}
          height={dimensions.fullH}
          className="w-full h-auto object-contain drop-shadow-xs"
          priority
        />
      </div>
    );
    return href ? <Link href={href}>{content}</Link> : content;
  }

  // 2. Emblem Only Variant (Completely Free-Floating, NO CIRCLE, Transparent)
  if (variant === "emblem") {
    const content = (
      <div
        className={`relative inline-flex items-center justify-center transition-transform duration-300 hover:scale-105 ${className}`}
        style={{ width: dimensions.emblemW, height: dimensions.emblemH }}
      >
        <Image
          src="/images/brand/emblem.png"
          alt="CRAFTTECH GLOBAL Emblem"
          width={dimensions.emblemW}
          height={dimensions.emblemH}
          className="w-full h-full object-contain drop-shadow-xs"
          priority
        />
      </div>
    );
    return href ? <Link href={href}>{content}</Link> : content;
  }

  // 3. Footer Variant (Luminous Ivory & Gold Lockup on Dark Navy, Transparent, NO CIRCLE)
  if (variant === "footer") {
    const content = (
      <div className={`inline-flex flex-col items-start group ${className}`}>
        <div
          className="relative transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ width: dimensions.footerW, height: dimensions.footerH }}
        >
          <Image
            src="/images/brand/logo_footer.png"
            alt="CRAFTTECH GLOBAL"
            width={dimensions.footerW}
            height={dimensions.footerH}
            className="w-full h-full object-contain"
            priority
          />
        </div>
        <span className="text-[9px] sm:text-[10px] tracking-[0.22em] text-[#D4A437] uppercase font-sans font-medium block mt-1.5 pl-0.5 opacity-90">
          Rooted in Heritage. Designed for the World.
        </span>
      </div>
    );
    return href ? <Link href={href}>{content}</Link> : content;
  }

  // 4. Header Variant (Authentic 3D Ruby Maroon & Gold Horizontal Lockup, Transparent, NO CIRCLE)
  const headerContent = (
    <div className={`inline-flex items-center group ${className}`}>
      <div
        className="relative transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ width: dimensions.headerW, height: dimensions.headerH }}
      >
        <Image
          src="/images/brand/logo_header.png"
          alt="CRAFTTECH GLOBAL"
          width={dimensions.headerW}
          height={dimensions.headerH}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    </div>
  );

  return href ? <Link href={href}>{headerContent}</Link> : headerContent;
}
