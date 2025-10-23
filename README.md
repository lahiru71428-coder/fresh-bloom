# Fresh Bloom Flower Shop - PHP Backend

A flower shop e-commerce website with Stripe payment integration using PHP backend.

## Quick Setup

### 1. Install PHP and Composer

Make sure you have PHP 7.4+ and Composer installed. If not:
- Download PHP from https://www.php.net/downloads
- Download Composer from https://getcomposer.org/

### 2. Install Dependencies

```bash
composer install
```

### 3. Environment Setup

1. Copy the environment template:
   ```bash
   copy .env.example .env
   ```

2. Get your Stripe API keys from https://dashboard.stripe.com/test/apikeys

3. Edit `.env` file and replace with your actual keys:
   ```
   STRIPE_SECRET_KEY=sk_test_your_actual_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

### 4. Start Web Server

```bash
php -S localhost:8000
```

Your website will be available at: http://localhost:8000

### 5. Test Payment

Use Stripe test cards:
- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 9995
- Expiry: Any future date
- CVC: Any 3 digits

## File Structure

```
├── composer.json               # PHP dependencies
├── config.php                 # Configuration helpers
├── create-checkout-session.php # Payment processing
├── webhook.php                # Stripe webhooks
├── .env                       # Your API keys
├── checkout.js                # Updated frontend
└── README.md                  # This file
```

## Features Migrated from Node.js

✅ **Removed Node.js files:**
- server.js
- package.json
- package-lock.json
- node_modules/

✅ **Added PHP backend:**
- Stripe PHP SDK integration
- Checkout session creation
- Webhook handling
- Environment configuration

✅ **Updated frontend:**
- Modified checkout.js to use PHP endpoints
- Same user experience maintained

## Webhook Setup (Optional)

For production, configure webhooks in Stripe Dashboard:

1. Go to https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://yourdomain.com/webhook.php`
3. Select events: `checkout.session.completed`
4. Copy signing secret to `.env` file

## Troubleshooting

**"Composer not found"**
- Install Composer from https://getcomposer.org/

**"PHP not found"**
- Install PHP 7.4+ from https://www.php.net/

**"Stripe API error"**
- Check your API keys in `.env` file
- Ensure you're using test keys (start with `pk_test_` and `sk_test_`)

**"Payment not working"**
- Verify `.env` file exists and has correct keys
- Check browser console for JavaScript errors

## Support

- Stripe Documentation: https://stripe.com/docs
- PHP Documentation: https://php.net/manual/