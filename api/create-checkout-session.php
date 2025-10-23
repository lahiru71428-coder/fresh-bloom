<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../vendor/autoload.php';

setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    handleError('Method not allowed', 405);
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    handleError('Invalid JSON data', 400);
}

// Validate required fields
$required_fields = ['items', 'total', 'deliveryCharge', 'cartTotal', 'email', 'firstName', 'lastName', 'address', 'city', 'state', 'zip', 'phone', 'delivery'];
foreach ($required_fields as $field) {
    if (!isset($input[$field])) {
        handleError("Missing required field: $field", 400);
    }
}

try {
    // Initialize Stripe
    \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
    
    $items = $input['items'];
    $total = $input['total'];
    $deliveryCharge = $input['deliveryCharge'];
    $email = $input['email'];
    $firstName = $input['firstName'];
    $lastName = $input['lastName'];
    $address = $input['address'];
    $city = $input['city'];
    $state = $input['state'];
    $zip = $input['zip'];
    $phone = $input['phone'];
    $delivery = $input['delivery'];
    
    // Create line items for Stripe
    $lineItems = [];
    foreach ($items as $item) {
        $price = floatval(str_replace(['LKR ', ','], '', $item['price']));
        $lineItems[] = [
            'price_data' => [
                'currency' => 'lkr',
                'product_data' => [
                    'name' => $item['name'],
                    'description' => $item['description'] ?? '',
                    'images' => isset($item['image']) ? [$item['image']] : [],
                ],
                'unit_amount' => round($price * 100),
            ],
            'quantity' => $item['quantity'],
        ];
    }
    
    // Add delivery charge as a line item
    $lineItems[] = [
        'price_data' => [
            'currency' => 'lkr',
            'product_data' => [
                'name' => "Delivery ($delivery)",
                'description' => 'Shipping fee',
            ],
            'unit_amount' => round($deliveryCharge * 100),
        ],
        'quantity' => 1,
    ];
    
    // Get the origin URL for success/cancel redirects
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : 
              (isset($_SERVER['HTTP_HOST']) ? 'http://' . $_SERVER['HTTP_HOST'] : 'http://localhost');
    
    // Create Stripe checkout session
    $session = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card'],
        'line_items' => $lineItems,
        'mode' => 'payment',
        'success_url' => $origin . '/success.html?session_id={CHECKOUT_SESSION_ID}',
        'cancel_url' => $origin . '/checkout.html',
        'customer_email' => $email,
        'metadata' => [
            'firstName' => $firstName,
            'lastName' => $lastName,
            'address' => $address,
            'city' => $city,
            'state' => $state,
            'zip' => $zip,
            'phone' => $phone,
            'delivery' => $delivery,
        ],
        'shipping_address_collection' => [
            'allowed_countries' => ['LK'],
        ],
    ]);
    
    jsonResponse([
        'sessionId' => $session->id,
        'publishableKey' => env('STRIPE_PUBLISHABLE_KEY')
    ]);
    
} catch (\Stripe\Exception\ApiErrorException $e) {
    error_log('Stripe API Error: ' . $e->getMessage());
    handleError('Payment processing error: ' . $e->getMessage(), 400);
} catch (Exception $e) {
    error_log('General Error: ' . $e->getMessage());
    handleError('An error occurred while processing your request', 500);
}
