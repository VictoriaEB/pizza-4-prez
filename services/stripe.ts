import Stripe from "stripe";

export type LineItem = {
  product: Stripe.Product;
  price: number;
  quantity: number;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default stripe;
