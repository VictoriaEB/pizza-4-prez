import stripe, { LineItem } from "@/services/stripe";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const lineItemsCookie = decodeURIComponent(
    new URL(req.url).pathname.replace("/api/line-items/", "")
  );

  const cookieData = lineItemsCookie
    .toString()
    .split("\n")
    .map((c) => c.split(","))
    .map(([productId, quantity]) => ({
      productId,
      quantity: parseInt(quantity),
    }));
  const products = await stripe.products
    .list({
      ids: cookieData.map((d) => d.productId),
    })
    .then((r) => r.data);
  const prices = await stripe.prices.list({}).then((r) => r.data);

  const lineItems: LineItem[] = products.map((product) => ({
    product,
    price: prices.find((p) => p.product === product.id)!,
    quantity: cookieData.find((d) => d.productId === product.id)!.quantity,
  }));

  return NextResponse.json(lineItems);
}
