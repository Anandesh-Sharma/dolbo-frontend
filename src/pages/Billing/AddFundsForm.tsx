import React, { useState } from 'react';
import { CreditCard, DollarSign } from 'lucide-react';
import PaymentMethodSelectModal from '../../components/PaymentMethodSelectModal';

const PRESET_AMOUNTS = [100, 500, 1000, 5000];

export default function AddFundsForm() {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaymentModalOpen(true);
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    setIsLoading(true);
    // Handle payment processing here
    setTimeout(() => {
      setIsLoading(false);
      setIsPaymentModalOpen(false);
    }, 1000);
  };

  return (
    <>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Add Funds</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Amount
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset.toString())}
                  className={`px-4 py-2 rounded-lg border ${
                    amount === preset.toString()
                      ? 'border-blue-500 bg-blue-500/10 text-blue-500'
                      : 'border-gray-700 hover:border-gray-600 text-gray-300'
                  } transition-colors duration-200`}
                >
                  ${preset}
                </button>
              ))}
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter custom amount"
                className="block w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !amount}
            className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <CreditCard className="h-5 w-5 mr-2" />
            {isLoading ? 'Processing...' : 'Add Funds'}
          </button>
        </form>
      </div>

      <PaymentMethodSelectModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onContinue={handlePaymentMethodSelect}
        amount={amount}
      />
    </>
  );
}