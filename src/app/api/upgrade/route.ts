import admin from "@/lib/admin";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// USD prices
const amount = {
  monthly: 3.99,
  yearly: 2.67,
};

const USD_TO_INR_RATE = 83.5;

export async function POST(request: NextRequest) {
  // Get user's IP address
  const ip =
    request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip");

  console.log("ip", ip);

  // Check if user is from India
  let isIndian = false;
  try {
    const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geoResponse.json();
    isIndian = geoData.country === "IN";
  } catch (error) {
    console.error("Error detecting country:", error);
  }

  // Authentication check
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const decodedToken = await admin.auth().verifyIdToken(token);

  if (!decodedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse request body
  const { isYearly } = await request.json();
  if (typeof isYearly !== "boolean") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Determine amount and currency based on user's location
  const currency = isIndian ? "INR" : "USD";
  let amountToPay = isYearly ? amount.yearly * 12 : amount.monthly;

  // Convert to INR for Indian users
  if (isIndian) {
    amountToPay = Math.round(amountToPay * USD_TO_INR_RATE);
  }

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amountToPay * 100),
      currency: currency,
      receipt: `zara_${Math.random().toString(36).substring(7)}`,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: amountToPay,
      currency: currency,
      isIndian: isIndian,
      name: "m3",
      planId: isYearly ? "yearly" : "monthly",
      description: isYearly ? "Yearly Subscription" : "Monthly Subscription",
    });
  } catch (error) {
    console.error("error in creating order", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
