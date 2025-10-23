const Stripe = require('stripe');

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');
}

function send(res, status, data) {
  res.statusCode = status;
  res.end(JSON.stringify(data));
}

function buffer(req) {
  return new Promise((resolve, reject) => {
    let chunks = [];
    req.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return send(res, 200, { ok: true });
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });

  const raw = await buffer(req);
  let input;
  try {
    input = JSON.parse(raw.toString('utf8'));
  } catch (e) {
    return send(res, 400, { error: 'Invalid JSON data' });
  }

  const required = ['items','total','deliveryCharge','cartTotal','email','firstName','lastName','address','city','state','zip','phone','delivery'];
  for (const f of required) {
    if (input[f] === undefined || input[f] === null) {
      return send(res, 400, { error: `Missing required field: ${f}` });
    }
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const items = input.items || [];
    const deliveryCharge = Number(input.deliveryCharge || 0);
    const email = input.email;
    const { firstName, lastName, address, city, state, zip, phone, delivery } = input;

    const line_items = [];
    for (const item of items) {
      const priceStr = String(item.price || '0');
      const price = parseFloat(priceStr.replace(/LKR\s*/i, '').replace(/,/g, '')) || 0;
      line_items.push({
        price_data: {
          currency: 'lkr',
          product_data: {
            name: item.name,
            description: item.description || '',
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: item.quantity || 1,
      });
    }

    line_items.push({
      price_data: {
        currency: 'lkr',
        product_data: {
          name: `Delivery (${delivery})`,
          description: 'Shipping fee',
        },
        unit_amount: Math.round(deliveryCharge * 100),
      },
      quantity: 1,
    });

    const origin = req.headers.origin || (req.headers.host ? `https://${req.headers.host}` : 'http://localhost');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout.html`,
      customer_email: email,
      metadata: { firstName, lastName, address, city, state, zip, phone, delivery },
      shipping_address_collection: { allowed_countries: ['LK'] },
    });

    return send(res, 200, { sessionId: session.id, publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
  } catch (err) {
    console.error('Stripe/Create Session Error:', err);
    const message = err && err.message ? err.message : 'An error occurred while processing your request';
    return send(res, 400, { error: message });
  }
};
