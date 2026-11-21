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
  Bell,
} from "lucide-react";
import { useAuth } from "@/lib/auth/authContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

        {/* Bottom Storefront & User Links */}
        <div className="p-4 border-t border-[#D4A437]/20 space-y-2 text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded bg-white/5 hover:bg-white/15 text-[#D4A437] transition-colors"
          >
            <span>View Public Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center justify-between pt-2 text-[11px] text-white/70">
            <span className="truncate max-w-[120px]">{user?.email || "admin@crafttech.com"}</span>
            <button onClick={logout} className="text-red-300 hover:text-red-100 flex items-center gap-1">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
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
            <span className="hidden sm:inline bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              System Live
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
            <div className="w-8 h-8 rounded-full bg-[#7A0D2E] text-white font-bold text-xs flex items-center justify-center">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}

