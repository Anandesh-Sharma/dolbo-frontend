import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const transactions = [
  {
    id: 1,
    type: 'credit',
    amount: 500,
    description: 'Added funds',
    date: '2024-03-15 14:30',
    status: 'completed'
  },
  {
    id: 2,
    type: 'debit',
    amount: 42.50,
    description: 'API Usage - Face Recognition',
    date: '2024-03-14 09:15',
    status: 'completed'
  },
  // Add more transactions as needed
];

export default function TransactionHistory() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">Transaction History</h3>
      </div>
      <div className="divide-y divide-gray-700">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'credit' 
                    ? 'bg-green-500/10' 
                    : 'bg-red-500/10'
                }`}>
                  {transaction.type === 'credit' ? (
                    <ArrowUpRight className={`h-5 w-5 ${
                      transaction.type === 'credit' 
                        ? 'text-green-500' 
                        : 'text-red-500'
                    }`} />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-white">{transaction.description}</div>
                  <div className="text-sm text-gray-400">{transaction.date}</div>
                </div>
              </div>
              <div className={`text-right ${
                transaction.type === 'credit' 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }`}>
                {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}