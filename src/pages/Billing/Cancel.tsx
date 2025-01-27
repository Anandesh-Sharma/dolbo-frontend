import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowRight, Loader2 } from 'lucide-react';

export default function BillingCancelPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/dashboard/billing');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="p-3 bg-red-500/10 rounded-full w-fit mx-auto">
          <XCircle className="h-12 w-12 text-red-500" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Payment Cancelled
          </h1>
          <p className="text-gray-400">
            Your payment was cancelled. No charges were made.
          </p>
        </div>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Redirecting in {countdown} seconds...</span>
          </div>

          <button
            onClick={() => navigate('/dashboard/billing')}
            className="inline-flex items-center px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 
                     text-blue-400 text-sm font-medium rounded-xl transition-colors border border-blue-500/20"
          >
            Return to Billing
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
} 