import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Button from "../components/Button";
import PaymentModal from "../components/PaymentModal";

/**
 * CheckoutPage Component - Checkout page with shipping and payment details
 */
const CheckoutPage = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Get order details from location state or localStorage
    const orderFromState = location.state;
    const orderFromStorage = JSON.parse(localStorage.getItem("pendingOrder"));

    if (orderFromState) {
      setOrderDetails(orderFromState);
    } else if (orderFromStorage) {
      setOrderDetails(orderFromStorage);
    } else {
      // If no order details found, redirect to cart
      navigate("/cart");
    }
  }, [location, navigate]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' | 'failure' | null

  // Check for payment status in URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    const payuStatus = params.get("payuStatus");

    // Clear the URL parameters without reloading the page
    window.history.replaceState({}, "", window.location.pathname);

    if (status === "success" || payuStatus === "success") {
      setPaymentStatus("success");
      // Clear cart on successful payment
      clearCart();
    } else if (status === "failure" || payuStatus === "failure") {
      setPaymentStatus("failure");
    }
  }, [clearCart]);

  // Reset payment status
  const handleCloseModal = () => {
    setPaymentStatus(null);
    setIsProcessing(false);
  };

  // Handle form submission and PayU payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      if (!orderDetails) {
        throw new Error("No order details found");
      }

      const API_BASE = "https://backend-wei5.onrender.com";
      const jwt = localStorage.getItem("token");

      // Initiate payment on server
      const initResp = await fetch(`${API_BASE}/api/payu/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
        },
        body: JSON.stringify({
          orderId: orderDetails._id,
          txnid: orderDetails.txnid,
        }),
      });

      if (!initResp.ok) {
        throw new Error("Failed to initiate payment");
      }

      const { formData, paymentUrl } = await initResp.json();

      // Create and submit form to PayU
      const form = document.createElement("form");
      form.method = "POST";
      form.action = paymentUrl;

      // Add form fields
      Object.entries(formData || {}).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Failed to initiate payment. Please try again.");
      setIsProcessing(false);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <main className="container mx-auto max-w-7xl px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-3">
            No Items to Checkout
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Your cart is empty. Add some items before proceeding to checkout.
          </p>
          <Link to="/catalogue">
            <Button variant="primary" size="lg" className="w-full">
              Browse Products
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 pt-24">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Link to="/" className="text-primary hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link to="/cart" className="text-primary hover:underline">
            Cart
          </Link>
          <span>/</span>
          <span className="text-primary font-medium">Checkout</span>
        </div>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Checkout</h1>
        <div className="inline-flex items-center gap-2 bg-card-bg border border-border-color rounded-full px-4 py-2">
          <svg
            className="w-4 h-4 text-accent"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-primary text-sm font-medium">
            Authenticity Guaranteed – Fair Trade with Artisans
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Payment and Transaction Details */}
          <div className="space-y-8">
            <section className="bg-card-bg border border-border-color rounded-xl p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Transaction Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border-color">
                  <span className="text-text-secondary font-medium">
                    Transaction ID
                  </span>
                  <span className="font-mono text-primary bg-background px-3 py-1 rounded-md border border-border-color">
                    {orderDetails?.txnid || "Loading..."}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border-color">
                  <span className="text-text-secondary font-medium">
                    Order Total
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {formatCurrency(orderDetails?.totalPrice || 0)}
                  </span>
                </div>
              </div>
            </section>

            {/* Payment Method - Only PayU */}
            <section className="bg-card-bg border border-border-color rounded-xl p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Payment Method
              </h2>
              <div className="p-4 border rounded-lg bg-background/50 border-accent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-8 h-8 text-accent"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                        strokeWidth="2"
                      />
                      <path d="M3 10H21" strokeWidth="2" />
                    </svg>
                    <span className="text-primary font-medium">
                      PayU Payment Gateway
                    </span>
                  </div>
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-sm text-text-secondary">
                  You'll be redirected to PayU's secure payment gateway to
                  complete your purchase.
                </p>
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card-bg border border-border-color rounded-xl p-6 sticky top-8">
              <h2 className="text-xl font-bold text-primary mb-6">
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 bg-center bg-cover rounded-lg flex-shrink-0"
                      style={{ backgroundImage: `url("${item.image}")` }}
                      role="img"
                      aria-label={item.title}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-primary font-medium truncate">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary text-sm">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="text-primary font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Transaction Details */}
              <div className="border-t border-border-color pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Transaction ID</span>
                  <span className="text-primary font-mono bg-background/50 px-3 py-1 rounded-md border border-border-color">
                    {orderDetails?.txnid || "Loading..."}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-primary">Order Total</span>
                  <span className="text-primary">
                    {formatCurrency(orderDetails?.totalPrice || 0)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-8"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Payment Status Modal */}
      {paymentStatus && (
        <PaymentModal status={paymentStatus} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default CheckoutPage;
