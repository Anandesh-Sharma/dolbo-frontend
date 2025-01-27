import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import CurrentCredits from './CurrentCredits';
import CreditPackagesSection from './CreditPackagesSection';
import UsageHistorySidebar from './UsageHistorySidebar';
import CustomAmountModal from './CustomAmountModal';

export default function BillingPage() {
  const [selectedPackage, setSelectedPackage] = useState('pro');
  const [isCustomAmountOpen, setIsCustomAmountOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 animate-fadeIn">
      {/* Compact header */}
      <div className="relative mb-4 px-3 py-2.5 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                    border border-gray-700/50 shadow-lg shadow-blue-500/5 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-blue-500/10 rounded-lg">
              <CreditCard className="h-4 w-4 text-blue-400" />
            </div>
            <h1 className="text-base font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Billing & Credits
            </h1>
          </div>
          <p className="text-xs text-gray-400">
            Manage your credits
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-4">
          <CurrentCredits />
          <CreditPackagesSection
            selectedPackage={selectedPackage}
            onSelect={setSelectedPackage}
            onCustomAmount={() => setIsCustomAmountOpen(true)}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                        border border-gray-700/50 backdrop-blur-sm">
            <UsageHistorySidebar />
          </div>
        </div>
      </div>

      <CustomAmountModal
        isOpen={isCustomAmountOpen}
        onClose={() => setIsCustomAmountOpen(false)}
      />
    </div>
  );
}