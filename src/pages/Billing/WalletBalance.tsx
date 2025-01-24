import React from 'react';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function WalletBalance() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Wallet className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">Wallet Balance</h3>
            <p className="text-sm text-gray-400">Available credits for API usage</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">$2,458.00</div>
          <div className="flex items-center text-sm text-green-500">
            <TrendingUp className="h-4 w-4 mr-1" />
            +12.5% this month
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-900/50 rounded-lg p-4">
          <div className="flex items-center text-green-500">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            Income
          </div>
          <div className="mt-2 text-lg font-medium text-white">$3,240.00</div>
          <div className="text-sm text-gray-400">Last 30 days</div>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4">
          <div className="flex items-center text-red-500">
            <ArrowDownRight className="h-4 w-4 mr-1" />
            Spent
          </div>
          <div className="mt-2 text-lg font-medium text-white">$782.00</div>
          <div className="text-sm text-gray-400">Last 30 days</div>
        </div>
      </div>
    </div>
  );
}