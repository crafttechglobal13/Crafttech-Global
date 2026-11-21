"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      try {
        await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim() }),
        });
      } catch (err) {
        console.error(err);
      }
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0D2D5B] text-[#F7F0E6] pt-16 pb-6 border-t-2 border-[#D4A437]/40 relative overflow-hidden">
      {/* Background delicate gold glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A437]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#D4A437]/20">
          {/* Col 1: Brand Info & Socials */}
          <div className="space-y-4">
            <BrandLogo variant="footer" size="lg" />

            <p className="text-xs text-[#F7F0E6]/80 leading-relaxed max-w-sm pt-2">
              Bringing Traditional Craftsmanship to Modern Living. Discover exceptional hand-knotted Persian carpets, intricate Nakashi brassware, and artisan-embroidered home decor created by generational masters.
            </p>

            {/* Social Icons with Clean SVGs */}
            <div className="pt-2 flex items-center space-x-3 text-[#D4A437]">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#D4A437]/40 flex items-center justify-center hover:bg-[#D4A437] hover:text-[#0D2D5B] transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#D4A437]/40 flex items-center justify-center hover:bg-[#D4A437] hover:text-[#0D2D5B] transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#D4A437]/40 flex items-center justify-center hover:bg-[#D4A437] hover:text-[#0D2D5B] transition-all"
                aria-label="Pinterest"
              >
                <span className="text-xs font-bold">P</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#D4A437]/40 flex items-center justify-center hover:bg-[#D4A437] hover:text-[#0D2D5B] transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#D4A437]/40 flex items-center justify-center hover:bg-[#D4A437] hover:text-[#0D2D5B] transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61 0 .88.72 1.6 1.61 1.6.88 0 1.6-.72 1.6-1.6 0-.89-.72-1.61-1.6-1.61z" />
                </svg>
              </a>
            </div>

            {/* Registered Corporate Headquarters */}
            <div className="pt-3 border-t border-[#D4A437]/25 text-[#F7F0E6]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A437] flex-shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <span className="font-semibold text-white block">Corporate Headquarters:</span>
                  <span className="text-[#F7F0E6]/90">
                    H - 13, Gandhi Nagar, Naka Madaar, Ajmer - 305001, Rajasthan, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-[#D4A437] font-semibold text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#F7F0E6]/80">
              <li>
                <Link href="/" className="hover:text-[#D4A437] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D4A437] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/craftsmanship" className="hover:text-[#D4A437] transition-colors">
                  Our Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D4A437] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#D4A437] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-[#D4A437] transition-colors">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-[#D4A437] font-semibold text-sm tracking-wider uppercase">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-[#F7F0E6]/80">
              <li>
                <Link href="/categories/carpets-rugs" className="hover:text-[#D4A437] transition-colors">
                  Carpets & Rugs
                </Link>
              </li>
              <li>
                <Link href="/categories/handicrafts" className="hover:text-[#D4A437] transition-colors">
                  Handicrafts
                </Link>
              </li>
              <li>
                <Link href="/categories/home-decor" className="hover:text-[#D4A437] transition-colors">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link href="/shop?badge=New" className="hover:text-[#D4A437] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop?badge=Bestseller" className="hover:text-[#D4A437] transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/custom-orders" className="hover:text-[#D4A437] transition-colors text-[#D4A437]">
                  Custom Rug Size Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Technology & Digital Solutions */}
          <div className="space-y-3">
            <h4 className="font-serif text-[#D4A437] font-semibold text-sm tracking-wider uppercase flex items-center gap-1.5">
              <span>Technology</span>
              <span className="text-[9px] bg-[#D4A437] text-[#1A1A1A] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                New
              </span>
            </h4>
            <ul className="space-y-2 text-xs text-[#F7F0E6]/80">
              <li>
                <Link href="/services" className="hover:text-[#D4A437] transition-colors font-medium text-white flex items-center gap-1">
                  <span>All Tech Services</span>
                  <span>→</span>
                </Link>
              </li>
              <li>
                <Link href="/services#web-dev" className="hover:text-[#D4A437] transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/services#shopify-dev" className="hover:text-[#D4A437] transition-colors">
                  Shopify Development
                </Link>
              </li>
              <li>
                <Link href="/services#seo" className="hover:text-[#D4A437] transition-colors">
                  SEO & Search Rankings
                </Link>
              </li>
              <li>
                <Link href="/services#digital-marketing" className="hover:text-[#D4A437] transition-colors">
                  Digital Marketing & Ads
                </Link>
              </li>
              <li>
                <Link href="/services#custom-software" className="hover:text-[#D4A437] transition-colors">
                  Custom Software & APIs
                </Link>
              </li>
              <li>
                <Link href="/contact?service=General%20Technology%20Consultation#consultation" className="hover:text-[#D4A437] transition-colors text-[#D4A437] font-medium">
                  Free Tech Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Customer Support & Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif text-[#D4A437] font-semibold text-sm tracking-wider uppercase">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-[#F7F0E6]/80">
              <li>
                <Link href="/account/orders" className="hover:text-[#D4A437] transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-[#D4A437] transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#D4A437] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#D4A437] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="hover:text-[#D4A437] transition-colors">
                  Bulk & Trade Enquiries
                </Link>
              </li>
            </ul>

            <div className="pt-4">
              <h5 className="font-serif text-xs font-semibold text-[#D4A437] mb-1.5 uppercase">
                Newsletter
              </h5>
              <p className="text-[11px] text-[#F7F0E6]/70 mb-2">
                Get the latest updates and exclusive offers.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-1.5 text-xs text-green-300">
                  <CheckCircle className="w-4 h-4" />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full bg-white text-[#1A1A1A] text-xs py-2 pl-3 pr-10 rounded-full focus:outline-none focus:ring-1 focus:ring-[#D4A437]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 w-7 h-7 bg-[#7A0D2E] text-white rounded-full flex items-center justify-center hover:bg-[#6B0B28] transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F7F0E6]/70">
          <div>
            © 2026 <strong className="text-white">CRAFTTECH GLOBAL</strong>. All Rights Reserved.
          </div>

          {/* Verified Payment Partners */}
          <div className="flex items-center space-x-3 text-xs">
            <span className="font-semibold text-white/90">VISA</span>
            <span className="text-white/40">•</span>
            <span className="font-semibold text-white/90">Mastercard</span>
            <span className="text-white/40">•</span>
            <span className="font-bold text-sky-400">Razorpay</span>
            <span className="text-white/40">•</span>
            <span className="font-bold text-indigo-400">stripe</span>
          </div>
        </div>

        {/* Luxury Gold Filigree Bottom Border Graphic */}
        <div className="mt-6 pt-2 border-t border-[#D4A437]/20 flex justify-center opacity-60">
          <div className="text-[10px] tracking-[0.4em] text-[#D4A437] font-serif uppercase">
            ❖ &nbsp; CRAFTTECH GLOBAL &nbsp; • &nbsp; HERITAGE &nbsp; • &nbsp; LUXURY &nbsp; • &nbsp; TIMELESS &nbsp; ❖
          </div>
        </div>
      </div>
    </footer>
  );
}
