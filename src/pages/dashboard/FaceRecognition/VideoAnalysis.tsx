import React, { useRef, useState } from 'react';
import { Upload, Play, Pause, Loader2 } from 'lucide-react';

interface VideoAnalysisProps {
  onAnalysis: (videoBlob: Blob) => void;
}

export default function VideoAnalysis({ onAnalysis }: VideoAnalysisProps) {
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
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

    ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] bg-gray-800/50 rounded-lg overflow-hidden">
        {video ? (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-contain"
              playsInline
              onEnded={() => setIsPlaying(false)}
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <button
                onClick={togglePlayback}
                className="p-3 bg-gray-900/80 rounded-full text-white hover:bg-gray-900 transition-colors duration-200"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>
            </div>
          </>
        ) : (
          <div
            onClick={() => document.getElementById('video-upload')?.click()}
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
          >
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
            />
            <div className="p-3 bg-blue-500/10 rounded-full">
              <Upload className="h-6 w-6 text-blue-500" />
            </div>
            <p className="mt-4 text-sm font-medium text-white">Upload Video</p>
            <p className="mt-1 text-xs text-gray-400">
              Click to select or drag and drop
            </p>
          </div>
        )}
      </div>

      {isProcessing && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-400">Processing video...</span>
        </div>
      )}
    </div>
  );
}