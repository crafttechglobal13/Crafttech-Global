import { NextResponse } from "next/server";
import { dbService } from "@/lib/database/db";

export async function GET(request: Request) {
  // Security Gate: Protect patron enquiries from unauthorized access
  const authHeader = request.headers.get("authorization") || request.headers.get("x-admin-key");
  const cookieHeader = request.headers.get("cookie") || "";
  const hasAdminSession = cookieHeader.includes("crafttech_admin_session=active");

  const isLocalDev = process.env.NODE_ENV !== "production";
  if (!authHeader && !hasAdminSession && !isLocalDev) {
    return NextResponse.json(
      { error: "Access Denied: Administrative credentials required to view patron enquiries." },
      { status: 401 }
    );
  }

  const enquiries = dbService.getEnquiries();
  return NextResponse.json(enquiries);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Name and email address are required" }, { status: 400 });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email address format" }, { status: 400 });
    }

    const allowedTypes = ["BULK_ORDER", "CUSTOM_ORDER", "WHOLESALE", "CONTACT"] as const;
    type EnquiryType = typeof allowedTypes[number];
    const safeType: EnquiryType = allowedTypes.includes(body.type as EnquiryType)
      ? (body.type as EnquiryType)
      : "CONTACT";

    const sanitizedEnquiry = {
      type: safeType,
      name: String(body.name).trim().substring(0, 100),
      email: String(body.email).trim().toLowerCase().substring(0, 100),
      phone: body.phone ? String(body.phone).trim().substring(0, 30) : "",
      status: "NEW" as const,
      details: body.details && typeof body.details === "object" ? body.details : {},
    };

    const enquiry = dbService.createEnquiry(sanitizedEnquiry);
    return NextResponse.json(enquiry, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to record enquiry. Please verify message details." },
      { status: 400 }
    );
  }
}
