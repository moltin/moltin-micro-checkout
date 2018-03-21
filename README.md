# moltin-micro-checkout
> ⚡️ One-click moltin checkout with Stripe

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/ynnoj/moltin-micro-checkout&env=MOLTIN_CLIENT_ID)

Asynchronous microservice that enables one-click checkout with [moltin](https://moltin.com) and [Stripe](https://stripe.com).

Built with [Micro](https://github.com/zeit/micro) 🤩

## 🛠 Setup

`npm install`

`npm run dev`

Both a moltin _and_ Stripe account are needed for this to function. Be sure that your [Stripe keys](https://stripe.com/docs/dashboard#api-keys) are attached to your moltin store. Learn more about that [here](https://docs.moltin.com/?bash#configuring-stripe).


## ⛽️ Usage

This service exposes a single `POST` post endpoint which expects the following payload 👇

```json
{  
  "token": "tok_visa",
  "product": "648a0eb5-329b-4475-bd8e-5eed12d27b2c",
  "customer": {  
    "name": "Jonathan Steele",
    "email": "jonathan@moltin.com"
  },
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

Learn more at the moltin [API reference](https://docs.moltin.com).
