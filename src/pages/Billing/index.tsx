import React from 'react';
import WalletBalance from './WalletBalance';
import PaymentMethods from './PaymentMethods';
import TransactionHistory from './TransactionHistory';
import AddFundsForm from './AddFundsForm';

export default function Billing() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Billing & Payments</h2>
        <p className="mt-1 text-gray-400">Manage your wallet and payment methods</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <WalletBalance />
          <AddFundsForm />
          <TransactionHistory />
        </div>
        <div>
          <PaymentMethods />
        </div>
      </div>
    </div>
  );
}