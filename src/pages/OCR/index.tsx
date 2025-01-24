import React, { useState } from 'react';
import ImageUploader from '../../components/common/ImageUploader';
import ResultDisplay from './ResultDisplay';
import { Info } from 'lucide-react';
import { getAPIUrl } from '../../utils/api';
import { API_TOKEN } from '../../envs';
import { useRecoilValue } from 'recoil';
import { selectedTeamIdState } from '@/store/teams';

export default function OCR() {
  const selectedTeamId = useRecoilValue(selectedTeamIdState);
  const [result, setResult] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = async () => {
      setSelectedImage(reader.result as string);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(getAPIUrl(`/ocr?team_id=${selectedTeamId}`), {
          method: 'POST',
          body: formData,
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to process image');
        }

        const data = await response.json();
        setResult(data);
      } catch (err) {
        console.error('Error processing image:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to process image'
        );
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-[calc(100vh-9rem)] flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Optical Character Recognition (OCR)
        </h2>
        <p className="mt-1 text-gray-400">
          Extract text from images with high accuracy
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-0">
        <div className="lg:col-span-3 flex flex-col min-h-0">
          <div className="flex-1 relative">
            {selectedImage ? (
              <div className="h-full flex flex-col">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-4 sticky top-20">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-white">Image</div>
                    <div className="relative aspect-[4/3] bg-gray-900/50 rounded-lg overflow-hidden">
                      <img
                        src={selectedImage}
                        alt="Uploaded"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <p>No image uploaded</p>
                  <p className="text-sm">Upload an image to extract text</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col min-h-0">
          <div className="space-y-6 overflow-y-auto pr-4">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
              <div className="p-3">
                <div className="space-y-1.5">
                  <div className="text-xs font-medium text-white">
                    Upload Image
                  </div>
                  <ImageUploader onUpload={handleImageUpload} />
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
                <h3 className="text-xs font-medium text-white">About OCR</h3>
              </div>
              <div className="text-xs text-gray-400">
                <p className="mb-3">
                  Our OCR API provides advanced text extraction capabilities:
                </p>
                <ul className="list-disc pl-4 mb-4 space-y-0.5">
                  <li>High-accuracy text recognition</li>
                  <li>Multiple language support</li>
                  <li>Layout preservation</li>
                  <li>Confidence scores</li>
                </ul>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-300 mb-1.5">
                      Supported Formats:
                    </p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      <li>PNG images</li>
                      <li>JPEG images</li>
                      <li>Scanned PDFs</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-300 mb-1.5">
                      Use Cases:
                    </p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      <li>Document digitization</li>
                      <li>Data extraction</li>
                      <li>Text indexing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {selectedImage && (
              <ResultDisplay result={result} isLoading={isLoading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
