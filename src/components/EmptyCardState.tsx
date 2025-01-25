import CardBrandIcons from './CardBrandIcons';

interface EmptyCardStateProps {
  onClick: () => void;
}

export default function EmptyCardState({ onClick }: EmptyCardStateProps) {
  return (
    <div className="flex flex-col items-center text-center p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-white rounded-lg p-2">
          {CardBrandIcons.mastercard}
        </div>
        <div className="bg-white rounded-lg p-2">
          {CardBrandIcons.visa}
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-white mb-3">
        Add your first credit card
      </h2>
      
      <p className="text-gray-400 mb-8">
        This credit card will be used by default for billing.
      </p>

      <button
        onClick={onClick}
        className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-2xl transition-colors"
      >
        Add new card
      </button>
    </div>
  );
} 