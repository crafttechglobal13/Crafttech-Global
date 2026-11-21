import { NextResponse } from "next/server";
import { dbService } from "@/lib/database/db";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Valid email address required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail) || cleanEmail.length > 100) {
      return NextResponse.json({ error: "Invalid email address format" }, { status: 400 });
    }

    const res = dbService.subscribeNewsletter(cleanEmail);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: "Subscription request could not be processed" }, { status: 400 });
  }
}
