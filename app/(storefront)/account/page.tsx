"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  User as UserIcon,
  MapPin,
  Heart,
  LogOut,
  ExternalLink,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/lib/auth/authContext";
import { dbService } from "@/lib/database/db";
import { useCurrency } from "@/lib/currency/currencyContext";

export default function AccountPage() {
  const { user, logout, isAdmin } = useAuth();
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "addresses">("orders");

  const orders = dbService.getOrders();

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
        <div className="bg-white/85 rounded-xl border border-[#D4A437]/40 p-8 shadow-sm space-y-5">
          <div className="w-14 h-14 rounded-full bg-[#FAF5EE] border border-[#D4A437]/50 flex items-center justify-center mx-auto text-[#7A0D2E]">
            <UserIcon className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-widest text-[#D4A437] uppercase">
              Private Patron Portal
            </span>
            <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              Member Sign-In Required
            </h1>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Please authenticate your patron account to securely view order history, delivery tracking, and personal credentials.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/login"
              className="bg-[#7A0D2E] text-white text-xs font-semibold py-3 px-6 rounded-full hover:bg-[#6B0B28] transition-colors uppercase tracking-wider shadow-xs"
            >
              Sign In to Your Account
            </Link>
            <Link
              href="/signup"
              className="border border-[#7A0D2E] text-[#7A0D2E] text-xs font-semibold py-3 px-6 rounded-full hover:bg-[#FAF5EE] transition-colors uppercase tracking-wider"
            >
              Create New Patron Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Account Header */}
      <div className="bg-white/80 rounded-xl border border-[#D4A437]/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4A437] shadow-sm bg-[#FAF5EE]">
            {user?.image ? (
              <Image src={user.image} alt={user.name} fill className="object-cover" />
            ) : (
              <UserIcon className="w-8 h-8 text-[#7A0D2E] m-auto mt-4" />
            )}
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#D4A437] uppercase">
              CRAFTTECH Member Patron
            </span>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">
              {user?.name || "Sarah Montgomery"}
            </h1>
            <p className="text-xs text-neutral-500">{user?.email || "sarah.m@crafttechglobal.com"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="bg-[#D4A437] text-[#1A1A1A] font-semibold text-xs px-4 py-2 rounded-full hover:bg-white border border-[#D4A437] transition-all"
            >
              Open Admin Dashboard
            </Link>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-red-700 font-semibold px-4 py-2 rounded-full border border-neutral-300 hover:border-red-300"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs and Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full text-left p-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
              activeTab === "orders"
                ? "bg-[#7A0D2E] text-white shadow-sm"
                : "bg-white/70 text-neutral-700 hover:bg-[#FAF5EE] border border-[#D4A437]/20"
            }`}
          >
            <span className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>Orders & Itineraries</span>
            </span>
            <span className="text-[11px] opacity-75">{orders.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full text-left p-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
              activeTab === "profile"
                ? "bg-[#7A0D2E] text-white shadow-sm"
                : "bg-white/70 text-neutral-700 hover:bg-[#FAF5EE] border border-[#D4A437]/20"
            }`}
          >
            <span className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              <span>Patron Profile</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`w-full text-left p-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
              activeTab === "addresses"
                ? "bg-[#7A0D2E] text-white shadow-sm"
                : "bg-white/70 text-neutral-700 hover:bg-[#FAF5EE] border border-[#D4A437]/20"
            }`}
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Saved Delivery Addresses</span>
            </span>
          </button>

          <Link
            href="/wishlist"
            className="w-full text-left p-3 rounded-lg text-xs font-semibold flex items-center justify-between bg-white/70 text-neutral-700 hover:bg-[#FAF5EE] border border-[#D4A437]/20 transition-colors block"
          >
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#7A0D2E]" />
              <span>My Wishlist</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 opacity-50" />
          </Link>
        </aside>

        {/* Content Section */}
        <div className="lg:col-span-9 space-y-6">
          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#D4A437]/25">
                <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                  Order History & Live Transit
                </h3>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 bg-white/60 rounded-xl border border-dashed border-[#D4A437] space-y-2">
                  <p className="font-serif text-base text-neutral-800">No orders placed yet.</p>
                  <Link href="/shop" className="text-xs text-[#7A0D2E] font-semibold underline">
                    Discover Collection →
                  </Link>
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white/80 rounded-xl border border-[#D4A437]/30 p-5 sm:p-6 space-y-4 shadow-2xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100 text-xs">
                      <div className="space-y-0.5">
                        <span className="font-serif font-bold text-sm text-[#7A0D2E]">
                          {ord.orderNumber}
                        </span>
                        <span className="text-neutral-500 block text-[11px]">
                          Placed on {new Date(ord.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            ord.status === "DELIVERED"
                              ? "bg-green-100 text-green-800"
                              : ord.status === "SHIPPED"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {ord.status}
                        </span>
                        <span className="font-bold text-[#1A1A1A]">{formatPrice(ord.total)}</span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded overflow-hidden border">
                              <Image src={it.image} alt={it.name} fill className="object-cover" />
                            </div>
                            <div>
                              <span className="font-semibold text-[#1A1A1A] block">{it.name}</span>
                              <span className="text-neutral-500 text-[11px]">
                                Qty: {it.quantity} {it.size && `• ${it.size}`}
                              </span>
                            </div>
                          </div>
                          <span className="font-semibold">{formatPrice(it.price * it.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tracking details */}
                    {ord.trackingNumber && (
                      <div className="bg-[#FAF5EE] p-3 rounded flex flex-wrap items-center justify-between text-xs text-neutral-700 gap-2 border border-[#D4A437]/20">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-[#7A0D2E]" />
                          <span>
                            Carrier: <strong>{ord.carrier}</strong> | Tracking:{" "}
                            <strong className="font-mono text-[#0D2D5B]">{ord.trackingNumber}</strong>
                          </span>
                        </div>
                        <span className="text-green-800 font-semibold text-[11px]">In Transit</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="bg-white/80 rounded-xl border border-[#D4A437]/30 p-6 space-y-4 shadow-2xs">
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-neutral-100 pb-2">
                Personal Credentials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-neutral-600 block mb-1">Full Name</label>
                  <input
                    type="text"
                    readOnly
                    value={user?.name || ""}
                    className="w-full bg-[#FAF5EE] border border-neutral-300 rounded p-2 text-neutral-700"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-600 block mb-1">Email Address</label>
                  <input
                    type="email"
                    readOnly
                    value={user?.email || ""}
                    className="w-full bg-[#FAF5EE] border border-neutral-300 rounded p-2 text-neutral-700"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-600 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    readOnly
                    value={user?.phone || "Not configured"}
                    className="w-full bg-[#FAF5EE] border border-neutral-300 rounded p-2 text-neutral-700"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-600 block mb-1">Account Standing</label>
                  <span className="inline-block px-3 py-1.5 bg-green-100 text-green-800 rounded font-semibold text-xs mt-0.5">
                    Verified Global Patron
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === "addresses" && (
            <div className="bg-white/80 rounded-xl border border-[#D4A437]/30 p-6 space-y-4 shadow-2xs">
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-neutral-100 pb-2">
                Saved Delivery Addresses
              </h3>
              <div className="p-4 bg-[#FAF5EE] rounded-lg border border-[#D4A437]/40 space-y-1 text-xs">
                <span className="font-bold text-[#7A0D2E] text-[10px] uppercase block tracking-wider">
                  Default Residential Destination
                </span>
                <p className="font-bold text-[#1A1A1A]">{user?.name || "Patron Member"}</p>
                <p className="text-neutral-600">No saved address configured yet.</p>
                <p className="text-neutral-500 text-[11px]">Your delivery address will be saved securely upon checkout.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

