"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart/cartContext";
import { useCurrency } from "@/lib/currency/currencyContext";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    subtotal,
    discount,
    finalTotal,
    coupon,
    applyCoupon,
    removeCoupon,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
  } = useCart();
  const { formatPrice } = useCurrency();

  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ text: string; success: boolean } | null>(null);

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMsg({ text: res.message, success: res.success });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F0E6] shadow-2xl flex flex-col border-l border-[#D4A437]/40">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#7A0D2E] text-white flex items-center justify-between border-b border-[#D4A437]/30">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D4A437]" />
              <h2 className="font-serif text-lg font-bold tracking-wide">
                Your Shopping Cart ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1 text-[#F7F0E6] hover:text-[#D4A437] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EDE0CD] text-[#7A0D2E] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#1A1A1A]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                  Explore our curated collections of handmade Persian rugs, brass decor, and luxury home accents.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="inline-block bg-[#7A0D2E] text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-[#6B0B28] transition-colors"
                >
                  Start Exploring Collection
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white/70 rounded border border-[#D4A437]/20 relative shadow-sm"
                >
                  <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0 bg-neutral-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between pr-4">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="font-serif text-xs sm:text-sm font-bold text-[#1A1A1A] hover:text-[#7A0D2E] line-clamp-1"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.color && <span className="ml-2">Color: {item.color}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-xs text-[#7A0D2E]">
                        {formatPrice(item.price)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#D4A437]/40 rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:text-[#7A0D2E]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:text-[#7A0D2E]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-400 hover:text-red-700 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-[#EDE0CD] border-t border-[#D4A437]/30 space-y-3">
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon Code (try HERITAGE10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-white border border-[#D4A437]/50 px-3 py-1.5 text-xs rounded uppercase focus:outline-none focus:border-[#7A0D2E]"
                />
                <button
                  type="submit"
                  className="bg-[#0D2D5B] text-white text-xs px-3 py-1.5 rounded font-semibold hover:bg-[#0A244A] transition-colors"
                >
                  Apply
                </button>
              </form>

              {couponMsg && (
                <p
                  className={`text-[11px] font-medium ${
                    couponMsg.success ? "text-green-800" : "text-red-700"
                  }`}
                >
                  {couponMsg.text}
                </p>
              )}

              {coupon && (
                <div className="flex items-center justify-between text-xs bg-green-50 p-2 rounded border border-green-200">
                  <span className="text-green-800 font-medium">Coupon {coupon.code} active</span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-[#1A1A1A] pt-2 border-t border-[#D4A437]/20">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-800">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-neutral-600">Global Courier Shipping</span>
                  <span className="text-green-800 font-semibold">Complimentary</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-black/10 text-[#7A0D2E]">
                  <span>Total Due</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full bg-[#7A0D2E] text-white py-3 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#6B0B28] transition-colors shadow-md"
                >
                  <span>Proceed to Luxury Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-600 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4A437]" />
                  <span>Bank-Grade 256-bit Encrypted Checkout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

