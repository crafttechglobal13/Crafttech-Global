"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import { ProductItem } from "@/lib/database/data";
import { useCurrency } from "@/lib/currency/currencyContext";
import { useCart } from "@/lib/cart/cartContext";
import { useWishlist } from "@/lib/wishlist/wishlistContext";

export default function ProductCard({ product }: { product: ProductItem }) {
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [isHovered, setIsHovered] = useState(false);
  const isWish = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      quantity: 1,
      size: product.sizes?.[0],
      color: product.colors?.[0],
      sku: product.sku,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      category: product.categoryName,
      rating: product.rating,
    });
  };

  return (
    <div
      className="group relative bg-white/60 rounded-md border border-[#D4A437]/25 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:border-[#D4A437]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <Link href={`/products/${product.slug}`} className="relative aspect-[4/4] w-full overflow-hidden bg-[#FAF5EE]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm text-white ${
                product.badge === "Sale"
                  ? "bg-[#7A0D2E]"
                  : product.badge === "New"
                  ? "bg-[#0D2D5B]"
                  : "bg-[#D4A437] text-[#1A1A1A]"
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleToggleWishlist}
          aria-label={isWish ? "Remove from Wishlist" : "Add to Wishlist"}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
            isWish
              ? "bg-[#7A0D2E] text-white"
              : "bg-white/85 text-neutral-600 hover:text-[#7A0D2E] hover:bg-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${isWish ? "fill-current" : ""}`} />
        </button>
      </Link>

      {/* Product Details */}
      <div className="p-3.5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category */}
          <span className="text-[10px] font-semibold text-[#D4A437] uppercase tracking-wider block mb-1">
            {product.subCategory || product.categoryName}
          </span>

          {/* Title */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif text-sm font-bold text-[#1A1A1A] line-clamp-1 hover:text-[#7A0D2E] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex items-center text-[#D4A437]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-[#1A1A1A]">{product.rating}</span>
            <span className="text-[11px] text-neutral-500">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-3 pt-2.5 border-t border-neutral-100 flex flex-col gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-[#1A1A1A]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-[#7A0D2E] text-white text-xs font-semibold py-2 px-3 rounded flex items-center justify-center gap-1.5 hover:bg-[#6B0B28] transition-colors shadow-sm active:scale-[0.98]"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

