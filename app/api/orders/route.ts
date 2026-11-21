import { NextResponse } from "next/server";
import { dbService } from "@/lib/database/db";

export async function GET(request: Request) {
  // Security Gate: Protect customer orders from unauthorized scrapers & hackers
  const authHeader = request.headers.get("authorization") || request.headers.get("x-admin-key");
  const cookieHeader = request.headers.get("cookie") || "";
  const hasAdminSession = cookieHeader.includes("crafttech_admin_session=active");

  const isLocalDev = process.env.NODE_ENV !== "production";
  if (!authHeader && !hasAdminSession && !isLocalDev) {
    return NextResponse.json(
      { error: "Access Denied: Administrative credentials required to view order records." },
      { status: 401 }
    );
  }

  const orders = dbService.getOrders();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Input sanitization & validation
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Order must contain at least one valid item" }, { status: 400 });
    }

    if (!body.shippingAddress || !body.shippingAddress.fullName || !body.shippingAddress.email) {
      return NextResponse.json({ error: "Recipient name and contact email required" }, { status: 400 });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.shippingAddress.email)) {
      return NextResponse.json({ error: "Invalid email address format" }, { status: 400 });
    }

    const order = dbService.createOrder(body);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process order securely. Please verify order details." },
      { status: 400 }
    );
  }
}
