import React from 'react';
import { Calculator } from 'lucide-react';
import CreditPackages from './CreditPackages';
import { useCheckout } from '@/hooks/useCheckout';

interface CreditPackagesSectionProps {
  selectedPackage: string;
  onSelect: (packageId: string) => void;
  onCustomAmount: () => void;
}

export default function CreditPackagesSection({
  selectedPackage,
  onSelect,
  onCustomAmount,
}: CreditPackagesSectionProps) {
  const { createCheckoutSession, isLoading, error } = useCheckout();

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
        <h2 className="text-lg font-semibold text-white">
          Purchase Credits
        </h2>
        <button
          onClick={onCustomAmount}
          className="flex items-center justify-center px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 
                   text-blue-400 text-sm font-medium rounded-xl transition-colors border border-blue-500/20 w-full sm:w-auto"
        >
          <Calculator className="h-4 w-4 mr-1.5" />
          Custom Amount
        </button>
      </div>

      <CreditPackages
        selectedPackage={selectedPackage}
        onSelect={onSelect}
        onCheckout={createCheckoutSession}
        isLoading={isLoading}
      />

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
} 