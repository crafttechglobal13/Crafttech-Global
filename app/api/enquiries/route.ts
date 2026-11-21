import { NextResponse } from "next/server";
import { dbService } from "@/lib/database/db";

export async function GET() {
  const enquiries = dbService.getEnquiries();
  return NextResponse.json(enquiries);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const enquiry = dbService.createEnquiry(body);
    return NextResponse.json(enquiry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to record enquiry" }, { status: 400 });
  }
}

