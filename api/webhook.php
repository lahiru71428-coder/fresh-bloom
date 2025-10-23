<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../vendor/autoload.php';

// Set content type for webhook
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    // Initialize Stripe
    \Stripe\Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
    
    // Get the request body and signature
    $payload = @file_get_contents('php://input');
    $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '';
    $webhook_secret = env('STRIPE_WEBHOOK_SECRET');
    
    if (!$webhook_secret) {
        error_log('Webhook secret not configured');
        http_response_code(400);
        echo json_encode(['error' => 'Webhook not configured']);
        exit;
    }
    
    // Verify the webhook signature
    try {
        $event = \Stripe\Webhook::constructEvent($payload, $sig_header, $webhook_secret);
    } catch(\UnexpectedValueException $e) {
        error_log('Invalid payload: ' . $e->getMessage());
        http_response_code(400);
        echo json_encode(['error' => 'Invalid payload']);
        exit;
    } catch(\Stripe\Exception\SignatureVerificationException $e) {
        error_log('Invalid signature: ' . $e->getMessage());
        http_response_code(400);
        echo json_encode(['error' => 'Invalid signature']);
        exit;
    }
    
    // Handle the event
    switch ($event->type) {
        case 'checkout.session.completed':
            $session = $event->data->object;
            
            // Log the successful payment
            error_log('Payment successful: ' . $session->id);
            error_log('Customer: ' . $session->customer_email);
            error_log('Amount: ' . $session->amount_total . ' ' . strtoupper($session->currency));
            
            // Log customer metadata
            if ($session->metadata) {
                error_log('Customer details: ' . json_encode($session->metadata));
            }
            
            // Custom success handler
            handleSuccessfulPayment($session);
            break;
            
        case 'payment_intent.succeeded':
            $payment_intent = $event->data->object;
            error_log('Payment intent succeeded: ' . $payment_intent->id);
            break;
            
        case 'payment_intent.payment_failed':
            $payment_intent = $event->data->object;
            error_log('Payment failed: ' . $payment_intent->id);
            // Handle failed payment - maybe send notification
            break;
            
        default:
            error_log('Unhandled event type: ' . $event->type);
    }
    
    http_response_code(200);
    echo json_encode(['received' => true]);
    
} catch (Exception $e) {
    error_log('Webhook error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
}

function handleSuccessfulPayment($session) {
    // This is where you would typically:
    // 1. Save the order to your database
    // 2. Send confirmation email
    // 3. Update inventory
    // 4. Generate receipt/invoice
    
    $orderData = [
        'stripe_session_id' => $session->id,
        'customer_email' => $session->customer_email,
        'amount_total' => $session->amount_total,
        'currency' => $session->currency,
        'payment_status' => $session->payment_status,
        'customer_details' => $session->metadata,
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    // Log the order data (in a real application, you'd save this to a database)
    error_log('Order data: ' . json_encode($orderData));
    
    // You could also save to a JSON file for simple storage:
    // file_put_contents('orders/' . $session->id . '.json', json_encode($orderData, JSON_PRETTY_PRINT));
}
