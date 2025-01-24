import React, { useState } from 'react';
import ImageUploader from '../../components/common/ImageUploader';
import ResultDisplay from './ResultDisplay';
import { Info } from 'lucide-react';
import { getAPIUrl } from '../../utils/api';
import { API_TOKEN } from '../../envs';

export default function ObjectDetection() {
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
        const response = await fetch(getAPIUrl('/detect-objects/'), {
          method: 'POST',
          body: formData,
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to detect objects');
        }

        const data = await response.json();
        setResult(data);
      } catch (err) {
        console.error('Error detecting objects:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to detect objects'
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
        <h2 className="text-2xl font-bold text-white">Object Detection</h2>
        <p className="mt-1 text-gray-400">
          Upload an image to detect and classify objects
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
                      {result?.objects?.map((obj: any, index: number) => (
                        <div
                          key={index}
                          style={{
                            position: 'absolute',
                            left: `${obj.bbox.x * 100}%`,
                            top: `${obj.bbox.y * 100}%`,
                            width: `${obj.bbox.width * 100}%`,
                            height: `${obj.bbox.height * 100}%`,
                            border: '2px solid #3b82f6',
                            borderRadius: '4px',
                          }}
                        >
                          <span className="absolute -top-6 left-0 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                            {obj.class} ({Math.round(obj.confidence * 100)}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <p>No image uploaded</p>
                  <p className="text-sm">Upload an image to detect objects</p>
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
                <h3 className="text-xs font-medium text-white">
                  About Object Detection
                </h3>
              </div>
              <div className="text-xs text-gray-400">
                <p className="mb-3">
                  Our Object Detection API provides comprehensive detection
                  capabilities:
                </p>
                <ul className="list-disc pl-4 mb-4 space-y-0.5">
                  <li>Multiple object detection</li>
                  <li>80+ object classes</li>
                  <li>Bounding box coordinates</li>
                  <li>Confidence scores</li>
                </ul>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-300 mb-1.5">
                      Key Features:
                    </p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      <li>Real-time detection</li>
                      <li>High accuracy</li>
                      <li>Scale invariant</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-300 mb-1.5">
                      Use Cases:
                    </p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      <li>Surveillance</li>
                      <li>Retail analytics</li>
                      <li>Safety monitoring</li>
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
