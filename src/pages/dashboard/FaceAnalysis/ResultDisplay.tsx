import React, { useState, useEffect } from 'react';
import { Loader2, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { FaceAnalysisResult, Face } from '../../../types/faceAnalysis';
import JsonViewer from '../../../components/JsonViewer';

interface ResultDisplayProps {
  result: FaceAnalysisResult | null;
  isLoading: boolean;
}

function FaceCard({ face, index }: { face: Face; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const faceBoxes = document.querySelectorAll('.face-box');
    const faceBox = faceBoxes[index] as HTMLElement;
    if (!faceBox) return;

    const handleMouseEnter = () => {
      faceBox.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      faceBox.style.opacity = '0';
    };

    const card = document.getElementById(`face-card-${index}`);
    if (card) {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [index]);

  return (
    <div
      id={`face-card-${index}`}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`bg-gray-900/50 rounded-lg p-4 space-y-4 hover:bg-gray-900/70 transition-all duration-200 cursor-pointer border ${
        isExpanded
          ? 'border-blue-500'
          : 'border-transparent hover:border-blue-500/50'
      }`}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-white font-medium">Face #{index + 1}</h4>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-blue-400">
            Score: {(face.det_core * 100).toFixed(1)}%
          </span>
          <div className="text-gray-400 hover:text-white transition-colors">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h5 className="text-sm font-medium text-gray-400 mb-2">
            Demographics
          </h5>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Age:</span>
              <span className="text-white">{face.age} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Gender:</span>
              <span className="text-white">
                {face.gender === 1 ? 'Male' : 'Female'}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-400 mb-2">Head Pose</h5>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Pitch:</span>
              <span className="text-white">{face.pose[0].toFixed(1)}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Yaw:</span>
              <span className="text-white">{face.pose[1].toFixed(1)}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Roll:</span>
              <span className="text-white">{face.pose[2].toFixed(1)}°</span>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4">
          <h5 className="text-sm font-medium text-gray-400 mb-2">Raw Data</h5>
          <JsonViewer data={face} />
        </div>
      )}
    </div>
  );
}

export default function ResultDisplay({
  result,
  isLoading,
}: ResultDisplayProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Info className="h-4 w-4 text-blue-500" />
        <h3 className="text-sm font-medium text-white">Analysis Results</h3>
        {result?.faces && (
          <span className="text-xs text-gray-400 ml-auto">
            {result.faces.length} {result.faces.length === 1 ? 'face' : 'faces'}{' '}
            detected
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-400">Analyzing faces...</span>
        </div>
      ) : result?.faces?.length ? (
        <div className="space-y-4">
          {result.faces.map((face, index) => (
            <FaceCard key={index} face={face} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          No faces detected in the image
        </div>
      )}
    </div>
  );
}