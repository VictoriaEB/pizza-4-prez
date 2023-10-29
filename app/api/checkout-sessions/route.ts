import stripe from "@/services/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const line_items = await req.json();
  console.log(line_items);
  const checkoutSession = await stripe.checkout.sessions.create({
    // line_items: [
    //   {
    //     price_data: {
    //       currency: "usd",
    //       unit_amount: 2000,
    //       product_data: {
    //         name: "Stubborn Attachments",
    //         description: "hello",
    //         images: ["https://i.imgur.com/EHyR2nP.png"],
    //       },
    //     },
    //     quantity: 1,
    //   },
    // ],
    mode: "setup",
    payment_method_types: ["card"],
    //customer: "{{CUSTOMER_ID}}",
    success_url: "http://localhost:3000/thank-you?order={CHECKOUT_SESSION_ID}}",
  });

  /*
  create order
    //TODO: 
    insert into orders (checkoutSession.uid, order_status.placing)

    update order
    insert into order log
  */

  return new NextResponse(checkoutSession.url);
}
