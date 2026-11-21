"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Truck, Check, Search, Filter, Printer } from "lucide-react";
import { dbService, OrderRecord } from "@/lib/database/db";
import { useCurrency } from "@/lib/currency/currencyContext";

export default function AdminOrdersPage() {
  const { formatPrice } = useCurrency();
  const [orders, setOrders] = useState(dbService.getOrders());
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [trackingInput, setTrackingInput] = useState("");
  const [carrierInput, setCarrierInput] = useState("DHL Express Global");

  const filteredOrders = orders.filter((o) => {
    if (selectedStatus !== "ALL" && o.status !== selectedStatus) return false;
    if (
      searchTerm &&
      !o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !o.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleStatusChange = (
    orderId: string,
    newStatus: OrderRecord["status"]
  ) => {
    dbService.updateOrderStatus(orderId, newStatus);
    setOrders([...dbService.getOrders()]);
  };

  const handleSaveTracking = (orderId: string) => {
    dbService.updateOrderStatus(orderId, "SHIPPED", trackingInput, carrierInput);
    setOrders([...dbService.getOrders()]);
    setEditingOrderId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Orders & Fulfillment</h1>
          <p className="text-xs text-neutral-500">Track shipments, update carrier airway bills, and fulfill patron orders.</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-lg border border-[#D4A437]/30 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search by Order #, Patron Name, Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#FAF5EE] border border-[#D4A437]/40 rounded py-2 pl-8 pr-3 text-xs focus:outline-none focus:border-[#7A0D2E]"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-1.5 text-xs overflow-x-auto">
          {["ALL", "PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                selectedStatus === st
                  ? "bg-[#7A0D2E] text-white"
                  : "bg-[#FAF5EE] text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-[#D4A437]/40">
            <p className="font-serif text-base text-neutral-700">No orders found.</p>
          </div>
        ) : (
          filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-xl border border-[#D4A437]/30 p-5 sm:p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-neutral-100 text-xs">
                <div>
                  <span className="font-serif font-bold text-base text-[#7A0D2E]">
                    {ord.orderNumber}
                  </span>
                  <span className="text-neutral-500 block text-[11px]">
                    Placed: {new Date(ord.createdAt).toLocaleString()} • Currency: {ord.currency}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Status Dropdown */}
                  <select
                    value={ord.status}
                    onChange={(e) => handleStatusChange(ord.id, e.target.value as any)}
                    className="bg-[#FAF5EE] border border-[#D4A437]/50 rounded px-2.5 py-1 text-xs font-bold text-[#7A0D2E] focus:outline-none"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>

                  <span className="font-bold text-sm text-[#1A1A1A]">
                    {formatPrice(ord.total)}
                  </span>
                </div>
              </div>

              {/* Customer and Address Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-[#FAF5EE] p-3 rounded border border-[#D4A437]/20">
                <div>
                  <strong className="text-[#1A1A1A] block">Patron Contact:</strong>
                  <span>{ord.customerName} ({ord.email})</span>
                  <span className="block text-neutral-500">{ord.phone}</span>
                </div>
                <div>
                  <strong className="text-[#1A1A1A] block">Destination:</strong>
                  <span>
                    {ord.shippingAddress.street},{" "}
                    {ord.shippingAddress.apartment && `${ord.shippingAddress.apartment}, `}
                    {ord.shippingAddress.city}, {ord.shippingAddress.state} {ord.shippingAddress.postalCode},{" "}
                    {ord.shippingAddress.country}
                  </span>
                </div>
              </div>

              {/* Ordered Items */}
              <div className="space-y-2">
                {ord.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-neutral-50">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded overflow-hidden border">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-medium text-[#1A1A1A]">{item.name}</span>
                        <span className="text-neutral-500 text-[11px] block">
                          Qty: {item.quantity} {item.size && `• Size: ${item.size}`} {item.color && `• Color: ${item.color}`}
                        </span>
                      </div>
                    </div>
                    <span className="font-semibold text-neutral-800">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Tracking & Carrier assignment */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                {editingOrderId === ord.id ? (
                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Airway Bill / Tracking #"
                      value={trackingInput}
                      onChange={(e) => setTrackingInput(e.target.value)}
                      className="bg-[#FAF5EE] border border-[#D4A437] rounded px-2 py-1 text-xs"
                    />
                    <select
                      value={carrierInput}
                      onChange={(e) => setCarrierInput(e.target.value)}
                      className="bg-[#FAF5EE] border border-[#D4A437] rounded px-2 py-1 text-xs"
                    >
                      <option value="DHL Express Global">DHL Express Global</option>
                      <option value="FedEx Priority">FedEx Priority</option>
                      <option value="Blue Dart Apex">Blue Dart Apex</option>
                    </select>
                    <button
                      onClick={() => handleSaveTracking(ord.id)}
                      className="bg-[#7A0D2E] text-white px-3 py-1 rounded text-xs font-semibold"
                    >
                      Save Dispatch
                    </button>
                    <button
                      onClick={() => setEditingOrderId(null)}
                      className="text-neutral-500 text-xs hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-600">
                      Tracking:{" "}
                      <strong className="text-[#0D2D5B] font-mono">
                        {ord.trackingNumber || "Not assigned"}
                      </strong>{" "}
                      {ord.carrier && `(${ord.carrier})`}
                    </span>
                    <button
                      onClick={() => {
                        setEditingOrderId(ord.id);
                        setTrackingInput(ord.trackingNumber || "");
                        setCarrierInput(ord.carrier || "DHL Express Global");
                      }}
                      className="text-[#7A0D2E] hover:underline font-semibold"
                    >
                      {ord.trackingNumber ? "Edit Shipment" : "+ Assign Tracking"}
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span className="bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded text-[10px] font-semibold uppercase">
                    Payment: {ord.paymentMethod} ({ord.paymentStatus})
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

