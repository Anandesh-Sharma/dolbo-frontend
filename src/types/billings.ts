export interface BillingState {
    balance: CreditBalance | null;
    isLoading: boolean;
    error: string | null;
}
  
export interface CreditBalance {
  balance: number;
  balance_usd: string;
}

export interface Transaction {
  id: string;
  transaction_type: string;
  status: string;
  amount_usd: string;
  credits: number;
  description: string;
  created_at: string;
  card_last_four: string;
}

export interface BillingState {
  balance: CreditBalance | null;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
} 