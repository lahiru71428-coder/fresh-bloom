# Fresh Bloom Flower Shop - Node.js Backend

A flower shop e-commerce website with Stripe payment integration using Vercel Serverless Functions (Node.js).

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

1. Set environment variables in Vercel Project Settings → Environment Variables (or in local `.env` for `vercel dev`):
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

2. Get your Stripe API keys: https://dashboard.stripe.com/test/apikeys

### 3. Local Development

```bash
npx vercel dev
```
Endpoints:
- POST /api/create-checkout-session
- POST /api/webhook

### 4. Deploy
Push to the main branch or run:
```bash
npx vercel --prod
```

## File Structure

```
├── api/
│   ├── create-checkout-session.js  # Stripe Checkout session creation
│   └── webhook.js                  # Stripe webhook handler
├── checkout.js                     # Frontend checkout logic
├── package.json                    # Node dependencies
└── vercel.json                     # Vercel config (Node.js 20 runtime)
```

## Test Cards
- 4242 4242 4242 4242 (success)
- 4000 0000 0000 9995 (declined)
- Any future expiry, any CVC

## Troubleshooting
- Ensure env vars are set in Vercel: STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET
- Verify your deployment uses Node.js 20 functions (see `vercel.json`)
- Check Vercel logs for errors from Stripe or webhook signature verification

## Support
- Stripe Docs: https://stripe.com/docs
- Vercel Functions: https://vercel.com/docs/functions
