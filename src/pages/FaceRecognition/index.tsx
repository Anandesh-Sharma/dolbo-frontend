import React, { useState } from 'react';
import ImageUploader from '../../components/common/ImageUploader';
import ResultDisplay from './ResultDisplay';
import { Info } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { selectedTeamIdState } from '@/store/teams';
import { useNetwork } from '@/hooks/useNetwork';

export default function FaceRecognition() {
  const selectedTeamId = useRecoilValue(selectedTeamIdState);
  const [result, setResult] = useState<any>(null);
  const [firstImage, setFirstImage] = useState<string | null>(null);
  const [secondImage, setSecondImage] = useState<string | null>(null);
  const { makeRequest, isLoading, error } = useNetwork();

  const handleFirstImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFirstImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSecondImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      setSecondImage(reader.result as string);

      if (!firstImage || !selectedTeamId) return;

      setResult(null);

      const formData = new FormData();
      formData.append('file1', file);

      const firstImageFile = await fetch(firstImage)
        .then((res) => res.blob())
        .then((blob) => new File([blob], 'file1.jpg', { type: 'image/jpeg' }));

      formData.append('file2', firstImageFile);

      try {
        const data = await makeRequest(`/recog_faces?team_id=${selectedTeamId}`, 'POST', formData);
        setResult(data);
      } catch (err) {
        console.error('Error comparing faces:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-[calc(100vh-9rem)] flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Face Recognition</h2>
        <p className="mt-1 text-gray-400">
          Compare faces in images to check if they match
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-0">
        <div className="lg:col-span-3 flex flex-col min-h-0">
          <div className="flex-1 relative">
            {firstImage || secondImage ? (
              <div className="h-full flex flex-col space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-4 sticky top-20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-white">
                        First Image
                      </div>
                      <div className="relative aspect-[4/3] bg-gray-900/50 rounded-lg overflow-hidden">
                        {firstImage ? (
                          <img
                            src={firstImage}
                            alt="First"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                            No image selected
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-white">
                        Second Image
                      </div>
                      <div className="relative aspect-[4/3] bg-gray-900/50 rounded-lg overflow-hidden">
                        {secondImage ? (
                          <img
                            src={secondImage}
                            alt="Second"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                            No image selected
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {(firstImage || secondImage) && (
                  <ResultDisplay
                    firstImage={firstImage}
                    secondImage={secondImage}
                    result={result}
                    isLoading={isLoading}
                  />
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <p>No images selected</p>
                  <p className="text-sm">Upload images to start comparison</p>
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
                      First Image
                    </div>
                    <ImageUploader onUpload={handleFirstImageUpload} />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white mb-1.5">
                      Second Image
                    </div>
                    <ImageUploader onUpload={handleSecondImageUpload} />
                  </div>
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
                  About Face Recognition
                </h3>
              </div>
              <div className="text-xs text-gray-400">
                <p className="mb-3">
                  Our advanced Face Recognition API provides accurate face
                  matching and verification:
                </p>
                <ul className="list-disc pl-4 mb-4 space-y-0.5">
                  <li>High-accuracy face matching</li>
                  <li>Robust against pose variations</li>
                  <li>Works with partial occlusions</li>
                </ul>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-300 mb-1.5">
                      Key Features:
                    </p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      <li>1:1 face verification</li>
                      <li>1:N face identification</li>
                      <li>Similarity scoring</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-300 mb-1.5">
                      Use Cases:
                    </p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      <li>Identity verification</li>
                      <li>Access control</li>
                      <li>Photo organization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
