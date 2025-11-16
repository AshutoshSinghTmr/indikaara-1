import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Button from '../components/Button';

const PaymentFailurePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [errorDetails, setErrorDetails] = useState(null);

  useEffect(() => {
    // Get error details from URL parameters
    const reason = searchParams.get('reason');
    const txnid = searchParams.get('txnid');
    const errorCode = searchParams.get('errorCode');

    setErrorDetails({
      reason: reason || 'Payment could not be processed',
      txnid,
      errorCode
    });
  }, [searchParams]);

  return (
    <main className="container mx-auto max-w-2xl px-4 py-16 pt-32">
      <div className="text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-red-600 mb-3">
          Payment Failed
        </h1>

        {/* Message */}
        <p className="text-lg text-text-secondary mb-8">
          Unfortunately, your payment could not be processed. Please try again or contact support if the problem persists.
        </p>

        {/* Error Details Box */}
        {errorDetails && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="space-y-3 text-left">
              <div>
                <p className="text-sm text-red-600 font-medium">Reason</p>
                <p className="text-red-800">{errorDetails.reason}</p>
              </div>
              {errorDetails.errorCode && (
                <div>
                  <p className="text-sm text-red-600 font-medium">Error Code</p>
                  <p className="font-mono text-red-800">{errorDetails.errorCode}</p>
                </div>
              )}
              {errorDetails.txnid && (
                <div>
                  <p className="text-sm text-red-600 font-medium">Transaction ID</p>
                  <p className="font-mono text-red-800">{errorDetails.txnid}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Troubleshooting Box */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-yellow-900 mb-3">What you can try:</h3>
          <ul className="text-sm text-yellow-800 space-y-2 text-left">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Verify your payment details are correct</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Check that your card has sufficient funds</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Try a different payment method</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Clear your browser cache and try again</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex-1"
          >
            <Button variant="primary" className="w-full">
              Try Again
            </Button>
          </button>
          <Link to="/cart" className="flex-1">
            <Button variant="secondary" className="w-full">
              Back to Cart
            </Button>
          </Link>
        </div>

        {/* Contact Support */}
        <div className="bg-card-bg border border-border-color rounded-lg p-6 mb-6">
          <p className="text-text-secondary mb-3">
            Still having trouble? We're here to help!
          </p>
          <Link to="/contact" className="text-primary hover:text-accent font-medium">
            Contact Our Support Team
          </Link>
        </div>

        {/* Back to Home Link */}
        <Link to="/" className="text-primary hover:underline inline-block">
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default PaymentFailurePage;
