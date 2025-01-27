import { atom } from 'recoil';
import { BillingState } from '../../types/billing';

export const billingState = atom<BillingState>({
  key: 'billingState',
  default: {
    balance: null,
    isLoading: false,
    error: null,
  },
}); 