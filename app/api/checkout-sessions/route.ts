import stripe from "@/services/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const checkoutSession = await stripe.checkout.sessions.create({
    line_items: await req.json(),
    mode: "payment",
    success_url: "http://localhost:3000/thank-you?order=adc123",
  });

  return new NextResponse(checkoutSession.url);
}
