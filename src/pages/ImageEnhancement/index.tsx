import React, { useState } from 'react';
import ImageResultDisplay from '../../components/ImageResultDisplay';
import ImageUploader from '../../components/common/ImageUploader';

export default function ImageEnhancement() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result as string;
      setOriginalImage(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-[calc(100vh-9rem)] flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Image Enhancement</h2>
        <p className="mt-1 text-gray-400">
          Upload an image to see the enhanced version
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-0">
        <div className="lg:col-span-3 flex flex-col min-h-0">
          {originalImage && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-4 h-full">
              <ImageResultDisplay
                originalImage={originalImage}
                enhancedImage={originalImage}
                isLoading={false}
              />
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <ImageUploader onUpload={handleImageUpload} />
          
          <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-3">
            <div className="text-xs text-gray-400">
              <p className="mb-3">
                Our Image Enhancement API provides advanced enhancement capabilities:
              </p>
              <ul className="list-disc pl-4 mb-4 space-y-0.5">
                <li>Automatic color correction</li>
                <li>Contrast enhancement</li>
                <li>Noise reduction</li>
                <li>Sharpness adjustment</li>
              </ul>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-300 mb-1.5">
                    Supported Formats:
                  </p>
                  <ul className="list-disc pl-4 space-y-0.5">
                    <li>JPEG</li>
                    <li>PNG</li>
                    <li>WebP</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-300 mb-1.5">
                    Key Features:
                  </p>
                  <ul className="list-disc pl-4 space-y-0.5">
                    <li>Real-time processing</li>
                    <li>Preserve details</li>
                    <li>Auto-optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 