import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import Stripe from "stripe";
import {STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY} from "./key.js";

import cors from "cors";


const stripePublishableKey = STRIPE_PUBLISHABLE_KEY
const stripeSecretKey = STRIPE_SECRET_KEY

config({
  path: "./data/config.env",
});

export const app = express();
app.use((req, res,next) => {
  bodyParser.json()(req,res,next)
})

app.post('/create-payment-intent', async (req, res) => {
  const {email, currency, amount} = req.body;
  const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2020-08-27'
  })
  const customer = await stripe.customers.create({email})
  console.log(req.body);
  const params = {
      amount: parseInt(amount),
      currency,
      customer: customer.id,
      payment_method_options: {
          card: {
              request_three_d_secure: 'automatic'
          }
      },
      payment_method_types: []
  }

  try {
      const paymentIntent = await stripe.paymentIntents.create(params);
      return res.send({
          clientSecret: paymentIntent.client_secret
      })
  }
  catch(error){
      console.log(error);
      return res.send({
          error: error.raw.message
      })
  }
})

// Using Middlewares
app.use(express.json());
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: "*",
    
  })
);

import maps from "./routes/maps.js";

app.use("/api/v1/maps", maps);

import comments from "./routes/comments.js"
app.use("/api/v1/comments", comments)