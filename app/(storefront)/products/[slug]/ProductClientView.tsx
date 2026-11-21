"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Ruler,
  Check,
  Share2,
  CheckCircle,
} from "lucide-react";
import { dbService } from "@/lib/database/db";
import { useCurrency } from "@/lib/currency/currencyContext";
import { useCart } from "@/lib/cart/cartContext";
import { useWishlist } from "@/lib/wishlist/wishlistContext";
import ProductCard from "@/components/products/ProductCard";

export default function ProductClientView({ slug }: { slug: string }) {
  const router = useRouter();
  const product = dbService.getProductBySlug(slug);
  const { formatPrice } = useCurrency();
  const { addItem, setIsCartDrawerOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "care" | "shipping" | "reviews">("desc");

  // Custom Size Enquiry Modal State
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [customForm, setCustomForm] = useState({
    name: "",
    email: "",
    phone: "",
    width: "",
    length: "",
    material: "Handspun New Zealand Wool",
    color: "Heritage Maroon & Royal Navy",
    notes: "",
  });
  const [customSubmitted, setCustomSubmitted] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center px-4">
        <h1 className="font-serif text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-sm text-neutral-600 mb-6">
          The requested luxury piece is no longer in stock or the link is incorrect.
        </p>
        <Link
          href="/shop"
          className="bg-[#7A0D2E] text-white px-6 py-2.5 rounded-full text-xs font-semibold"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const isWish = isInWishlist(product.id);
  const relatedProducts = dbService
    .getProducts()
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[activeImageIndex] || product.images[0],
      quantity,
      size: selectedSize,
      color: selectedColor,
      sku: product.sku,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCartDrawerOpen(false);
    router.push("/checkout");
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.createEnquiry({
      type: "CUSTOM_ORDER",
      name: customForm.name,
      email: customForm.email,
      phone: customForm.phone,
      status: "NEW",
      details: {
        product: product.name,
        width: customForm.width,
        length: customForm.length,
        material: customForm.material,
        color: customForm.color,
        notes: customForm.notes,
      },
    });
    setCustomSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-neutral-500 flex items-center space-x-2">
        <Link href="/" className="hover:text-[#7A0D2E]">Home</Link>
        <span>/</span>
        <Link href={`/categories/${product.categorySlug}`} className="hover:text-[#7A0D2E]">
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="text-neutral-800 font-semibold">{product.name}</span>
      </nav>

      {/* Product Hero: Visual Gallery & Purchase Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* GALLERY SECTION (Left 7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-lg overflow-hidden bg-white border border-[#D4A437]/30 shadow-md">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-all duration-300"
              priority
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#7A0D2E] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                {product.badge}
              </span>
            )}
            <button
              onClick={() =>
                toggleWishlist({
                  productId: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  originalPrice: product.originalPrice,
                  image: product.images[0],
                  category: product.categoryName,
                  rating: product.rating,
                })
              }
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
                isWish
                  ? "bg-[#7A0D2E] text-white"
                  : "bg-white/90 text-neutral-700 hover:text-[#7A0D2E] hover:bg-white"
              }`}
            >
              <Heart className={`w-5 h-5 ${isWish ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded border-2 overflow-hidden flex-shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? "border-[#7A0D2E] ring-2 ring-[#D4A437]"
                      : "border-neutral-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* PRODUCT DETAILS & BUY BOX (Right 5 Cols) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#D4A437] uppercase tracking-widest">
                SKU: {product.sku}
              </span>
              <span className="text-xs text-green-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>In Stock ({product.stock} pieces crafted)</span>
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-[#D4A437]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#1A1A1A]">{product.rating}</span>
              <span className="text-xs text-neutral-500">
                ({product.reviewCount} verified international reviews)
              </span>
            </div>

            {/* Price Presentation */}
            <div className="flex items-baseline gap-3 py-2 border-y border-[#D4A437]/20">
              <span className="text-2xl sm:text-3xl font-bold text-[#7A0D2E]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-base text-neutral-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-[11px] font-semibold text-[#0D2D5B] bg-[#0D2D5B]/10 px-2 py-0.5 rounded">
                Inclusive of all taxes & duties
              </span>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Sizes Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-neutral-800">Select Dimension:</span>
                  {product.categorySlug === "carpets-rugs" && (
                    <button
                      onClick={() => setIsCustomModalOpen(true)}
                      className="text-[#7A0D2E] hover:underline font-semibold flex items-center gap-1"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Request Custom Sizing</span>
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`text-xs px-3.5 py-1.5 rounded border transition-all ${
                        selectedSize === sz
                          ? "bg-[#7A0D2E] text-white font-semibold border-[#7A0D2E]"
                          : "border-neutral-300 text-neutral-700 hover:border-[#D4A437] bg-white"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-neutral-800">Available Colorways:</span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`text-xs px-3.5 py-1.5 rounded border transition-all ${
                        selectedColor === c
                          ? "bg-[#0D2D5B] text-white font-semibold border-[#0D2D5B]"
                          : "border-neutral-300 text-neutral-700 hover:border-[#D4A437] bg-white"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-semibold text-neutral-800">Quantity:</span>
              <div className="flex items-center border border-[#D4A437]/50 rounded bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-sm font-bold text-neutral-600 hover:text-[#7A0D2E]"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold text-[#1A1A1A]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-sm font-bold text-neutral-600 hover:text-[#7A0D2E]"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#7A0D2E] text-white py-3 px-4 rounded font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#6B0B28] transition-colors shadow-md active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-[#0D2D5B] text-white py-3 px-4 rounded font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#0A244A] transition-colors shadow-md active:scale-95"
              >
                <span>Instant Buy Now</span>
              </button>
            </div>

            {/* Trust Features Bar */}
            <div className="pt-4 border-t border-[#D4A437]/20 grid grid-cols-3 gap-2 text-center text-[10px] text-neutral-600">
              <div className="flex flex-col items-center gap-1 p-2 bg-white/60 rounded">
                <Truck className="w-4 h-4 text-[#7A0D2E]" />
                <span className="font-semibold">Complimentary Global Courier</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-white/60 rounded">
                <ShieldCheck className="w-4 h-4 text-[#7A0D2E]" />
                <span className="font-semibold">Certificate of Authenticity</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-white/60 rounded">
                <RotateCcw className="w-4 h-4 text-[#7A0D2E]" />
                <span className="font-semibold">30-Day Heritage Return Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED INFORMATION TABS */}
      <div className="bg-white/70 rounded-xl border border-[#D4A437]/30 p-6 sm:p-8 space-y-6">
        {/* Tabs Headers */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-8 border-b border-neutral-200 pb-3 text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab("desc")}
            className={`font-serif pb-2 font-bold tracking-wide transition-colors relative ${
              activeTab === "desc"
                ? "text-[#7A0D2E] border-b-2 border-[#7A0D2E]"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Artisan Story & Description
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`font-serif pb-2 font-bold tracking-wide transition-colors relative ${
              activeTab === "specs"
                ? "text-[#7A0D2E] border-b-2 border-[#7A0D2E]"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab("care")}
            className={`font-serif pb-2 font-bold tracking-wide transition-colors relative ${
              activeTab === "care"
                ? "text-[#7A0D2E] border-b-2 border-[#7A0D2E]"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Care Instructions
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`font-serif pb-2 font-bold tracking-wide transition-colors relative ${
              activeTab === "shipping"
                ? "text-[#7A0D2E] border-b-2 border-[#7A0D2E]"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Worldwide Shipping & Duties
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`font-serif pb-2 font-bold tracking-wide transition-colors relative ${
              activeTab === "reviews"
                ? "text-[#7A0D2E] border-b-2 border-[#7A0D2E]"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Customer Reviews ({product.reviewCount})
          </button>
        </div>

        {/* Tab Content */}
        <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
          {activeTab === "desc" && (
            <div className="space-y-4 max-w-4xl">
              <p>{product.description}</p>
              <div className="bg-[#FAF5EE] p-4 rounded border-l-4 border-[#7A0D2E] space-y-1">
                <h5 className="font-serif font-bold text-xs uppercase text-[#7A0D2E]">
                  Artisanal Provenance:
                </h5>
                <p className="text-xs">{product.craftsmanship}</p>
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
              <div className="p-3 bg-[#FAF5EE] rounded flex justify-between">
                <span className="font-semibold text-neutral-600">Material Composition:</span>
                <span className="font-medium text-[#1A1A1A]">{product.material}</span>
              </div>
              <div className="p-3 bg-[#FAF5EE] rounded flex justify-between">
                <span className="font-semibold text-neutral-600">Primary Colorway:</span>
                <span className="font-medium text-[#1A1A1A]">{product.color}</span>
              </div>
              <div className="p-3 bg-[#FAF5EE] rounded flex justify-between">
                <span className="font-semibold text-neutral-600">Dimensions:</span>
                <span className="font-medium text-[#1A1A1A]">{product.dimensions}</span>
              </div>
              <div className="p-3 bg-[#FAF5EE] rounded flex justify-between">
                <span className="font-semibold text-neutral-600">Total Weight:</span>
                <span className="font-medium text-[#1A1A1A]">{product.weight}</span>
              </div>
              <div className="p-3 bg-[#FAF5EE] rounded flex justify-between">
                <span className="font-semibold text-neutral-600">Artisan Origin:</span>
                <span className="font-medium text-[#1A1A1A]">{product.origin}</span>
              </div>
              <div className="p-3 bg-[#FAF5EE] rounded flex justify-between">
                <span className="font-semibold text-neutral-600">Master SKU:</span>
                <span className="font-medium text-[#1A1A1A]">{product.sku}</span>
              </div>
            </div>
          )}

          {activeTab === "care" && (
            <div className="space-y-3 max-w-3xl">
              <h4 className="font-serif font-bold text-sm text-[#7A0D2E]">
                Preserving Your Heirloom Piece
              </h4>
              <p>{product.careInstructions}</p>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-3 max-w-3xl">
              <h4 className="font-serif font-bold text-sm text-[#7A0D2E]">
                Express Insured International Shipping
              </h4>
              <p>{product.shippingInfo}</p>
              <p className="text-xs text-neutral-500">
                All orders are dispatched via DHL Express, FedEx Priority, or Blue Dart with live tracking coordinates and door-to-door insurance coverage.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-[#FAF5EE] p-4 rounded max-w-md">
                <div className="text-3xl font-bold font-serif text-[#7A0D2E]">
                  {product.rating}
                </div>
                <div>
                  <div className="flex text-[#D4A437]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-600">
                    Based on {product.reviewCount} customer reviews
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-b border-neutral-200 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">Sarah M. (New York, USA)</span>
                    <span className="text-[11px] text-neutral-500">Verified Purchase</span>
                  </div>
                  <p className="text-xs text-neutral-700 mt-1">
                    &ldquo;Arrived in flawless condition. The knot density and wool feel is far beyond what you find in commercial stores.&rdquo;
                  </p>
                </div>
                <div className="border-b border-neutral-200 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">Julian H. (London, UK)</span>
                    <span className="text-[11px] text-neutral-500">Verified Purchase</span>
                  </div>
                  <p className="text-xs text-neutral-700 mt-1">
                    &ldquo;True museum quality. Packaging was completely weatherproof and secure.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4A437]/25">
            <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">
              You May Also Admire
            </h3>
            <Link
              href={`/categories/${product.categorySlug}`}
              className="text-xs font-semibold text-[#7A0D2E] hover:underline"
            >
              Explore Category →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* CUSTOM SIZE ENQUIRY MODAL */}
      {isCustomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setIsCustomModalOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-[#F7F0E6] rounded-xl shadow-2xl border border-[#D4A437] p-6 z-10 space-y-4">
            <div className="flex justify-between items-start border-b border-[#D4A437]/30 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#D4A437] uppercase tracking-wider">
                  Bespoke Atelier Request
                </span>
                <h3 className="font-serif text-xl font-bold text-[#7A0D2E]">
                  Custom Size Enquiry
                </h3>
              </div>
              <button
                onClick={() => setIsCustomModalOpen(false)}
                className="text-neutral-500 hover:text-black font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {customSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle className="w-12 h-12 text-green-700 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-[#1A1A1A]">
                  Enquiry Submitted Successfully
                </h4>
                <p className="text-xs text-neutral-600">
                  Our master bespoke weaving consultant will prepare a tailored diagram, wool sample palette, and quotation within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsCustomModalOpen(false);
                    setCustomSubmitted(false);
                  }}
                  className="bg-[#7A0D2E] text-white text-xs px-6 py-2 rounded-full font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleCustomSubmit} className="space-y-3 text-xs">
                <p className="text-neutral-600">
                  Request custom dimensions for <strong>{product.name}</strong>.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-neutral-800 block mb-1">
                      Required Width (feet) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 10 ft"
                      value={customForm.width}
                      onChange={(e) => setCustomForm({ ...customForm, width: e.target.value })}
                      className="w-full bg-white border border-[#D4A437]/60 rounded p-2 text-xs focus:outline-none focus:border-[#7A0D2E]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-800 block mb-1">
                      Required Length (feet) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 14 ft"
                      value={customForm.length}
                      onChange={(e) => setCustomForm({ ...customForm, length: e.target.value })}
                      className="w-full bg-white border border-[#D4A437]/60 rounded p-2 text-xs focus:outline-none focus:border-[#7A0D2E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-neutral-800 block mb-1">
                      Preferred Material
                    </label>
                    <input
                      type="text"
                      value={customForm.material}
                      onChange={(e) => setCustomForm({ ...customForm, material: e.target.value })}
                      className="w-full bg-white border border-[#D4A437]/60 rounded p-2 text-xs focus:outline-none focus:border-[#7A0D2E]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-800 block mb-1">
                      Preferred Colorway
                    </label>
                    <input
                      type="text"
                      value={customForm.color}
                      onChange={(e) => setCustomForm({ ...customForm, color: e.target.value })}
                      className="w-full bg-white border border-[#D4A437]/60 rounded p-2 text-xs focus:outline-none focus:border-[#7A0D2E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={customForm.name}
                    onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                    className="w-full bg-white border border-[#D4A437]/60 rounded p-2 text-xs focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-neutral-800 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={customForm.email}
                      onChange={(e) => setCustomForm({ ...customForm, email: e.target.value })}
                      className="w-full bg-white border border-[#D4A437]/60 rounded p-2 text-xs focus:outline-none focus:border-[#7A0D2E]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-neutral-800 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={customForm.phone}
                      onChange={(e) => setCustomForm({ ...customForm, phone: e.target.value })}
                      className="w-full bg-white border border-[#D4A437]/60 rounded p-2 text-xs focus:outline-none focus:border-[#7A0D2E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-neutral-800 block mb-1">
                    Special Room Requirements or Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Room type, lighting orientation, fringe preference..."
                    value={customForm.notes}
                    onChange={(e) => setCustomForm({ ...customForm, notes: e.target.value })}
                    className="w-full bg-white border border-[#D4A437]/60 rounded p-2 text-xs focus:outline-none focus:border-[#7A0D2E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#7A0D2E] text-white font-semibold py-2.5 rounded-full uppercase tracking-wider text-xs hover:bg-[#6B0B28] transition-colors mt-2"
                >
                  Submit Custom Size Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

