import React, { useState, useRef } from 'react';
import { Play, Pause, Upload, Loader2 } from 'lucide-react';
import ImageUploader from '../../components/common/ImageUploader';

interface VideoComparisonProps {
  referenceImage: string | null;
  onReferenceImageUpload: (file: File) => void;
}

export default function VideoComparison({ 
  referenceImage, 
  onReferenceImageUpload 
}: VideoComparisonProps) {
  const [video, setVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideo(url);
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.src = url;
      }
    }
  };

  const togglePlayback = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      cancelAnimationFrame(animationRef.current!);
    } else {
      videoRef.current.play();
      animate();
    }
    setIsPlaying(!isPlaying);
  };

  const animate = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Draw the current video frame
    ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

    // Simulate face detection on the frame
    // In a real implementation, you would send the frame data to your API
    // and draw the detection results

    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Reference Image</h3>
          <ImageUploader onUpload={onReferenceImageUpload} />
          {referenceImage && (
            <div className="mt-4">
              <img src={referenceImage} alt="Reference" className="rounded-lg" />
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Video Upload</h3>
          <div
            onClick={() => document.getElementById('video-upload')?.click()}
            className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-blue-500 transition-colors duration-200 cursor-pointer"
          >
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
            />
            <div className="flex flex-col items-center">
              <div className="p-4 bg-blue-500/10 rounded-full">
                <Upload className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">Upload Video</h3>
              <p className="mt-2 text-sm text-gray-400">
                Drag and drop a video here, or click to select
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Supports MP4, WebM • Max file size 50MB
              </p>
            </div>
          </div>
        </div>
      </div>

      {video && (
        <div className="space-y-4">
          <div className="relative">
            <video
              ref={videoRef}
              className="w-full rounded-lg"
              playsInline
              onEnded={() => setIsPlaying(false)}
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                onClick={togglePlayback}
                className="p-3 bg-gray-900/80 rounded-full text-white hover:bg-gray-900 transition-colors duration-200"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {isProcessing && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
              <span className="ml-2 text-gray-400">Processing video...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}