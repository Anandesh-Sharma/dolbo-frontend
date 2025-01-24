import React, { useState, useRef, useEffect } from 'react';
import ImageUploader from '../../components/common/ImageUploader';
import ResultDisplay from './ResultDisplay';
import { FaceAnalysisResult } from '../../types/faceAnalysis';
import { Info } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { selectedTeamIdState } from '@/store/teams';
import { useNetwork } from '@/hooks/useNetwork';

export default function FaceAnalysis() {
  const selectedTeamId = useRecoilValue(selectedTeamIdState);
  const [result, setResult] = useState<FaceAnalysisResult | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { makeRequest, isLoading, error } = useNetwork();
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      updateImageDimensions();
    }
  }, [selectedImage]);

  const updateImageDimensions = () => {
    if (!imageRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const imageNaturalWidth = imageRef.current.naturalWidth;
    const imageNaturalHeight = imageRef.current.naturalHeight;

    // Calculate scaling to fit image in container while maintaining aspect ratio
    const scale = Math.min(
      containerWidth / imageNaturalWidth,
      containerHeight / imageNaturalHeight
    );

    const scaledWidth = imageNaturalWidth * scale;
    const scaledHeight = imageNaturalHeight * scale;

    setImageDimensions({
      width: scaledWidth,
      height: scaledHeight,
    });
  };

  const handleImageUpload = async (file: File) => {
    setResult(null);
    setSelectedImage(null);

    const reader = new FileReader();
    reader.onload = async () => {
      setSelectedImage(reader.result as string);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const data = await makeRequest(`/detect_faces?team_id=${selectedTeamId}`, 'POST', formData);
        setResult(data);
      } catch (err) {
        console.error('Error analyzing face:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  const getBoundingBoxStyle = (face: any) => {
    if (!imageRef.current || !containerRef.current) return {};

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    // Calculate the actual dimensions and position of the image within the container
    const imageLeft = (containerWidth - imageDimensions.width) / 2;
    const imageTop = (containerHeight - imageDimensions.height) / 2;

    // Calculate the bounding box dimensions and position relative to the scaled image
    const boxWidth = face.face_box.width * imageDimensions.width;
    const boxHeight = face.face_box.height * imageDimensions.height;
    const boxLeft = imageLeft + face.face_box.x * imageDimensions.width;
    const boxTop = imageTop + face.face_box.y * imageDimensions.height;

    return {
      position: 'absolute' as const,
      left: `${boxLeft}px`,
      top: `${boxTop}px`,
      width: `${boxWidth}px`,
      height: `${boxHeight}px`,
      border: '2px solid #3b82f6',
      borderRadius: '4px',
      opacity: 0,
      transition: 'opacity 0.2s ease-in-out',
    };
  };

  return (
    <div className="min-h-[calc(100vh-9rem)] flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Face Analysis</h2>
        <p className="mt-1 text-gray-400">
          Upload an image to analyze facial features and attributes
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
                    <div
                      ref={containerRef}
                      className="relative aspect-[4/3] bg-gray-900/50 rounded-lg overflow-hidden"
                    >
                      <img
                        ref={imageRef}
                        src={selectedImage}
                        alt="Uploaded"
                        className="absolute inset-0 w-full h-full object-contain"
                        onLoad={updateImageDimensions}
                      />
                      {result?.faces?.map((face, index) => (
                        <div
                          key={index}
                          style={getBoundingBoxStyle(face)}
                          className="face-box"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <p>No image selected</p>
                  <p className="text-sm">Upload an image to start analysis</p>
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
                  About Face Analysis
                </h3>
              </div>
              <div className="text-xs text-gray-400">
                <p className="mb-3">
                  Our advanced Face Analysis API provides comprehensive facial
                  analysis including:
                </p>
                <ul className="list-disc pl-4 mb-4 space-y-0.5">
                  <li>Face detection with bounding box</li>
                  <li>3D facial landmarks (68 points)</li>
                  <li>2D facial landmarks (106 points)</li>
                </ul>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-300 mb-1.5">
                      Key Features:
                    </p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      <li>Head pose estimation</li>
                      <li>Age and gender prediction</li>
                      <li>Detection confidence scores</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-300 mb-1.5">
                      Use Cases:
                    </p>
                    <ul className="list-disc pl-4 space-y-0.5">
                      <li>Identity verification</li>
                      <li>Emotion analysis</li>
                      <li>Demographic insights</li>
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
