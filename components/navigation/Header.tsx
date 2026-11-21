"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  User as UserIcon,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Globe,
  Truck,
  Gift,
  Tag,
  ShieldCheck,
  LogOut,
  ArrowRight,
} from "lucide-react";
import { useCurrency, CURRENCIES, CurrencyCode } from "@/lib/currency/currencyContext";
import { useCart } from "@/lib/cart/cartContext";
import { useWishlist } from "@/lib/wishlist/wishlistContext";
import BrandLogo from "@/components/ui/BrandLogo";
import { useAuth } from "@/lib/auth/authContext";

export default function Header() {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();
  const { totalItems, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout, isAdmin } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMegaMenu(null);
    setIsSearchOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#7A0D2E] text-[#F7F0E6] text-xs font-medium border-b border-[#D4A437]/30 py-2 px-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left Messages */}
          <div className="flex items-center space-x-4 md:space-x-6 text-[11px] md:text-xs tracking-wide">
            <span className="flex items-center gap-1.5 hover:text-[#D4A437] transition-colors">
              <Globe className="w-3.5 h-3.5 text-[#D4A437]" />
              <span>International Shipping Available</span>
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:flex items-center gap-1.5 hover:text-[#D4A437] transition-colors">
              <Gift className="w-3.5 h-3.5 text-[#D4A437]" />
              <span>Discover Our New Collection</span>
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:flex items-center gap-1.5 hover:text-[#D4A437] transition-colors">
              <Tag className="w-3.5 h-3.5 text-[#D4A437]" />
              <span>Free Shipping on Orders Above $100</span>
            </span>
          </div>

          {/* Right Controls: Currency Selector & Track Order */}
          <div className="flex items-center space-x-4 text-[11px] md:text-xs">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#D4A437] uppercase tracking-wider py-0.5 transition-colors focus:outline-none"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-[#D4A437]" />
              </button>

              {isCurrencyDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-36 bg-[#1A1A1A] border border-[#D4A437]/40 shadow-2xl rounded z-50 py-1"
                  onMouseLeave={() => setIsCurrencyDropdownOpen(false)}
                >
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                        currency === c
                          ? "bg-[#7A0D2E] text-white font-semibold"
                          : "text-[#F7F0E6] hover:bg-[#D4A437]/20"
                      }`}
                    >
                      <span>{c}</span>
                      <span className="text-white/60 text-[10px]">{CURRENCIES[c].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-white/30">|</span>

            <Link
              href="/account/orders"
              className="hover:text-[#D4A437] transition-colors flex items-center gap-1"
            >
              <Truck className="w-3.5 h-3.5 text-[#D4A437]" />
              <span>Track Order</span>
            </Link>

            {isAdmin && (
              <>
                <span className="text-white/30">|</span>
                <Link
                  href="/admin"
                  className="bg-[#D4A437] text-[#1A1A1A] font-semibold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase hover:bg-white transition-all shadow-sm"
                >
                  Admin Panel
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header
        className={`sticky top-0 z-40 bg-[#F7F0E6] border-b border-[#D4A437]/20 transition-all duration-300 ${
          isScrolled ? "shadow-md py-2.5" : "py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 text-[#1A1A1A] hover:text-[#7A0D2E] focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Left: Brand Logo */}
          <BrandLogo variant="header" size={isScrolled ? "sm" : "md"} />

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 font-sans text-[14px] text-[#1A1A1A]">
            <Link
              href="/"
              className={`font-medium tracking-wide transition-colors relative py-1 ${
                pathname === "/"
                  ? "text-[#7A0D2E] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#7A0D2E]"
                  : "hover:text-[#7A0D2E]"
              }`}
            >
              Home
            </Link>

            {/* Carpets & Rugs Mega Menu Trigger */}
            <div
              className="relative py-1 group"
              onMouseEnter={() => setActiveMegaMenu("carpets")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                href="/categories/carpets-rugs"
                className={`flex items-center gap-1 font-medium tracking-wide transition-colors ${
                  pathname.includes("carpets") ? "text-[#7A0D2E] font-semibold" : "hover:text-[#7A0D2E]"
                }`}
              >
                <span>Carpets & Rugs</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#D4A437] group-hover:rotate-180 transition-transform duration-200" />
              </Link>

              {/* Mega Menu Dropdown */}
              {activeMegaMenu === "carpets" && (
                <div className="absolute top-full -left-20 w-[680px] bg-[#F7F0E6] border border-[#D4A437]/30 shadow-2xl rounded-b-md p-6 grid grid-cols-3 gap-6 z-50 animate-fadeIn">
                  <div>
                    <h4 className="font-serif text-[#7A0D2E] font-bold text-sm tracking-wide uppercase border-b border-[#D4A437]/30 pb-2 mb-3">
                      By Style
                    </h4>
                    <ul className="space-y-2 text-xs text-[#1A1A1A]">
                      <li>
                        <Link href="/shop?category=carpets-rugs&sub=Traditional+Rugs" className="hover:text-[#7A0D2E] transition-colors block">
                          Traditional Rugs
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop?category=carpets-rugs&sub=Persian-Inspired+Rugs" className="hover:text-[#7A0D2E] transition-colors block">
                          Persian-Inspired Rugs
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop?category=carpets-rugs&sub=Modern+Rugs" className="hover:text-[#7A0D2E] transition-colors block">
                          Modern & Contemporary Rugs
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop?category=carpets-rugs&sub=Area+Rugs" className="hover:text-[#7A0D2E] transition-colors block">
                          Area Rugs
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop?category=carpets-rugs&sub=Runner+Rugs" className="hover:text-[#7A0D2E] transition-colors block">
                          Hallway Runner Rugs
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-serif text-[#7A0D2E] font-bold text-sm tracking-wide uppercase border-b border-[#D4A437]/30 pb-2 mb-3">
                      By Material
                    </h4>
                    <ul className="space-y-2 text-xs text-[#1A1A1A]">
                      <li>
                        <Link href="/shop?category=carpets-rugs&sub=Wool+Carpets" className="hover:text-[#7A0D2E] transition-colors block">
                          Pure Wool Carpets
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop?category=carpets-rugs&sub=Silk+Rugs" className="hover:text-[#7A0D2E] transition-colors block">
                          Mulberry Silk Rugs
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop?category=carpets-rugs&sub=Jute+Rugs" className="hover:text-[#7A0D2E] transition-colors block">
                          Natural Braided Jute Rugs
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop?category=carpets-rugs&sub=Cotton+Rugs" className="hover:text-[#7A0D2E] transition-colors block">
                          Flatweave Cotton Dhurries
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link href="/custom-orders" className="text-[#7A0D2E] font-semibold hover:underline flex items-center gap-1">
                          <span>Custom Size Inquiry →</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Mega Menu Featured Card */}
                  <div className="bg-[#FAF5EE] p-3 rounded border border-[#D4A437]/20 flex flex-col justify-between">
                    <div className="relative h-28 w-full rounded overflow-hidden mb-2">
                      <Image
                        src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80"
                        alt="Handmade Persian Rug"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-wider text-[#D4A437] uppercase">Masterpiece</span>
                      <h5 className="font-serif text-xs font-bold text-[#1A1A1A]">Handmade Persian Rug</h5>
                      <Link
                        href="/products/handmade-persian-rug"
                        className="text-[11px] font-medium text-[#7A0D2E] hover:underline mt-1 block"
                      >
                        Explore Rug Details →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Handicrafts Mega Menu Trigger */}
            <div
              className="relative py-1 group"
              onMouseEnter={() => setActiveMegaMenu("handicrafts")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                href="/categories/handicrafts"
                className={`flex items-center gap-1 font-medium tracking-wide transition-colors ${
                  pathname.includes("handicrafts") ? "text-[#7A0D2E] font-semibold" : "hover:text-[#7A0D2E]"
                }`}
              >
                <span>Handicrafts</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#D4A437] group-hover:rotate-180 transition-transform duration-200" />
              </Link>

              {activeMegaMenu === "handicrafts" && (
                <div className="absolute top-full -left-20 w-[640px] bg-[#F7F0E6] border border-[#D4A437]/30 shadow-2xl rounded-b-md p-6 grid grid-cols-3 gap-6 z-50 animate-fadeIn">
                  <div>
                    <h4 className="font-serif text-[#7A0D2E] font-bold text-sm tracking-wide uppercase border-b border-[#D4A437]/30 pb-2 mb-3">
                      Metal & Brass
                    </h4>
                    <ul className="space-y-2 text-xs text-[#1A1A1A]">
                      <li>
                        <Link href="/shop?category=handicrafts&sub=Metal+Handicrafts" className="hover:text-[#7A0D2E] transition-colors block">
                          Hand-Engraved Brass Vases
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop?category=handicrafts&sub=Handmade+Sculptures" className="hover:text-[#7A0D2E] transition-colors block">
                          Royal Brass Elephant Pairs
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop?category=handicrafts&sub=Decorative+Art" className="hover:text-[#7A0D2E] transition-colors block">
                          Dhokra Antique Art
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop?category=handicrafts&sub=Traditional+Crafts" className="hover:text-[#7A0D2E] transition-colors block">
                          Pooja & Temple Brassware
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-serif text-[#7A0D2E] font-bold text-sm tracking-wide uppercase border-b border-[#D4A437]/30 pb-2 mb-3">
                      Wood & Art
                    </h4>
                    <ul className="space-y-2 text-xs text-[#1A1A1A]">
                      <li>
                        <Link href="/shop?category=handicrafts&sub=Wooden+Handicrafts" className="hover:text-[#7A0D2E] transition-colors block">
                          Sheesham Jaali Accent Tables
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop?category=handicrafts&sub=Handmade+Accessories" className="hover:text-[#7A0D2E] transition-colors block">
                          Carved Wooden Keepsake Boxes
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop?category=handicrafts&sub=Artisan+Collections" className="hover:text-[#7A0D2E] transition-colors block">
                          Collector Art Pieces
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link href="/bulk-orders" className="text-[#7A0D2E] font-semibold hover:underline block">
                          Corporate & Bulk Gifts →
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#FAF5EE] p-3 rounded border border-[#D4A437]/20 flex flex-col justify-between">
                    <div className="relative h-28 w-full rounded overflow-hidden mb-2">
                      <Image
                        src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80"
                        alt="Brass Sculptures"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-wider text-[#D4A437] uppercase">Featured Brass</span>
                      <h5 className="font-serif text-xs font-bold text-[#1A1A1A]">Elephant Pair Figurine</h5>
                      <Link
                        href="/products/royal-brass-elephant-pair"
                        className="text-[11px] font-medium text-[#7A0D2E] hover:underline mt-1 block"
                      >
                        View Craftsmanship →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Home Decor Mega Menu Trigger */}
            <div
              className="relative py-1 group"
              onMouseEnter={() => setActiveMegaMenu("homedecor")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link
                href="/categories/home-decor"
                className={`flex items-center gap-1 font-medium tracking-wide transition-colors ${
                  pathname.includes("home-decor") ? "text-[#7A0D2E] font-semibold" : "hover:text-[#7A0D2E]"
                }`}
              >
                <span>Home Decor</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#D4A437] group-hover:rotate-180 transition-transform duration-200" />
              </Link>

              {activeMegaMenu === "homedecor" && (
                <div className="absolute top-full -left-20 w-[640px] bg-[#F7F0E6] border border-[#D4A437]/30 shadow-2xl rounded-b-md p-6 grid grid-cols-3 gap-6 z-50 animate-fadeIn">
                  <div>
                    <h4 className="font-serif text-[#7A0D2E] font-bold text-sm tracking-wide uppercase border-b border-[#D4A437]/30 pb-2 mb-3">
                      Soft Furnishings
                    </h4>
                    <ul className="space-y-2 text-xs text-[#1A1A1A]">
                      <li>
                        <Link href="/shop?category=home-decor&sub=Cushion+Covers" className="hover:text-[#7A0D2E] transition-colors block">
                          Hand-Embroidered Cushions
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop?category=home-decor&sub=Table+Runners" className="hover:text-[#7A0D2E] transition-colors block">
                          Block Printed Table Runners
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop?category=home-decor&sub=Home+Textiles" className="hover:text-[#7A0D2E] transition-colors block">
                          Woven Throws & Bedspreads
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-serif text-[#7A0D2E] font-bold text-sm tracking-wide uppercase border-b border-[#D4A437]/30 pb-2 mb-3">
                      Accents & Lighting
                    </h4>
                    <ul className="space-y-2 text-xs text-[#1A1A1A]">
                      <li>
                        <Link href="/shop?category=home-decor&sub=Wall+Hangings" className="hover:text-[#7A0D2E] transition-colors block">
                          Handmade Tapestry Hangings
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop?category=home-decor&sub=Decorative+Accessories" className="hover:text-[#7A0D2E] transition-colors block">
                          Perforated Moroccan Lanterns
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop?category=home-decor&sub=Gift+Collections" className="hover:text-[#7A0D2E] transition-colors block">
                          Handcrafted Gift Sets
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#FAF5EE] p-3 rounded border border-[#D4A437]/20 flex flex-col justify-between">
                    <div className="relative h-28 w-full rounded overflow-hidden mb-2">
                      <Image
                        src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"
                        alt="Home Decor Accents"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold tracking-wider text-[#D4A437] uppercase">New Arrival</span>
                      <h5 className="font-serif text-xs font-bold text-[#1A1A1A]">Moroccan Brass Lantern</h5>
                      <Link
                        href="/products/moroccan-lattice-brass-lantern"
                        className="text-[11px] font-medium text-[#7A0D2E] hover:underline mt-1 block"
                      >
                        Shop Home Accents →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/shop?badge=New"
              className={`font-medium tracking-wide transition-colors ${
                pathname === "/new-arrivals" ? "text-[#7A0D2E] font-semibold" : "hover:text-[#7A0D2E]"
              }`}
            >
              New Arrivals
            </Link>

            <Link
              href="/about"
              className={`font-medium tracking-wide transition-colors ${
                pathname === "/about" ? "text-[#7A0D2E] font-semibold" : "hover:text-[#7A0D2E]"
              }`}
            >
              About Us
            </Link>

            {/* Highlighted Technology Services Link */}
            <Link
              href="/services"
              className={`font-semibold tracking-wide transition-all inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs shadow-xs ${
                pathname === "/services"
                  ? "bg-[#0D2D5B] text-[#D4A437] border-[#D4A437]"
                  : "border-[#D4A437]/70 text-[#0D2D5B] bg-[#FAF5EE] hover:bg-[#0D2D5B] hover:text-[#D4A437] hover:border-[#D4A437]"
              }`}
            >
              <span>Tech Services</span>
              <span className="text-[9px] bg-[#D4A437] text-[#1A1A1A] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                New
              </span>
            </Link>
          </nav>

          {/* Right Actions: Search, Account, Wishlist, Cart */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#1A1A1A] hover:text-[#7A0D2E] transition-colors relative"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Link / Dropdown */}
            <div className="relative group">
              <Link
                href={user ? "/account" : "/login"}
                className="p-2 text-[#1A1A1A] hover:text-[#7A0D2E] transition-colors flex items-center gap-1.5"
                aria-label="User Account"
              >
                {user?.image ? (
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-[#D4A437]">
                    <Image src={user.image} alt={user.name} width={24} height={24} className="object-cover" />
                  </div>
                ) : (
                  <UserIcon className="w-5 h-5" />
                )}
                {user && (
                  <span className="hidden xl:inline text-xs font-medium text-[#1A1A1A] max-w-[100px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                )}
              </Link>
            </div>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-2 text-[#1A1A1A] hover:text-[#7A0D2E] transition-colors relative"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#7A0D2E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-2 text-[#1A1A1A] hover:text-[#7A0D2E] transition-colors relative flex items-center"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-[#7A0D2E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </button>
          </div>
        </div>

        {/* Global Search Bar (Expands smoothly when clicked) */}
        {isSearchOpen && (
          <div className="border-t border-[#D4A437]/20 bg-[#FAF5EE] py-3 px-4 sm:px-6 transition-all duration-300">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-[#7A0D2E]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search luxury carpets, brass elephants, cushion covers, materials..."
                className="w-full bg-transparent border-b border-[#D4A437] py-1.5 px-2 text-sm text-[#1A1A1A] placeholder-neutral-500 focus:outline-none focus:border-[#7A0D2E]"
                autoFocus
              />
              <button
                type="submit"
                className="bg-[#7A0D2E] text-white text-xs px-4 py-2 rounded-full font-semibold hover:bg-[#6B0B28] transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-neutral-500 hover:text-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* 3. MOBILE SLIDE-OUT NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-sm bg-[#F7F0E6] h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-[#D4A437]/30 bg-[#7A0D2E] text-white">
              <BrandLogo variant="footer" size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-[#F7F0E6] hover:text-[#D4A437]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="py-4 px-6 space-y-4 font-sans text-sm">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-[#1A1A1A] font-medium py-1.5 border-b border-black/5 hover:text-[#7A0D2E]"
              >
                Home
              </Link>

              {/* Highlighted Tech Services Card for Mobile */}
              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block p-3.5 rounded-xl border transition-all ${
                  pathname === "/services"
                    ? "bg-[#0D2D5B] border-[#D4A437] text-white shadow-md"
                    : "bg-white border-[#D4A437]/70 text-[#0D2D5B] hover:bg-[#0D2D5B] hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm">Tech & Digital Services</span>
                    <span className="text-[9px] bg-[#D4A437] text-[#1A1A1A] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      New
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#D4A437]" />
                </div>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Websites, Shopify, SEO, Digital Marketing & Custom Software
                </p>
              </Link>

              <div className="border-b border-black/5 pb-2">
                <Link
                  href="/categories/carpets-rugs"
                  className="block font-semibold text-[#7A0D2E] py-1"
                >
                  Carpets & Rugs
                </Link>
                <div className="pl-3 space-y-1 text-xs text-neutral-600 mt-1">
                  <Link href="/shop?category=carpets-rugs&sub=Traditional+Rugs" className="block py-1 hover:text-[#7A0D2E]">Traditional Rugs</Link>
                  <Link href="/shop?category=carpets-rugs&sub=Persian-Inspired+Rugs" className="block py-1 hover:text-[#7A0D2E]">Persian-Inspired Rugs</Link>
                  <Link href="/shop?category=carpets-rugs&sub=Wool+Carpets" className="block py-1 hover:text-[#7A0D2E]">Wool Carpets</Link>
                  <Link href="/shop?category=carpets-rugs&sub=Jute+Rugs" className="block py-1 hover:text-[#7A0D2E]">Natural Jute Rugs</Link>
                  <Link href="/custom-orders" className="block py-1 text-[#7A0D2E] font-medium">Custom Size Rug Enquiry</Link>
                </div>
              </div>

              <div className="border-b border-black/5 pb-2">
                <Link
                  href="/categories/handicrafts"
                  className="block font-semibold text-[#7A0D2E] py-1"
                >
                  Handicrafts
                </Link>
                <div className="pl-3 space-y-1 text-xs text-neutral-600 mt-1">
                  <Link href="/shop?category=handicrafts&sub=Metal+Handicrafts" className="block py-1 hover:text-[#7A0D2E]">Brass Vases & Metal Art</Link>
                  <Link href="/shop?category=handicrafts&sub=Handmade+Sculptures" className="block py-1 hover:text-[#7A0D2E]">Elephant Sculptures</Link>
                  <Link href="/shop?category=handicrafts&sub=Wooden+Handicrafts" className="block py-1 hover:text-[#7A0D2E]">Sheesham Wood Decor</Link>
                </div>
              </div>

              <div className="border-b border-black/5 pb-2">
                <Link
                  href="/categories/home-decor"
                  className="block font-semibold text-[#7A0D2E] py-1"
                >
                  Home Decor
                </Link>
                <div className="pl-3 space-y-1 text-xs text-neutral-600 mt-1">
                  <Link href="/shop?category=home-decor&sub=Cushion+Covers" className="block py-1 hover:text-[#7A0D2E]">Embroidered Cushion Covers</Link>
                  <Link href="/shop?category=home-decor&sub=Wall+Hangings" className="block py-1 hover:text-[#7A0D2E]">Woven Tapestry Wall Hangings</Link>
                  <Link href="/shop?category=home-decor&sub=Decorative+Accessories" className="block py-1 hover:text-[#7A0D2E]">Moroccan Brass Lanterns</Link>
                </div>
              </div>

              <Link
                href="/shop?badge=New"
                className="block text-[#1A1A1A] font-medium py-1.5 border-b border-black/5 hover:text-[#7A0D2E]"
              >
                New Arrivals
              </Link>

              <Link
                href="/about"
                className="block text-[#1A1A1A] font-medium py-1.5 border-b border-black/5 hover:text-[#7A0D2E]"
              >
                Our Story & Artisans
              </Link>

              <Link
                href="/craftsmanship"
                className="block text-[#1A1A1A] font-medium py-1.5 border-b border-black/5 hover:text-[#7A0D2E]"
              >
                Our Craftsmanship
              </Link>

              <Link
                href="/bulk-orders"
                className="block text-[#1A1A1A] font-medium py-1.5 border-b border-black/5 hover:text-[#7A0D2E]"
              >
                Bulk & Wholesale Enquiries
              </Link>
            </div>

            {/* Bottom Currency & User info */}
            <div className="mt-auto p-4 bg-[#EDE0CD] border-t border-[#D4A437]/30 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-neutral-700">Display Currency:</span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                  className="bg-white border border-[#D4A437] rounded px-2 py-1 text-xs font-semibold"
                >
                  <option value="USD">USD ($)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>

              {user ? (
                <div className="flex items-center justify-between text-xs pt-2 border-t border-black/10">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-[#7A0D2E]" />
                    <span className="font-semibold text-[#1A1A1A]">{user.name}</span>
                  </div>
                  <button onClick={logout} className="text-[#7A0D2E] hover:underline flex items-center gap-1">
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    href="/login"
                    className="text-center py-2 bg-[#7A0D2E] text-white rounded text-xs font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="text-center py-2 border border-[#7A0D2E] text-[#7A0D2E] rounded text-xs font-semibold"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

