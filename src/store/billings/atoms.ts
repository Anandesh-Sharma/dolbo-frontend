import { atom } from 'recoil';
import { BillingState } from '../../types/billings';

export const billingState = atom<BillingState>({
  key: 'billingState',
  default: {
    balance: null,
    transactions: [],
    isLoading: false,
    error: null,
  },
});