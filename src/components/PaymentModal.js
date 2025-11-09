import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const PaymentModal = ({ status, onClose }) => {
  const isSuccess = status === "success";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="text-center">
          {/* Success/Failure Icon */}
          <div
            className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
              isSuccess ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isSuccess ? (
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>

          {/* Title */}
          <h2 className="mt-4 text-2xl font-bold text-primary">
            {isSuccess ? "Payment Successful!" : "Payment Failed"}
          </h2>

          {/* Message */}
          <p className="mt-2 text-text-secondary">
            {isSuccess
              ? "Your order has been placed successfully. You will receive a confirmation email shortly."
              : "We were unable to process your payment. Please try again or contact support if the problem persists."}
          </p>

          {/* Actions */}
          <div className="mt-6 space-y-3">
            {isSuccess ? (
              <>
                <Link to="/orders" className="block">
                  <Button variant="primary" className="w-full">
                    View Orders
                  </Button>
                </Link>
                <Link to="/" className="block">
                  <Button variant="secondary" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Button variant="primary" className="w-full" onClick={onClose}>
                  Try Again
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
