import React, { useState } from 'react';
import { Calculator, Loader2 } from 'lucide-react';

interface CustomCreditPlanProps {
  onSelect: (amount: number) => void;
}

export default function CustomCreditPlan({ onSelect }: CustomCreditPlanProps) {
  const [amount, setAmount] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedCredits, setCalculatedCredits] = useState<number | null>(null);

  // Mock API call
  const calculateCredits = async (dollars: number) => {
    setIsCalculating(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock calculation logic (you'd replace this with actual API call)
    const baseRate = 100; // 100 credits per $1
    let credits = dollars * baseRate;
    
    // Mock volume discount
    if (dollars >= 25) credits *= 1.35;
    else if (dollars >= 10) credits *= 1.20;
    else if (dollars >= 5) credits *= 1.10;
    
    return Math.floor(credits);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    if (value === '' || (/^\d*\.?\d{0,2}$/.test(value) && parseFloat(value) <= 1000)) {
      setAmount(value);
      setCalculatedCredits(null);
    }
  };

  const handleCalculate = async () => {
    if (!amount || parseFloat(amount) < 1) return;
    
    setCalculatedCredits(null);
    const credits = await calculateCredits(parseFloat(amount));
    setCalculatedCredits(credits);
    setIsCalculating(false);
  };

  return (
    <div className="p-4 rounded-2xl border border-gray-800 bg-gray-800/20 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-purple-500/20 rounded-xl">
          <Calculator className="h-5 w-5 text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">
          Custom Amount
        </h3>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">$</span>
          </div>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="w-full pl-8 pr-4 py-3 bg-gray-900/50 border border-gray-700 focus:border-purple-500 rounded-xl 
                     text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            placeholder="Enter amount"
          />
        </div>

        <button
          onClick={handleCalculate}
          disabled={!amount || parseFloat(amount) < 1 || isCalculating}
          className="w-full py-3 px-4 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50 
                   text-white font-medium rounded-xl transition-colors relative overflow-hidden"
        >
          {isCalculating ? (
            <Loader2 className="h-5 w-5 mx-auto animate-spin" />
          ) : (
            'Calculate Credits'
          )}
        </button>

        {calculatedCredits !== null && (
          <div className="animate-fadeIn">
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-gray-400">You'll receive</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-white">
                    {calculatedCredits.toLocaleString()}
                  </span>
                  <span className="text-gray-400">credits</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline text-sm">
                <span className="text-gray-400">Rate</span>
                <span className="text-purple-400">
                  {(calculatedCredits / parseFloat(amount)).toFixed(0)} credits/$
                </span>
              </div>
            </div>

            <button
              onClick={() => onSelect(parseFloat(amount))}
              className="w-full mt-4 py-3 px-4 bg-purple-500 hover:bg-purple-600 
                       text-white font-medium rounded-xl transition-colors"
            >
              Select This Amount
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 