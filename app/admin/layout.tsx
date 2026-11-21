"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Archive,
  Ticket,
  MessageSquare,
  CreditCard,
  BarChart3,
  Settings,
  ExternalLink,
  Menu,
  X,
  LogOut,
  Lock,
  ShieldCheck,
  KeyRound,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth/authContext";
import BrandLogo from "@/components/ui/BrandLogo";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, login, logout, isLoading, isAdmin } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Admin Login State for unauthenticated visitors
  const [adminEmail, setAdminEmail] = useState("admin@crafttechglobal.com");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsSubmitting(true);
    const result = await login(adminEmail, adminPassword);
    setIsSubmitting(false);
    if (!result.success) {
      setLoginError(result.error || "Authentication failed. Invalid administrator credentials.");
    }
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF5EE] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-[#7A0D2E] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-serif text-[#7A0D2E] tracking-wider uppercase font-semibold">
            Verifying Credentials...
          </p>
        </div>
      </div>
    );
  }

  // 2. Security Barrier: If visitor is NOT authenticated as an Administrator
  if (!user || user.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-[#0D2D5B] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border-2 border-[#D4A437]/50 shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-3">
            <BrandLogo variant="full" size="md" className="mx-auto" />

            <div className="inline-flex items-center gap-1.5 bg-[#FAF5EE] border border-[#D4A437]/40 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-[#7A0D2E] uppercase">
              <Lock className="w-3 h-3 text-[#7A0D2E]" />
              <span>Restricted Access Control</span>
            </div>

            <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Administrative Portal
            </h1>
            <p className="text-xs text-neutral-600 leading-relaxed">
              This console manages proprietary catalogs, customer orders, and financial records. Authorized security credentials are required.
            </p>
          </div>

          {loginError && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs border border-red-200 text-center font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold block mb-1 text-neutral-800">
                Administrator Email
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@crafttechglobal.com"
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded-lg p-3 text-neutral-900 focus:outline-none focus:border-[#7A0D2E]"
              />
            </div>

            <div>
              <label className="font-semibold block mb-1 text-neutral-800">
                Security Key / Password
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter administrator password"
                className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded-lg p-3 text-neutral-900 focus:outline-none focus:border-[#7A0D2E]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#7A0D2E] text-white py-3 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#6B0B28] transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4 text-[#D4A437]" />
              <span>{isSubmitting ? "Authenticating..." : "Unlock Management Console"}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-neutral-100 text-center space-y-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A0D2E] hover:underline"
            >
              <span>Return to Public Storefront</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <p className="text-[10px] text-neutral-400">
              End-to-end encrypted session • All login attempts logged & verified
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authorized Administrator Console
  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Categories", href: "/admin/categories", icon: Layers },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Inventory", href: "/admin/inventory", icon: Archive },
    { label: "Coupons", href: "/admin/coupons", icon: Ticket },
    { label: "Enquiries & Custom", href: "/admin/enquiries", icon: MessageSquare },
    { label: "Payments", href: "/admin/payments", icon: CreditCard },
    { label: "Reports & CSV", href: "/admin/reports", icon: BarChart3 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#1A1A1A] flex flex-col md:flex-row">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0D2D5B] text-[#F7F0E6] border-r-2 border-[#D4A437]/40 shadow-xl flex-shrink-0">
        {/* Brand header */}
        <div className="p-5 border-b border-[#D4A437]/20 flex items-center gap-3.5">
          <div className="relative w-11 h-9 flex-shrink-0">
            <Image
              src="/images/brand/emblem.png"
              alt="CRAFTTECH GLOBAL Emblem"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="font-serif font-bold text-base tracking-wider text-white block leading-tight">
              CRAFTTECH
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#D4A437] font-semibold uppercase block">
              ADMIN CONSOLE
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-md font-medium transition-all ${
                  isActive
                    ? "bg-[#7A0D2E] text-white font-semibold shadow-sm border-l-4 border-[#D4A437]"
                    : "text-[#F7F0E6]/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#D4A437]" : "opacity-75"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User bar & Logout */}
        <div className="p-4 border-t border-[#D4A437]/20 flex items-center justify-between text-xs bg-black/15">
          <div className="flex items-center gap-2 truncate">
            <div className="w-7 h-7 rounded-full bg-[#D4A437] text-[#0D2D5B] font-bold text-[11px] flex items-center justify-center flex-shrink-0">
              AD
            </div>
            <div className="truncate">
              <span className="block font-semibold truncate text-[11px]">Administrator</span>
              <span className="block text-[10px] text-white/60 truncate">
                {user.email}
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-1.5 text-white/70 hover:text-red-400 transition-colors"
            title="Secure Logout"
            aria-label="Secure Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* MOBILE TOPBAR & DRAWER */}
      <div className="md:hidden bg-[#0D2D5B] text-white p-4 flex items-center justify-between border-b border-[#D4A437]/30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-7 relative flex-shrink-0">
            <Image
              src="/images/brand/emblem.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-serif font-bold text-sm tracking-wider">CRAFTTECH ADMIN</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1 text-white"
          aria-label="Toggle Menu"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isSidebarOpen && (
        <div className="md:hidden bg-[#0D2D5B] text-white p-4 space-y-2 border-b border-[#D4A437]/30">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className="block py-2 px-3 rounded text-xs hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/"
            className="block py-2 px-3 rounded text-xs text-[#D4A437] font-semibold border-t border-white/10 mt-2"
          >
            Go to Storefront →
          </Link>
          <button
            onClick={logout}
            className="w-full text-left py-2 px-3 rounded text-xs text-red-300 hover:bg-white/10"
          >
            Sign Out
          </button>
        </div>
      )}

      {/* MAIN ADMIN CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-[#D4A437]/25 px-6 py-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-base sm:text-lg text-[#1A1A1A]">
              Master Management Console
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              <ShieldCheck className="w-3 h-3 text-green-700" />
              <span>Encrypted Session</span>
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <Link
              href="/"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#7A0D2E] hover:underline"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={logout}
              className="bg-[#FAF5EE] border border-[#D4A437]/40 text-[#7A0D2E] font-semibold px-3 py-1 rounded-full text-xs hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              Lock Console
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
