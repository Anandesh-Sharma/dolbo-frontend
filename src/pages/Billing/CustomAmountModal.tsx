import React, { useState, useCallback } from 'react';
import { X, Calculator, Loader2 } from 'lucide-react';
import Modal from 'react-modal';
import { debounce } from 'lodash';
import { useCheckout } from '@/hooks/useCheckout';

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(4px)',
    zIndex: 50,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth: '28rem',
    width: '95%',
    padding: 0,
    border: 'none',
    borderRadius: '1.5rem',
    backgroundColor: '#1a1a1a',
    boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.05), 0 10px 30px -10px rgba(0, 0, 0, 0.5)',
  },
};

interface CustomAmountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomAmountModal({
  isOpen,
  onClose,
}: CustomAmountModalProps) {
  const [amount, setAmount] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedCredits, setCalculatedCredits] = useState<number | null>(null);
  const { createCheckoutSession, isLoading: isCheckoutLoading, error: checkoutError } = useCheckout();

  // Mock API calculation
  const calculateCredits = async (dollars: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock calculation logic
    const baseRate = 100;
    let credits = dollars * baseRate;
    
    if (dollars >= 25) credits *= 1.35;
    else if (dollars >= 10) credits *= 1.20;
    else if (dollars >= 5) credits *= 1.10;
    
    return Math.floor(credits);
  };

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce(async (value: number) => {
      setIsCalculating(true);
      const credits = await calculateCredits(value);
      setCalculatedCredits(credits);
      setIsCalculating(false);
    }, 500),
    []
  );

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    
    if (value === '' || (/^\d*\.?\d{0,2}$/.test(value) && parseFloat(value) <= 1000)) {
      setAmount(value);
      
      if (value && parseFloat(value) >= 1) {
        setIsCalculating(true);
        debouncedCalculate(parseFloat(value));
      } else {
        setCalculatedCredits(null);
      }
    }
  };

  const handleCheckout = async () => {
    if (!amount || parseFloat(amount) < 1) return;
    await createCheckoutSession(parseFloat(amount));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      contentLabel="Custom Credit Amount"
    >
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <Calculator className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Custom Amount
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-2xl font-semibold text-gray-400">$</span>
              </div>
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                className="w-full pl-10 pr-4 py-4 bg-gray-900 border-2 border-gray-800 focus:border-blue-500 rounded-2xl
                         text-2xl font-semibold text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                         transition-all"
              />
            </div>

            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
              {isCalculating ? (
                <div className="space-y-2 animate-pulse">
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="h-5 w-24 bg-gray-800 rounded" />
                    <div className="flex items-baseline space-x-2">
                      <div className="h-8 w-32 bg-gray-800 rounded" />
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <div className="h-4 w-16 bg-gray-800 rounded" />
                    <div className="h-4 w-28 bg-gray-800 rounded" />
                  </div>
                </div>
              ) : calculatedCredits ? (
                <>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-gray-400">You'll receive</span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-white animate-fadeIn">
                        {calculatedCredits.toLocaleString()}
                      </span>
                      <span className="text-gray-400">credits</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="text-gray-500">Rate</span>
                    <span className="text-blue-400 font-medium">
                      {(calculatedCredits / parseFloat(amount)).toFixed(0)} credits/$
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center py-2 text-gray-500">
                  Enter an amount to see credit calculation
                </div>
              )}
            </div>

            {calculatedCredits !== null && (
              <div className="animate-fadeIn">
                {checkoutError && (
                  <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {checkoutError}
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={isCheckoutLoading}
                  className="w-full mt-4 py-3 px-4 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50
                           text-white font-medium rounded-xl transition-colors"
                >
                  {isCheckoutLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <span>Pay ${amount}</span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
} 