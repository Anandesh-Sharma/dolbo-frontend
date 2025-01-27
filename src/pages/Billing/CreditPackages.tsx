import React, { useState } from 'react';
import { Check, Sparkles, Loader2 } from 'lucide-react';
import classNames from 'classnames';

interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  discount?: number;
  isPopular?: boolean;
}

interface CreditPackagesProps {
  selectedPackage: string;
  onSelect: (packageId: string) => void;
  onCheckout: (amount: number) => void;
  isLoading?: boolean;
}

const packages: CreditPackage[] = [
  {
    id: 'basic',
    credits: 100,
    price: 1,
  },
  {
    id: 'starter',
    credits: 600,
    price: 5,
    discount: 10,
  },
  {
    id: 'pro',
    credits: 1500,
    price: 10,
    discount: 20,
    isPopular: true,
  },
  {
    id: 'enterprise',
    credits: 5000,
    price: 25,
    discount: 35,
  }
];

export default function CreditPackages({ 
  selectedPackage, 
  onSelect, 
  onCheckout,
  isLoading 
}: CreditPackagesProps) {
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null);
  
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  
  const calculateSavings = (credits: number, price: number, discount: number) => {
    const originalPrice = (credits / 100);
    const savings = originalPrice - price;
    return savings.toFixed(2);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {packages.map((pkg) => {
          const isSelected = selectedPackage === pkg.id;
          const isHovered = hoveredPackage === pkg.id;
          
          return (
            <div
              key={pkg.id}
              onClick={() => {
                onSelect(pkg.id);
                if (isSelected) {
                  onCheckout(pkg.price);
                }
              }}
              onMouseEnter={() => setHoveredPackage(pkg.id)}
              onMouseLeave={() => setHoveredPackage(null)}
              className={classNames(
                "relative p-3 rounded-xl border transition-all cursor-pointer",
                isSelected
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-800 hover:border-gray-700 bg-gray-800/20"
              )}
            >
              {pkg.isPopular && (
                <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-blue-500 text-white text-xs font-medium rounded-full">
                  Popular
                </div>
              )}
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {pkg.credits.toLocaleString()} Credits
                  </h3>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-xl font-bold text-white">
                      {formatPrice(pkg.price)}
                    </span>
                    {pkg.discount && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(pkg.credits / 100)}
                        </span>
                        <span className="px-1.5 py-0.5 bg-green-500/10 text-green-400 text-xs font-medium rounded">
                          Save {pkg.discount}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {isSelected && !isHovered && (
                  <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>

              {pkg.discount && (
                <p className="text-xs text-gray-400 mt-1">
                  {(pkg.credits / pkg.price).toFixed(0)} credits per dollar
                </p>
              )}

              {isSelected && (
                <div className={`mt-2 transition-all duration-200 ${
                  isSelected ? 'opacity-100 h-8' : 'opacity-0 h-0 overflow-hidden'
                }`}>
                  <button
                    onClick={() => onCheckout(pkg.price)}
                    disabled={isLoading}
                    className={`flex items-center justify-center w-full py-1.5 px-3 
                      bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg 
                      transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Continue to Payment'
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Sparkles className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-300">
              Credits never expire and can be used for any AI-powered feature in the application.
              The more credits you buy, the more you save!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 