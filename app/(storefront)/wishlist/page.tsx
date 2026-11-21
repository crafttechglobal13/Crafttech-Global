"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlist } from "@/lib/wishlist/wishlistContext";
import { useCart } from "@/lib/cart/cartContext";
import { useCurrency } from "@/lib/currency/currencyContext";

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#FAF5EE] text-[#7A0D2E] flex items-center justify-center mx-auto border border-[#D4A437]/30">
          <Heart className="w-8 h-8 opacity-60" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1A1A1A]">Your Wishlist is Empty</h1>
        <p className="text-xs text-neutral-600 max-w-sm mx-auto">
          Save your favorite carpets, brass sculptures, and decor items to easily view or purchase later.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-[#7A0D2E] text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-[#6B0B28]"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div className="flex items-baseline justify-between pb-4 border-b border-[#D4A437]/30">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A437]">
            Saved Treasured Pieces
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            My Wishlist ({items.length})
          </h1>
        </div>
        <button
          onClick={clearWishlist}
          className="text-xs text-neutral-500 hover:text-red-700 font-medium"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.productId}
            className="bg-white/80 rounded-lg border border-[#D4A437]/30 overflow-hidden shadow-xs flex flex-col justify-between group"
          >
            <div className="relative aspect-square w-full bg-[#FAF5EE]">
              <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <button
                onClick={() => removeFromWishlist(item.productId)}
                className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-neutral-500 hover:text-red-700 flex items-center justify-center shadow"
                aria-label="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <span className="text-[10px] font-semibold text-[#D4A437] uppercase tracking-wider block">
                  {item.category || "Handcrafted Heritage"}
                </span>
                <Link
                  href={`/products/${item.slug}`}
                  className="font-serif text-sm font-bold text-[#1A1A1A] hover:text-[#7A0D2E] line-clamp-1"
                >
                  {item.name}
                </Link>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <span className="font-bold text-sm text-[#7A0D2E]">
                  {formatPrice(item.price)}
                </span>
              </div>

              <button
                onClick={() => {
                  addItem({
                    productId: item.productId,
                    name: item.name,
                    slug: item.slug,
                    price: item.price,
                    originalPrice: item.originalPrice,
                    image: item.image,
                    quantity: 1,
                  });
                  removeFromWishlist(item.productId);
                }}
                className="w-full bg-[#7A0D2E] text-white text-xs font-semibold py-2 rounded flex items-center justify-center gap-1.5 hover:bg-[#6B0B28] transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

