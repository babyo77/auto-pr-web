import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
const keySecret = process.env.RAZORPAY_KEY_SECRET;

const makeSignature = (razorpayOrderId: string, razorpayPaymentId: string) => {
  if (!keySecret) {
    throw new Error("Key not found");
  }
  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentId, signature } = await request.json();

    const generatedSignature = makeSignature(orderId, paymentId);
    if (generatedSignature !== signature) {
      return NextResponse.json(
        { message: "payment verification failed" },
        { status: 400 }
      );
    }
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error("Error verifying payment", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
