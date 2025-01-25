import React, { useState } from 'react';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51IorlrSAhyI7KUFLb4YFYkv9Yk1Fpb8AukSTCELhobIEvNZOCH31AYf96oEyOAqFA4jGZOWGxglu9RMvn107Bd6Z00JDQsoNCj');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#fff',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      lineHeight: '1.5',
      backgroundColor: '#1a1a1a',
      '::placeholder': {
        color: '#6b7280'
      },
      ':-webkit-autofill': {
        color: '#fff',
        backgroundColor: '#1a1a1a'
      },
    },
    invalid: {
      color: '#ef4444',
      iconColor: '#ef4444'
    }
  },
  hidePostalCode: true,
  classes: {
    base: 'stripe-element',
    complete: 'stripe-element--complete',
    empty: 'stripe-element--empty',
    focus: 'stripe-element--focus',
    invalid: 'stripe-element--invalid',
  }
};

const CardForm = ({ onCancel }: { onCancel: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setError(null);

    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
      });

      if (stripeError) {
        console.error('Stripe Error:', stripeError);
        setError(stripeError.message ?? 'An error occurred');
        return;
      }

      console.log('Successfully added card:', {
        id: paymentMethod.id,
        brand: paymentMethod.card?.brand,
        last4: paymentMethod.card?.last4,
        expMonth: paymentMethod.card?.exp_month,
        expYear: paymentMethod.card?.exp_year,
        funding: paymentMethod.card?.funding,
        country: paymentMethod.card?.country,
      }, paymentMethod);

      // Here you would typically send the paymentMethod.id to your backend
      // await addCardToBackend(paymentMethod.id);
      
      onCancel(); // Close the form on success
    } catch (err) {
      console.error('Error adding card:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <style jsx global>{`
        .stripe-element {
          padding: 16px;
          border-radius: 12px;
          background-color: #1a1a1a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: border-color 0.15s ease;
        }
        .stripe-element--focus {
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        .stripe-element--invalid {
          border-color: rgba(239, 68, 68, 0.4);
        }
      `}</style>

      <div>
        <label className="block text-lg font-medium text-white mb-2">
          Card details
        </label>
        <CardElement 
          options={CARD_ELEMENT_OPTIONS}
          className="w-full"
        />
      </div>

      {error && (
        <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isLoading}
          className="min-w-[120px] px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Add Card'
          )}
        </button>
      </div>
    </form>
  );
};

interface StripeCardFormWrapperProps {
  onCancel: () => void;
}

export default function StripeCardFormWrapper(props: StripeCardFormWrapperProps) {
  return (
    <Elements stripe={stripePromise}>
      <CardForm {...props} />
    </Elements>
  );
} 