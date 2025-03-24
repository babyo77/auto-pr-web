import admin from "@/lib/admin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  const decodedToken = await admin.auth().verifyIdToken(token);

  const cookieStore = await cookies();
  cookieStore.set("zara-auth", token, {
    httpOnly: true,
    secure: true,
    maxAge: decodedToken.exp - Date.now() / 1000,
    path: "/",
  });

  return NextResponse.json({});
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("zara-auth");

  return NextResponse.json({}, { status: 200 });
}
