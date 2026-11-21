"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from "lucide-react";
import { useCart } from "@/lib/cart/cartContext";
import { useCurrency } from "@/lib/currency/currencyContext";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    discount,
    finalTotal,
    coupon,
    applyCoupon,
    removeCoupon,
  } = useCart();
  const { formatPrice } = useCurrency();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{ text: string; success: boolean } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback({ text: res.message, success: res.success });
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-5">
        <div className="w-20 h-20 bg-[#FAF5EE] text-[#7A0D2E] rounded-full flex items-center justify-center mx-auto border border-[#D4A437]/30">
          <ShoppingBag className="w-10 h-10 opacity-70" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">Your Cart is Empty</h1>
        <p className="text-sm text-neutral-600 max-w-md mx-auto">
          Explore our collection of authentic handcrafted carpets, brass artifacts, and royal textiles.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-[#7A0D2E] text-white text-xs font-semibold px-8 py-3 rounded-full hover:bg-[#6B0B28] transition-colors shadow-md"
        >
          Explore Full Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-[#D4A437]/30 flex items-baseline justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
            CRAFTTECH GLOBAL
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            Shopping Cart
          </h1>
        </div>
        <Link href="/shop" className="text-xs font-semibold text-[#7A0D2E] hover:underline">
          Continue Shopping →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CART ITEMS TABLE (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white/80 rounded-lg border border-[#D4A437]/30 divide-y divide-neutral-100 overflow-hidden shadow-xs">
            {items.map((item) => (
              <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-center">
                {/* Thumbnail */}
                <div className="relative w-24 h-24 rounded overflow-hidden flex-shrink-0 bg-neutral-100 border border-neutral-200">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-serif text-base font-bold text-[#1A1A1A] hover:text-[#7A0D2E] transition-colors"
                  >
                    {item.name}
                  </Link>
                  <div className="text-xs text-neutral-500">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.color && <span className="ml-3">Color: {item.color}</span>}
                  </div>
                  <div className="text-xs font-bold text-[#7A0D2E] pt-1">
                    {formatPrice(item.price)} each
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-[#D4A437]/40 rounded bg-white">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1.5 hover:text-[#7A0D2E]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1.5 hover:text-[#7A0D2E]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[90px]">
                  <span className="font-bold text-sm text-[#1A1A1A] block">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-neutral-400 hover:text-red-700 text-xs flex items-center gap-1 mt-1 justify-end"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ORDER SUMMARY (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FAF5EE] rounded-xl border border-[#D4A437]/40 p-6 space-y-5 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#D4A437]/20 pb-3">
              Order Summary
            </h3>

            {/* Price lines */}
            <div className="space-y-2 text-xs text-neutral-700">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} items)</span>
                <span className="font-semibold text-[#1A1A1A]">{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-800">
                  <span>Promotional Discount</span>
                  <span className="font-semibold">-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Insured Global Shipping</span>
                <span className="text-green-800 font-semibold">Complimentary</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Taxes & Duties</span>
                <span className="font-semibold">Included</span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#7A0D2E] pt-3 border-t border-[#D4A437]/30">
                <span>Final Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="pt-2">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="flex-1 bg-white border border-[#D4A437]/50 rounded px-3 py-2 text-xs uppercase focus:outline-none focus:border-[#7A0D2E]"
                />
                <button
                  type="submit"
                  className="bg-[#0D2D5B] text-white text-xs px-4 py-2 rounded font-semibold hover:bg-[#0A244A]"
                >
                  Apply
                </button>
              </form>

              {couponFeedback && (
                <p
                  className={`text-[11px] font-medium mt-1.5 ${
                    couponFeedback.success ? "text-green-800" : "text-red-700"
                  }`}
                >
                  {couponFeedback.text}
                </p>
              )}

              {coupon && (
                <div className="flex items-center justify-between text-xs bg-green-50 p-2 rounded border border-green-200 mt-2">
                  <span className="text-green-800 font-medium">Coupon {coupon.code} active</span>
                  <button onClick={removeCoupon} className="text-xs text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full bg-[#7A0D2E] text-white py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#6B0B28] transition-colors shadow-lg active:scale-95"
            >
              <span>Proceed to Luxury Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="text-center text-[10px] text-neutral-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4A437]" />
              <span>Certified SSL 256-Bit Encrypted Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

