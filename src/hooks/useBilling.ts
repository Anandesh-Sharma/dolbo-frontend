import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { useNetwork } from './useNetwork';
import { billingState } from '@/store/billings';
import { Transaction } from '@/types/billings';

interface CreditBalance {
  balance: number;
  balance_usd: string;
}

export function useBilling() {
  const [state, setState] = useRecoilState(billingState);
  const { makeRequest } = useNetwork();

  const fetchBalance = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const { data, error } = await makeRequest<CreditBalance>({
        method: 'GET',
        url: '/billing/credit_balance',
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
  }, []);

  const fetchTransactions = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const { data, error } = await makeRequest<Transaction[]>({
        method: 'GET',
        url: '/billing/transactions',
      });

      if (error) {
        throw new Error(error);
      }

      if (!data) {
        throw new Error('Failed to fetch transactions');
      }

      setState(prev => ({ ...prev, transactions: data, isLoading: false }));
    } catch (err) {
      console.error('Transactions fetch error:', err);
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to fetch transactions',
        isLoading: false,
      }));
    }
  }, []);

  return {
    balance: state.balance,
    transactions: state.transactions,
    isLoading: state.isLoading,
    error: state.error,
    refetchBalance: fetchBalance,
    refetchTransactions: fetchTransactions,
    fetchBalance,
    fetchTransactions
  };
} 