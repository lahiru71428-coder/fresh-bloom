# WARP.md

This file provides guidance when working with this repository.

## Development Commands

### Setup and Dependencies
```bash
npm install
```

### Local Development
```bash
npx vercel dev
# Endpoints:
#   POST http://localhost:3000/api/create-checkout-session
#   POST http://localhost:3000/api/webhook
```

### Environment Configuration
Set environment variables (locally or in Vercel):
- `STRIPE_SECRET_KEY` (sk_test_…)
- `STRIPE_PUBLISHABLE_KEY` (pk_test_…)
- `STRIPE_WEBHOOK_SECRET` (whsec_…)

## Architecture Overview

### Project Structure (Node.js)
- **Frontend**: Vanilla JavaScript with HTML/CSS
- **Backend**: Vercel Serverless Functions (Node.js 20)
- **Payments**: Stripe Checkout Sessions
- **Data**: localStorage for cart

### Key Components
- `api/create-checkout-session.js`: Creates Stripe Checkout Session
- `api/webhook.js`: Handles Stripe webhooks
- `checkout.js`: Checkout form logic and API calls
- `vercel.json`: Functions runtime and routes

### Data Flow
1. Checkout form → POST `/api/create-checkout-session`
2. Stripe redirects customer to hosted Checkout
3. Stripe sends webhook → `/api/webhook`

### Notes
- Test with Stripe test keys
- Handle API errors and webhook signature verification
- Shipping limited to Sri Lanka (`LK`)
