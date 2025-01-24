import React, { useState, useRef } from 'react';
import { Info } from 'lucide-react';
import ImageUploader from './ImageUploader';
import { useRecoilValue } from 'recoil';
import { selectedTeamIdState } from '@/store/teams';

type EnhancementType = 'enhance' | 'remove-blur' | 'hdr' | 'color-correction' | 'noise-reduction';

export default function ImageEnhancement() {
  const selectedTeamId = useRecoilValue(selectedTeamIdState);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enhancementType, setEnhancementType] = useState<EnhancementType>('enhance');
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = async (file: File) => {
    try {
      setError(null);
      setSelectedImage(URL.createObjectURL(file));
      setEnhancedImage(null);
    } catch (err) {
      setError('Error uploading image. Please try again.');
    }
  };

  const handleEnhance = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, you would make an actual API call here
      // const formData = new FormData();
      // formData.append('image', imageFile);
      // formData.append('type', enhancementType);
      // const response = await fetch('https://api.dolbo.ai/v1/enhance', {
      //   method: 'POST',
      //   headers: { Authorization: `Bearer ${apiKey}` },
      //   body: formData
      // });
      
      // For demo, just use the same image
      setEnhancedImage(selectedImage);
    } catch (err) {
      setError('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-9rem)] flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Image Enhancement</h2>
        <p className="mt-1 text-gray-400">
          Enhance your images with AI-powered tools
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-0">
        <div className="lg:col-span-3 flex flex-col min-h-0">
          <div className="flex-1 relative">
            {selectedImage ? (
              <div className="h-full flex flex-col">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-4 sticky top-20">
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-white">Original Image</div>
                    <div
                      ref={containerRef}
                      className="relative aspect-[4/3] bg-gray-900/50 rounded-lg overflow-hidden"
                    >
                      <img
                        ref={imageRef}
                        src={selectedImage}
                        alt="Original"
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </div>
                    
                    {enhancedImage && (
                      <>
                        <div className="text-sm font-medium text-white mt-6">Enhanced Image</div>
                        <div className="relative aspect-[4/3] bg-gray-900/50 rounded-lg overflow-hidden">
                          <img
                            src={enhancedImage}
                            alt="Enhanced"
                            className="absolute inset-0 w-full h-full object-contain"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <p>No image selected</p>
                  <p className="text-sm">Upload an image to start enhancement</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col min-h-0">
          <div className="space-y-6 overflow-y-auto pr-4">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
              <div className="p-3">
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-medium text-white mb-1.5">
                      Upload Image
                    </div>
                    <ImageUploader onUpload={handleImageUpload} />
                  </div>
                  
                  <div>
                    <div className="text-xs font-medium text-white mb-1.5">
                      Enhancement Type
                    </div>
                    <select
                      value={enhancementType}
                      onChange={(e) => setEnhancementType(e.target.value as EnhancementType)}
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="enhance">General Enhancement</option>
                      <option value="remove-blur">Remove Blur</option>
                      <option value="hdr">HDR Effect</option>
                      <option value="color-correction">Color Correction</option>
                      <option value="noise-reduction">Noise Reduction</option>
                    </select>
                  </div>

                  <button
                    onClick={handleEnhance}
                    disabled={!selectedImage || isProcessing}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isProcessing ? 'Processing...' : 'Enhance Image'}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-3">
              <div className="flex items-center space-x-2 mb-3">
                <Info className="h-3.5 w-3.5 text-blue-500" />
                <h3 className="text-xs font-medium text-white">
                  About Image Enhancement
                </h3>
              </div>
              <div className="text-xs text-gray-400">
                <p className="mb-3">
                  Our AI-powered image enhancement service provides:
                </p>
                <ul className="list-disc pl-4 space-y-1.5">
                  <li>Advanced image enhancement algorithms</li>
                  <li>Blur removal and sharpening</li>
                  <li>HDR effect enhancement</li>
                  <li>Intelligent color correction</li>
                  <li>Noise reduction and detail preservation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 