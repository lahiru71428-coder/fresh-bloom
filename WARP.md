# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Setup and Dependencies
```bash
# Install dependencies
composer install

# Setup environment (creates .env from example if available)
copy .env.example .env  # Windows
# cp .env.example .env  # macOS/Linux

# Start local development server
php -S localhost:8000
```

### Testing and Development
```bash
# Test the web application
# Access: http://localhost:8000

# Test Stripe payment processing
# Use test cards: 4242 4242 4242 4242 (success)
# Use test cards: 4000 0000 0000 9995 (declined)

# View PHP error logs
# Check server console output where php -S was started
```

### Environment Configuration
- Copy `.env.example` to `.env` and configure:
  - `STRIPE_SECRET_KEY`: Your Stripe test secret key (starts with `sk_test_`)
  - `STRIPE_PUBLISHABLE_KEY`: Your Stripe test publishable key (starts with `pk_test_`)  
  - `STRIPE_WEBHOOK_SECRET`: Webhook endpoint secret (starts with `whsec_`)

## Architecture Overview

### Project Structure
This is a **PHP-based e-commerce flower shop** with **Stripe payment integration**:

- **Frontend**: Vanilla JavaScript with HTML/CSS
- **Backend**: Pure PHP (no framework) with Stripe PHP SDK
- **Payment Processing**: Stripe Checkout Sessions
- **Data Storage**: localStorage for cart, file-based for orders
- **Currency**: Sri Lankan Rupees (LKR)

### Key Components

#### Backend PHP Files
- **`config.php`**: Environment loader, CORS headers, JSON response helpers
- **`create-checkout-session.php`**: Main payment processing endpoint
- **`webhook.php`**: Stripe webhook handler for payment events
- **`composer.json`**: PHP dependencies (Stripe SDK)

#### Frontend JavaScript Architecture
- **`script.js`**: Main homepage functionality (product catalog, cart management)
- **`cart.js`**: Shopping cart page logic (quantity management, cart persistence)  
- **`checkout.js`**: Checkout form handling and Stripe integration

#### Key JavaScript Patterns
- **Product Management**: Static product array with filtering and pagination
- **Cart Persistence**: localStorage-based cart with quantity tracking via Map
- **Payment Flow**: Form validation → PHP endpoint → Stripe Checkout redirect

### Data Flow
1. **Product Browsing**: Static products array → filtered display → cart addition
2. **Cart Management**: localStorage persistence → quantity aggregation via Map
3. **Checkout Process**: Form validation → PHP session creation → Stripe redirect
4. **Payment Processing**: Stripe webhook → order logging → completion

### Important Implementation Details

#### Cart System
- Uses `localStorage` key `'flowerCart'` for persistence
- Quantities tracked by counting duplicate item IDs in array
- Cart state converted to Map for display (prevents duplicate entries)

#### Payment Processing
- Creates Stripe Checkout Sessions with line items
- Supports Sri Lankan shipping addresses only (`allowed_countries: ['LK']`)
- Includes delivery charges as separate line items
- Customer metadata stored in session for order fulfillment

#### Error Handling
- PHP: JSON error responses with appropriate HTTP status codes
- JavaScript: User notifications via temporary overlay messages
- Stripe: Comprehensive try-catch with specific error types

#### Delivery Options
```javascript
// Shipping costs defined in checkout.js
'standard': 500.00,   // LKR 500
'express': 1000.00,   // LKR 1,000  
'sameday': 1500.00    // LKR 1,500
```

### Development Guidelines

#### When modifying payment flow:
- Always test with Stripe test keys
- Validate all required fields before API calls  
- Handle both API errors and network failures
- Update webhook handler if changing session metadata

#### When adding products:
- Add to `products` array in `script.js`
- Include all required fields: `id, name, category, price, image, rating, description`
- Use LKR currency format: `'LKR X,XXX'`
- Ensure unique IDs for cart functionality

#### When modifying cart logic:
- Remember cart uses array storage but Map display
- Update both `script.js` and `cart.js` for consistency
- Test quantity increase/decrease edge cases
- Verify localStorage persistence across pages

### Sri Lankan Localization
- Phone validation: `+94XXXXXXXXX` or `0XXXXXXXXX` format
- Address collection restricted to Sri Lanka (`LK`)
- Currency: Sri Lankan Rupees with proper comma formatting
- Delivery zones: Standard/Express/Same-day options