export interface CreditBalance {
    balance: number;
    balance_usd: string;
}
  
export interface BillingState {
    balance: CreditBalance | null;
    isLoading: boolean;
    error: string | null;
  }
  