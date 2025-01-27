import React, { useState } from 'react';
import { History, CreditCard, Loader2 } from 'lucide-react';
import classNames from 'classnames';
import { useBilling } from '@/hooks/useBilling';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatCredits, formatCurrency } from '@/utils/format';

type Tab = 'usage' | 'transactions' | 'recent';

export default function UsageHistorySidebar() {
  const [activeTab, setActiveTab] = useState<Tab>('usage');
  const { transactions, isLoading: isLoadingBilling } = useBilling();
  const { analytics, isLoading: isLoadingAnalytics } = useAnalytics();

  const TabButton = ({ tab, label }: { tab: Tab; label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={classNames(
        "flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors",
        activeTab === tab 
          ? "bg-blue-500/20 text-blue-400 border border-blue-500/20" 
          : "text-gray-400 hover:text-gray-300"
      )}
    >
      {label}
    </button>
  );

  // Empty state for transactions
  const EmptyTransactions = () => (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <CreditCard className="h-8 w-8 text-gray-400 mb-2" />
      <p className="text-sm text-gray-400">No transactions yet</p>
      <p className="text-xs text-gray-500">Your transaction history will appear here</p>
    </div>
  );

  const isLoading = isLoadingBilling || isLoadingAnalytics;

  return (
    <div className="lg:sticky lg:top-4">
      <div className="flex items-center space-x-2 mb-3 sm:mb-4">
        <History className="h-5 w-5 text-gray-400" />
        <h2 className="text-lg font-semibold text-white">Activity</h2>
      </div>

      <div className="flex space-x-2 mb-4">
        <TabButton tab="usage" label="Usage History" />
        <TabButton tab="transactions" label="Transactions" />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : activeTab === 'usage' ? (
        <div className="grid gap-2 sm:gap-3">
          {analytics?.recent_calls?.map((call) => (
            <div
              key={call.created_at}
              className="p-3 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-white">{call.service_name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(call.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-sm font-medium text-red-400">-{call.service_cost} credits</span>
              </div>
            </div>
          ))}
        </div>
      ) : transactions.length === 0 ? (
        <EmptyTransactions />
      ) : (
        <div className="grid gap-2 sm:gap-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-3 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-medium text-white capitalize">
                    {transaction.transaction_type.toLowerCase().replace('_', ' ')}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-400">
                    {formatCurrency(transaction.amount_usd)}
                  </p>
                  <p className="text-xs text-gray-400">
                    +{formatCredits(transaction.credits)} credits
                  </p>
                </div>
              </div>
              {transaction.card_last_four && (
                <div className="flex items-center text-xs text-gray-500">
                  <CreditCard className="h-3 w-3 mr-1" />
                  •••• {transaction.card_last_four}
                </div>
              )}
              {transaction.status !== 'completed' && (
                <div className={classNames(
                  "mt-2 px-2 py-1 text-xs font-medium rounded-lg inline-block",
                  transaction.status === 'pending' 
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
                )}>
                  {transaction.status}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 