import { CreditCard, Plus } from 'lucide-react';

interface PaymentMethodsProps {
  onManageCards: () => void;
}

export default function PaymentMethods({ onManageCards }: PaymentMethodsProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Payment Methods</h3>
        <button 
          onClick={onManageCards}
          className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <CreditCard className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <div className="font-medium text-white">•••• 4242</div>
                <div className="text-sm text-gray-400">Expires 12/24</div>
              </div>
            </div>
            <div className="px-2 py-1 text-xs font-medium text-blue-500 bg-blue-500/10 rounded">
              Default
            </div>
          </div>
        </div>

        <button onClick={onManageCards} className="w-full p-4 border-2 border-dashed border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-colors duration-200">
          <Plus className="h-5 w-5 mx-auto mb-1" />
          <span className="text-sm">Add new card</span>
        </button>
      </div>
    </div>
  );
}