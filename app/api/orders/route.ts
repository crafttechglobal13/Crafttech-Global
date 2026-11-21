import { NextResponse } from "next/server";
import { dbService } from "@/lib/database/db";

export async function GET() {
  const orders = dbService.getOrders();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = dbService.createOrder(body);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process order" }, { status: 400 });
  }
}

