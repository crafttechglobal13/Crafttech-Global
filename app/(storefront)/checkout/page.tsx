"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Globe,
  Check,
} from "lucide-react";
import { useCart } from "@/lib/cart/cartContext";
import { useCurrency } from "@/lib/currency/currencyContext";
import { useAuth } from "@/lib/auth/authContext";
import { dbService } from "@/lib/database/db";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, finalTotal, clearCart } = useCart();
  const { formatPrice, currency } = useCurrency();
  const { user } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Shipping & Info, 2: Payment, 3: Review
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || "Sarah Montgomery",
    email: user?.email || "sarah.m@crafttechglobal.com",
    phone: user?.phone || "+1 (555) 382-9012",
    street: "742 Evergreen Terrace",
    apartment: "Penthouse B",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
    shippingMethod: "EXPRESS",
    paymentMethod: "STRIPE" as "STRIPE" | "RAZORPAY" | "COD",
  });

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold">Your cart is empty</h1>
        <p className="text-xs text-neutral-600">Please add items to your cart before proceeding to checkout.</p>
        <Link href="/shop" className="bg-[#7A0D2E] text-white text-xs px-6 py-2.5 rounded-full inline-block font-semibold">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate gateway verification & database transaction
    setTimeout(() => {
      const order = dbService.createOrder({
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        currency,
        subtotal,
        discount,
        shippingFee: 0,
        total: finalTotal,
        status: "CONFIRMED",
        paymentMethod: formData.paymentMethod,
        paymentStatus: formData.paymentMethod === "COD" ? "PENDING" : "PAID",
        shippingAddress: {
          fullName: formData.fullName,
          street: formData.street,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
        },
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          size: i.size,
          color: i.color,
          image: i.image,
          sku: i.sku,
        })),
        trackingNumber: `EXP-${Math.floor(100000 + Math.random() * 900000)}GL`,
        carrier: "DHL Express Worldwide",
      });

      clearCart();
      setIsProcessing(false);
      router.push(`/order-success?orderId=${order.orderNumber}`);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Checkout Steps Progress */}
      <div className="max-w-2xl mx-auto flex items-center justify-between text-xs font-semibold pb-6 border-b border-[#D4A437]/30">
        <div className={`flex items-center gap-2 ${step >= 1 ? "text-[#7A0D2E]" : "text-neutral-400"}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 1 ? "bg-[#7A0D2E] text-white" : "bg-neutral-200"}`}>
            1
          </div>
          <span>Shipping & Details</span>
        </div>
        <div className="w-12 h-0.5 bg-neutral-200" />
        <div className={`flex items-center gap-2 ${step >= 2 ? "text-[#7A0D2E]" : "text-neutral-400"}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 2 ? "bg-[#7A0D2E] text-white" : "bg-neutral-200"}`}>
            2
          </div>
          <span>Payment Method</span>
        </div>
        <div className="w-12 h-0.5 bg-neutral-200" />
        <div className={`flex items-center gap-2 ${step === 3 ? "text-[#7A0D2E]" : "text-neutral-400"}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step === 3 ? "bg-[#7A0D2E] text-white" : "bg-neutral-200"}`}>
            3
          </div>
          <span>Review & Place</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CHECKOUT FORMS (8 Cols) */}
        <div className="lg:col-span-8 bg-white/80 p-6 sm:p-8 rounded-xl border border-[#D4A437]/30 shadow-sm space-y-6">
          {/* STEP 1: CUSTOMER & SHIPPING ADDRESS */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A] border-b border-neutral-200 pb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#7A0D2E]" />
                <span>Customer Details & Shipping Address</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Country / Region *</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E] font-medium"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="India">India</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Switzerland">Switzerland</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="font-semibold text-neutral-800 block mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Apartment, Suite, Unit</label>
                  <input
                    type="text"
                    value={formData.apartment}
                    onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">State / Province / Region *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">Postal / ZIP Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded p-2.5 focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>
              </div>

              {/* Shipping Method Option */}
              <div className="pt-4 border-t border-neutral-200 space-y-2">
                <span className="font-serif font-bold text-xs text-[#7A0D2E] uppercase tracking-wider block">
                  Delivery Method
                </span>
                <label className="flex items-center justify-between p-3 rounded border-2 border-[#7A0D2E] bg-[#FAF5EE] cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input type="radio" checked readOnly className="accent-[#7A0D2E]" />
                    <div>
                      <span className="font-semibold text-xs text-[#1A1A1A] block">
                        Insured Express Air Courier (DHL / FedEx / Blue Dart)
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        Estimated transit: 3–6 business days worldwide
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-green-800 uppercase">Complimentary</span>
                </label>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-[#7A0D2E] text-white py-3 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#6B0B28]"
              >
                <span>Continue to Payment Method</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A] border-b border-neutral-200 pb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#7A0D2E]" />
                <span>Select Payment Gateway</span>
              </h2>

              <div className="space-y-3">
                {/* Stripe */}
                <label
                  onClick={() => setFormData({ ...formData, paymentMethod: "STRIPE" })}
                  className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === "STRIPE"
                      ? "border-[#7A0D2E] bg-[#FAF5EE]"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === "STRIPE"}
                    onChange={() => {}}
                    className="accent-[#7A0D2E] mt-1"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-[#1A1A1A]">
                        Stripe (Credit / Debit Cards International)
                      </span>
                      <span className="text-xs font-semibold text-indigo-700">stripe</span>
                    </div>
                    <p className="text-xs text-neutral-600">
                      Supports Visa, Mastercard, American Express, Apple Pay from all global territories.
                    </p>
                  </div>
                </label>

                {/* Razorpay */}
                <label
                  onClick={() => setFormData({ ...formData, paymentMethod: "RAZORPAY" })}
                  className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === "RAZORPAY"
                      ? "border-[#7A0D2E] bg-[#FAF5EE]"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === "RAZORPAY"}
                    onChange={() => {}}
                    className="accent-[#7A0D2E] mt-1"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-[#1A1A1A]">
                        Razorpay (UPI, NetBanking, RuPay & Indian Cards)
                      </span>
                      <span className="text-xs font-semibold text-sky-700">Razorpay</span>
                    </div>
                    <p className="text-xs text-neutral-600">
                      Seamless Indian payments supporting Google Pay, PhonePe, Paytm, and all major Indian banks.
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label
                  onClick={() => setFormData({ ...formData, paymentMethod: "COD" })}
                  className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === "COD"
                      ? "border-[#7A0D2E] bg-[#FAF5EE]"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === "COD"}
                    onChange={() => {}}
                    className="accent-[#7A0D2E] mt-1"
                  />
                  <div className="flex-1 space-y-1">
                    <span className="font-serif font-bold text-sm text-[#1A1A1A] block">
                      Cash on Delivery (Available in India)
                    </span>
                    <p className="text-xs text-neutral-600">
                      Pay with cash upon verified delivery inspection.
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 border border-neutral-300 text-neutral-700 py-3 rounded-full font-semibold text-xs uppercase"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-2/3 bg-[#7A0D2E] text-white py-3 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#6B0B28]"
                >
                  <span>Review Final Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & PLACE ORDER */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A] border-b border-neutral-200 pb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#7A0D2E]" />
                <span>Final Order Review & Confirmation</span>
              </h2>

              <div className="bg-[#FAF5EE] p-4 rounded border border-[#D4A437]/30 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-neutral-600">Ship To:</span>
                  <span className="font-medium text-[#1A1A1A]">
                    {formData.fullName}, {formData.street}, {formData.city}, {formData.country}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-neutral-600">Contact:</span>
                  <span className="font-medium text-[#1A1A1A]">{formData.email} • {formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-neutral-600">Payment Gateway:</span>
                  <span className="font-medium text-[#7A0D2E] uppercase font-bold">
                    {formData.paymentMethod} (256-Bit SSL Encrypted)
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif font-bold text-xs uppercase text-[#7A0D2E]">
                  Items in this Shipment:
                </h4>
                {items.map((it) => (
                  <div key={it.id} className="flex items-center justify-between text-xs py-1 border-b border-neutral-100">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded overflow-hidden">
                        <Image src={it.image} alt={it.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#1A1A1A]">{it.name}</span>
                        <span className="text-neutral-500 block text-[11px]">Qty: {it.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold">{formatPrice(it.price * it.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 border border-neutral-300 text-neutral-700 py-3 rounded-full font-semibold text-xs uppercase"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePlaceOrder}
                  className="w-2/3 bg-[#7A0D2E] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#6B0B28] shadow-xl disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Verifying Secure Payment...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-[#D4A437]" />
                      <span>Place & Confirm Order ({formatPrice(finalTotal)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR SUMMARY (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FAF5EE] rounded-xl border border-[#D4A437]/40 p-6 space-y-4 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A] border-b border-[#D4A437]/20 pb-3">
              Order Breakdown
            </h3>

            <div className="space-y-2 text-xs text-neutral-700">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-800">
                  <span>Promotional Discount</span>
                  <span className="font-semibold">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured International Courier</span>
                <span className="text-green-800 font-semibold">Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span>Applicable Import Duties</span>
                <span className="font-semibold">Pre-Paid</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#7A0D2E] pt-3 border-t border-[#D4A437]/30">
                <span>Total Payment</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 space-y-2 text-[11px] text-neutral-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#7A0D2E]" />
                <span>30-Day Heritage Quality Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#7A0D2E]" />
                <span>Door-to-Door Global Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

