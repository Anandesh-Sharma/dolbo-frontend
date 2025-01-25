import { useState, useCallback } from 'react';
import { loadStripe, StripeElements } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51IorlrSAhyI7KUFLb4YFYkv9Yk1Fpb8AukSTCELhobIEvNZOCH31AYf96oEyOAqFA4jGZOWGxglu9RMvn107Bd6Z00JDQsoNCj');

export const useStripe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPaymentMethod = useCallback(async (elements: StripeElements) => {
    if (!elements) return;

    setIsLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement('card')!,
      });

      if (error) {
        throw new Error(error.message);
      }

      return paymentMethod;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create payment method');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createPaymentMethod,
    isLoading,
    error,
  };
}; 