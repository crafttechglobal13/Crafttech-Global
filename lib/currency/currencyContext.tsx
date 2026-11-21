"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CurrencyCode = "INR" | "USD" | "GBP" | "EUR";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to INR (e.g., INR=1, USD=0.012, GBP=0.0094, EUR=0.011)
  name: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: "INR", symbol: "₹", rate: 1, name: "Indian Rupee" },
  USD: { code: "USD", symbol: "$", rate: 0.012, name: "US Dollar" }, // ₹1000 = $12, $499 = ~₹41,500
  GBP: { code: "GBP", symbol: "£", rate: 0.0094, name: "British Pound" },
  EUR: { code: "EUR", symbol: "€", rate: 0.011, name: "Euro" },
};

// Base price in our DB is stored in INR.
// For international display, e.g. a ₹41,900 Persian Rug = $502.80 (or rounded)
interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInINR: number) => string;
  convertPrice: (amountInINR: number) => number;
  currencyConfig: CurrencyConfig;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD"); // Default to USD for luxury international appeal or INR

  useEffect(() => {
    const saved = localStorage.getItem("crafttech_currency") as CurrencyCode;
    if (saved && CURRENCIES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem("crafttech_currency", code);
  };

  const currencyConfig = CURRENCIES[currency] || CURRENCIES.INR;

  const convertPrice = (amountInINR: number): number => {
    if (currency === "INR") return Math.round(amountInINR);
    const converted = amountInINR * currencyConfig.rate;
    return Number(converted.toFixed(2));
  };

  const formatPrice = (amountInINR: number): string => {
    const val = convertPrice(amountInINR);
    if (currency === "INR") {
      return `₹${val.toLocaleString("en-IN")}`;
    }
    return `${currencyConfig.symbol}${val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        currencyConfig,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

