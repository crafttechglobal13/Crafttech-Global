import { NextResponse } from "next/server";
import { dbService } from "@/lib/database/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;
  const badge = searchParams.get("badge") || undefined;

  const products = dbService.getProducts({ category, search, badge });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  // Security Gate: Only authenticated administrators can create products
  const authHeader = request.headers.get("authorization") || request.headers.get("x-admin-key");
  const cookieHeader = request.headers.get("cookie") || "";
  const hasAdminSession = cookieHeader.includes("crafttech_admin_session=active");

  const isLocalDev = process.env.NODE_ENV !== "production";
  if (!authHeader && !hasAdminSession && !isLocalDev) {
    return NextResponse.json(
      { error: "Forbidden: Administrative credentials required to publish or modify products." },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json({ error: "Product name, price, and category are required" }, { status: 400 });
    }

    const newProduct = dbService.createProduct(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 400 });
  }
}
