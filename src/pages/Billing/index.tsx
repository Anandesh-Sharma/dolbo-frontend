import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import CurrentCreditsCard from '../../components/CurrentCreditsCard';
import CreditPackagesSection from '../../components/CreditPackagesSection';
import UsageHistorySidebar from '../../components/UsageHistorySidebar';
import CustomAmountModal from '../../components/CustomAmountModal';

export default function BillingPage() {
  const [selectedPackage, setSelectedPackage] = useState('pro');
  const [isCustomAmountOpen, setIsCustomAmountOpen] = useState(false);
  const [currentCredits] = useState(250);

  const handleCustomAmount = (amount: number) => {
    // Handle custom amount selection
    setIsCustomAmountOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-6 w-6 text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Billing & Credits
            </h1>
          </div>
          <p className="text-gray-400 sm:ml-8 text-sm sm:text-base">
            Manage your credits and payment methods
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          <CurrentCreditsCard currentCredits={currentCredits} />
          <CreditPackagesSection
            selectedPackage={selectedPackage}
            onSelect={setSelectedPackage}
            onCustomAmount={() => setIsCustomAmountOpen(true)}
          />
        </div>

        {/* Usage History Sidebar */}
        <div className="lg:col-span-4">
          <UsageHistorySidebar />
        </div>
      </div>

      <CustomAmountModal
        isOpen={isCustomAmountOpen}
        onClose={() => setIsCustomAmountOpen(false)}
        onSelect={handleCustomAmount}
      />
    </div>
  );
}