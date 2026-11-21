import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/lib/currency/currencyContext";
import { CartProvider } from "@/lib/cart/cartContext";
import { WishlistProvider } from "@/lib/wishlist/wishlistContext";
import { AuthProvider } from "@/lib/auth/authContext";
import CartDrawer from "@/components/cart/CartDrawer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CRAFTTECH GLOBAL | Luxury Handmade Carpets, Rugs & Handicrafts",
  description:
    "Bringing Traditional Craftsmanship to Modern Living. Explore a thoughtfully curated collection of handcrafted Persian rugs, artisan brass sculptures, and luxury home decor.",
  keywords: [
    "handmade carpets",
    "Persian rugs",
    "Indian handicrafts",
    "luxury home decor",
    "brass sculptures",
    "artisanal textiles",
    "CRAFTTECH GLOBAL",
  ],
  authors: [{ name: "CRAFTTECH GLOBAL" }],
  icons: {
    icon: "/images/brand/favicon.png",
    apple: "/images/brand/favicon.png",
  },
  openGraph: {
    title: "CRAFTTECH GLOBAL | Luxury Handicrafts & Home Decor",
    description: "Bringing Traditional Craftsmanship to Modern Living.",
    url: "https://crafttechglobal.com",
    siteName: "CRAFTTECH GLOBAL",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#F7F0E6] text-[#1A1A1A] antialiased selection:bg-[#7A0D2E] selection:text-white min-h-screen flex flex-col">
        <AuthProvider>
          <CurrencyProvider>
            <WishlistProvider>
              <CartProvider>
                {children}
                <CartDrawer />
              </CartProvider>
            </WishlistProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

