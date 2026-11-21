import { NextResponse } from "next/server";
import { dbService } from "@/lib/database/db";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }
    const res = dbService.subscribeNewsletter(email);
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: "Subscription failed" }, { status: 400 });
  }
}

