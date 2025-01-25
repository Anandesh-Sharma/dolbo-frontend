import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import Modal from 'react-modal';
import StripeCardFormWrapper from './StripeCardForm';
import CardBrandIcons from './CardBrandIcons';

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
    maxWidth: '72rem',
    width: '95%',
    minHeight: '32rem',
    padding: 0,
    border: 'none',
    borderRadius: '1.5rem',
    backgroundColor: '#1a1a1a',
    boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.05)',
  },
};

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault?: boolean;
  isExpired?: boolean;
}

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentMethodModal({
  isOpen,
  onClose,
}: PaymentMethodModalProps) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      brand: 'visa',
      last4: '7830',
      expMonth: 6,
      expYear: 24,
      isDefault: true,
    },
    {
      id: '2',
      brand: 'visa',
      last4: '5775',
      expMonth: 6,
      expYear: 24,
    },
    {
      id: '3',
      brand: 'mastercard',
      last4: '1075',
      expMonth: 2,
      expYear: 25,
    },
    {
      id: '4',
      brand: 'mastercard',
      last4: '4962',
      expMonth: 6,
      expYear: 24,
      isExpired: true,
    },
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      contentLabel="Credit card(s)"
    >
      <div className="h-full flex flex-col bg-gradient-to-b from-gray-900/50 to-transparent">
        {/* Header */}
        <div className="p-6 border-b border-gray-800/60">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-white">
                Credit card(s)
              </h2>
              <p className="text-gray-400">
                Manage your credit cards and payment options.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-800/80"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-2 divide-x divide-gray-800/60 gap-8 h-full">
            {/* Left side - Empty state or Add Card Form */}
            <div className="min-h-[400px] pr-8">
              {isAddingCard ? (
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-5 shadow-lg">
                  <StripeCardFormWrapper
                    onCancel={() => setIsAddingCard(false)}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center text-center p-6 bg-gray-800/20 backdrop-blur-sm rounded-2xl border border-gray-700/30">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="bg-white rounded-lg p-2 shadow-md">
                      {CardBrandIcons.mastercard}
                    </div>
                    <div className="bg-white rounded-lg p-2 shadow-md">
                      {CardBrandIcons.visa}
                    </div>
                  </div>

                  <h2 className="text-2xl font-semibold text-white mb-3">
                    Add a credit card
                  </h2>
                  
                  <p className="text-gray-400 mb-8">
                    This credit card will be used by default for billing.
                  </p>

                  <button
                    onClick={() => setIsAddingCard(true)}
                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-2xl transition-colors shadow-lg shadow-blue-500/20"
                  >
                    Add new card
                  </button>
                </div>
              )}
            </div>

            {/* Right side - Card list */}
            <div className="pl-8">
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-800/30 transition-colors border border-transparent hover:border-gray-700/50 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                        {method.brand === 'visa' && CardBrandIcons.visa}
                        {method.brand === 'mastercard' && CardBrandIcons.mastercard}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} ending in {method.last4}
                        </p>
                        <p className="text-gray-500">
                          Exp. date {String(method.expMonth).padStart(2, '0')}/{String(method.expYear).padStart(2, '0')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {method.isDefault ? (
                        <span className="px-3 py-1 bg-gray-800/80 text-white text-sm rounded-lg border border-gray-700/50">
                          Default
                        </span>
                      ) : method.isExpired ? (
                        <span className="text-red-400 text-sm">
                          Expired
                        </span>
                      ) : (
                        <button className="px-3 py-1 border border-blue-400/20 text-blue-400 hover:text-blue-300 hover:border-blue-300/20 text-sm rounded-lg transition-colors">
                          Set as Default
                        </button>
                      )}
                      <button className="p-2 text-gray-400 hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-700/50">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
} 