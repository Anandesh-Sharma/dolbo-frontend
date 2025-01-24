import React, { Suspense } from 'react';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle
} from 'react-compare-slider';

interface ImageCompareSliderProps {
  originalImage: string;
  enhancedImage: string;
  className?: string;
}

const ImageCompareSlider: React.FC<ImageCompareSliderProps> = ({
  originalImage,
  enhancedImage,
  className = ''
}) => {
  return (
    <Suspense 
      fallback={
        <div className="aspect-[4/3] bg-gray-900/50 rounded-lg flex items-center justify-center">
          <div className="text-sm text-gray-400">Loading comparison slider...</div>
        </div>
      }
    >
      <div className={`relative rounded-lg overflow-hidden ${className}`}>
        <ReactCompareSlider
          handle={
            <ReactCompareSliderHandle
              buttonStyle={{
                backdropFilter: 'blur(4px)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 0,
                color: '#1a1a1a'
              }}
            />
          }
          itemOne={
            <div className="w-full h-full bg-gray-900/50">
              <ReactCompareSliderImage
                src={originalImage}
                alt="Original image"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>
          }
          itemTwo={
            <div className="w-full h-full bg-gray-900/50">
              <ReactCompareSliderImage
                src={enhancedImage}
                alt="Enhanced image"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>
          }
          style={{
            height: '100%',
            width: '100%'
          }}
          className="aspect-[4/3]"
        />
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-white bg-black/50 backdrop-blur-sm px-3 py-1.5">
          <span>Original</span>
          <span>Enhanced</span>
        </div>
      </div>
    </Suspense>
  );
};

export default ImageCompareSlider; 