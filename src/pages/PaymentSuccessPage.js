import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Get order details from URL or localStorage
    const txnid = searchParams.get('txnid');
    const orderId = searchParams.get('orderId');
    
    if (txnid || orderId) {
      // Could fetch order details from API here
      setOrderDetails({
        txnid,
        orderId
      });
    }

    // Clear cart on success
    clearCart();
  }, [searchParams, clearCart]);

  return (
    <main className="container mx-auto max-w-2xl px-4 py-16 pt-32">
      <div className="text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-primary mb-3">
          Payment Successful!
        </h1>

        {/* Message */}
        <p className="text-lg text-text-secondary mb-8">
          Thank you for your purchase. Your order has been confirmed and is being processed.
        </p>

        {/* Order Details Box */}
        {orderDetails && (
          <div className="bg-card-bg border border-border-color rounded-lg p-6 mb-8">
            <div className="space-y-3">
              {orderDetails.txnid && (
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Transaction ID</span>
                  <span className="font-mono text-primary font-medium">{orderDetails.txnid}</span>
                </div>
              )}
              {orderDetails.orderId && (
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Order ID</span>
                  <span className="font-mono text-primary font-medium">{orderDetails.orderId}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Information Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Order Confirmation</p>
                <p>A confirmation email has been sent to your registered email address.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Quick Dispatch</p>
                <p>Your order will be dispatched within 48 hours.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Track Your Order</p>
                <p>You can track your order status from your account dashboard.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/orders" className="flex-1">
            <Button variant="primary" className="w-full">
              View My Orders
            </Button>
          </Link>
          <Link to="/catalogue" className="flex-1">
            <Button variant="secondary" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Back to Home Link */}
        <Link to="/" className="text-primary hover:underline mt-6 inline-block">
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default PaymentSuccessPage;
