import { useState } from 'react';
import { useNetwork } from '@/hooks/useNetwork';

interface CheckoutResponse {
  checkout_url: string;
  session_id: string;
}

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { makeRequest } = useNetwork();

  const createCheckoutSession = async (amount: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await makeRequest<CheckoutResponse>({
        method: 'POST',
        url: '/billing/checkout_session',
        data: {
          amount_usd: amount,
          success_url: `${window.location.origin}/billing/success`,
          cancel_url: `${window.location.origin}/billing/cancel`
        }
      });

      if (error) {
        throw new Error(error);
      }

      if (!data?.checkout_url) {
        throw new Error('Invalid response from server');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.checkout_url;
      
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process checkout');
      return { error: err instanceof Error ? err.message : 'Failed to process checkout' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCheckoutSession,
    isLoading,
    error,
  };
} 