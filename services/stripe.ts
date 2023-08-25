import Stripe from "stripe";

export type LineItem = {
  product: Stripe.Product;
  price: Stripe.Price;
  quantity: number;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

export default stripe;
