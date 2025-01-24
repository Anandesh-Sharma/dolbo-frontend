import React from 'react';
import ImageCompareSlider from './ImageCompareSlider';
import { Download } from 'lucide-react';

interface ImageResultDisplayProps {
  originalImage: string;
  enhancedImage: string;
  isLoading?: boolean;
}

const ImageResultDisplay: React.FC<ImageResultDisplayProps> = ({
  originalImage,
  enhancedImage,
  isLoading = false
}) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(enhancedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `enhanced-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-white">Image Comparison</div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-white/90 hover:text-white bg-blue-500/20 hover:bg-blue-500/30 rounded-md transition-colors duration-200"
        >
          <Download size={14} />
          Download Enhanced
        </button>
      </div>
      <div className="flex-1 min-h-0">
        {isLoading ? (
          <div className="h-full bg-gray-900/50 rounded-lg flex items-center justify-center">
            <div className="text-sm text-gray-400">Processing image...</div>
          </div>
        ) : (
          <ImageCompareSlider
            originalImage={originalImage}
            enhancedImage={enhancedImage}
            className="h-full"
          />
        )}
      </div>
    </div>
  );
};

export default ImageResultDisplay; 