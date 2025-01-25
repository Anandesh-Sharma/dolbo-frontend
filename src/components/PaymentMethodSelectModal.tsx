import React from 'react';
import { X, Plus, Check, ShieldCheck } from 'lucide-react';
import Modal from 'react-modal';
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
    maxWidth: '30rem',
    width: '100%',
    padding: 0,
    border: 'none',
    borderRadius: '1.5rem',
    backgroundColor: '#1a1a1a',
  },
};

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  holderName: string;
  isPrimary?: boolean;
}

interface PaymentMethodSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (selectedMethod: string) => void;
  amount: string | number;
}

export default function PaymentMethodSelectModal({
  isOpen,
  onClose,
  onContinue,
  amount,
}: PaymentMethodSelectModalProps) {
  const [selectedMethod, setSelectedMethod] = React.useState<string>('');
  const [paymentMethods] = React.useState<PaymentMethod[]>([
    {
      id: '1',
      brand: 'visa',
      last4: '6767',
      holderName: 'Alex Parkinson',
      isPrimary: true,
    },
    {
      id: '2',
      brand: 'mastercard',
      last4: '0089',
      holderName: 'Alex Parkinson',
    },
  ]);

  const formattedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  const displayAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(formattedAmount);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      contentLabel="Choose payment method"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-white">
            Choose payment method
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-4 rounded-2xl cursor-pointer transition-colors ${
                selectedMethod === method.id 
                  ? 'bg-blue-600/10 border border-blue-500/20' 
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${
                    method.brand === 'visa' ? 'bg-[#1434CB]' : 'bg-black'
                  } p-2`}>
                    {method.brand === 'visa' && CardBrandIcons.visa}
                    {method.brand === 'mastercard' && CardBrandIcons.mastercard}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-white font-medium">
                        {method.holderName}
                      </p>
                      {method.isPrimary && (
                        <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-lg">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400">**** {method.last4}</p>
                  </div>
                </div>
                {selectedMethod === method.id && (
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {}}
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors mb-6"
        >
          <Plus className="h-5 w-5" />
          <span>Add new card</span>
        </button>

        <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-4 mb-6 flex items-start space-x-3">
          <ShieldCheck className="h-6 w-6 text-green-400 flex-shrink-0" />
          <p className="text-gray-300">
            We adhere entirely to the data security standards of the payment card
            industry.
          </p>
        </div>

        <button
          onClick={() => onContinue(selectedMethod)}
          disabled={!selectedMethod}
          className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-medium rounded-2xl transition-colors"
        >
          Pay {displayAmount}
        </button>
      </div>
    </Modal>
  );
} 