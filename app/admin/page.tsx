"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle,
} from "lucide-react";
import { dbService } from "@/lib/database/db";
import { useCurrency } from "@/lib/currency/currencyContext";

export default function AdminDashboardPage() {
  const { formatPrice } = useCurrency();
  const products = dbService.getProducts();
  const orders = dbService.getOrders();
  const enquiries = dbService.getEnquiries();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "PENDING" || o.status === "CONFIRMED").length;
  const lowStock = products.filter((p) => p.stock <= 10).length;
  const topProducts = products.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A437]">
            CRAFTTECH GLOBAL Enterprise
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Executive Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/create"
            className="bg-[#7A0D2E] text-white text-xs font-semibold px-4 py-2 rounded-md hover:bg-[#6B0B28] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
          <Link
            href="/admin/orders"
            className="bg-white border border-[#D4A437] text-[#1A1A1A] text-xs font-semibold px-4 py-2 rounded-md hover:bg-[#FAF5EE] transition-colors"
          >
            Manage Orders
          </Link>
        </div>
      </div>

      {/* METRIC CARDS (4 Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-xl border border-[#D4A437]/30 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="p-2 bg-green-50 text-green-700 rounded-md">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-[#1A1A1A]">
            {formatPrice(totalRevenue)}
          </div>
          <div className="flex items-center text-[11px] text-green-700 font-medium gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% from last period</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-xl border border-[#D4A437]/30 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Total Orders
            </span>
            <div className="p-2 bg-blue-50 text-blue-700 rounded-md">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-[#1A1A1A]">
            {totalOrders}
          </div>
          <div className="text-[11px] text-neutral-500">
            {pendingOrders} awaiting fulfillment
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white p-5 rounded-xl border border-[#D4A437]/30 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Active Inventory
            </span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-md">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-[#1A1A1A]">
            {products.length} Items
          </div>
          <div className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{lowStock} low stock alerts</span>
          </div>
        </div>

        {/* Commercial Enquiries */}
        <div className="bg-white p-5 rounded-xl border border-[#D4A437]/30 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Trade Enquiries
            </span>
            <div className="p-2 bg-purple-50 text-purple-700 rounded-md">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-2xl font-bold text-[#1A1A1A]">
            {enquiries.length} Inquiries
          </div>
          <div className="text-[11px] text-[#7A0D2E] font-medium">
            Custom size & bulk quotes
          </div>
        </div>
      </div>

      {/* RECENT ORDERS & TOP PRODUCTS (Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#D4A437]/30 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
              Recent Client Orders
            </h3>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-[#7A0D2E] hover:underline flex items-center gap-1"
            >
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500 uppercase tracking-wider">
                  <th className="pb-2">Order #</th>
                  <th className="pb-2">Patron</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Payment</th>
                  <th className="pb-2 text-right">Total</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FAF5EE]/60 transition-colors">
                    <td className="py-3 font-semibold text-[#7A0D2E]">{ord.orderNumber}</td>
                    <td className="py-3">
                      <span className="font-medium text-[#1A1A1A] block">{ord.customerName}</span>
                      <span className="text-[11px] text-neutral-500">{ord.shippingAddress.country}</span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          ord.status === "DELIVERED"
                            ? "bg-green-100 text-green-800"
                            : ord.status === "SHIPPED"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 font-medium text-neutral-700">
                      {ord.paymentMethod} • <span className="text-green-700">{ord.paymentStatus}</span>
                    </td>
                    <td className="py-3 text-right font-bold text-[#1A1A1A]">
                      {formatPrice(ord.total)}
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/admin/orders`}
                        className="text-[#7A0D2E] hover:underline font-semibold"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Heirlooms (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#D4A437]/30 p-6 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-base text-[#1A1A1A] border-b border-neutral-100 pb-3">
            Top Performing Heirlooms
          </h3>

          <div className="space-y-3">
            {topProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded hover:bg-[#FAF5EE] transition-colors">
                <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0 border">
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-serif font-bold text-xs text-[#1A1A1A] truncate block">
                    {p.name}
                  </span>
                  <span className="text-[11px] text-neutral-500">{p.categoryName}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-xs text-[#7A0D2E] block">{formatPrice(p.price)}</span>
                  <span className="text-[10px] text-neutral-400">{p.stock} in stock</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-100">
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-[#0D2D5B] hover:underline flex items-center justify-between"
            >
              <span>Manage Entire Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

