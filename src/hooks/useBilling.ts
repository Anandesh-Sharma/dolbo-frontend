import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNetwork } from './useNetwork';
import { billingState } from '@/store/billings';

interface CreditBalance {
  balance: number;
  balance_usd: string;
}

export function useBilling() {
  const [state, setState] = useRecoilState(billingState);
  const { makeRequest } = useNetwork();

  const fetchBalance = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const { data, error } = await makeRequest<CreditBalance>({
        method: 'GET',
        url: '/api/billing/credit_balance',
      });

      if (error) {
        throw new Error(error);
      }

      if (!data) {
        throw new Error('Failed to fetch balance');
      }

      setState(prev => ({ ...prev, balance: data, isLoading: false }));
    } catch (err) {
      console.error('Balance fetch error:', err);
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to fetch balance',
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return {
    balance: state.balance,
    isLoading: state.isLoading,
    error: state.error,
    refetchBalance: fetchBalance,
  };
} 