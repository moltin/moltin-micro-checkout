# moltin-micro-checkout

> ⚡️ One-click moltin checkout with Stripe

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/ynnoj/moltin-micro-checkout&env=MOLTIN_CLIENT_ID)

Asynchronous microservice that enables one-click checkout with [moltin](https://moltin.com) and [Stripe](https://stripe.com).

* Add the product to a cart
* Checkout the cart (create an order)
* Pay for the order (using the Stripe token)

Built with [Micro](https://github.com/zeit/micro) 🤩

## 🛠 Setup

`npm install`

`npm run dev`

Create a `now-secrets.json` at the project root with your moltin `client_id`.

```json
{
  "@moltin-client-id": "your-client-id"
}
```

Both a moltin _and_ Stripe account are needed for this to function. Be sure that your [Stripe keys](https://stripe.com/docs/dashboard#api-keys) are attached to your moltin store. Learn more about that [here](https://docs.moltin.com/?bash#configuring-stripe).

## ⛽️ Usage

This service exposes a single `POST` endpoint which expects the following payload 👇

```json
{
  "token": "tok_visa",
  "product": "648a0eb5-329b-4475-bd8e-5eed12d27b2c",
  "customer": "ec1332a3-7579-4129-90b1-4f0d2c4e38b5",
  "billing_address": {
    "first_name": "Jonathan",
    "last_name": "Steele",
    "line_1": "2nd Floor British India House",
    "line_2": "15 Carliol Square",
    "city": "Newcastle Upon Tyne",
    "postcode": "NE1 6UF",
    "county": "Tyne & Wear",
    "country": "United Kingdom"
  }
}
```

If a customer record does not exist, you can instead pass a customer object.

```json
"customer": {  
  "name": "Jonathan Steele",
  "email": "jonathan@moltin.com"
}
```

Learn more at the moltin [API reference](https://docs.moltin.com).
