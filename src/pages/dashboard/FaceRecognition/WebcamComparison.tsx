import React, { useState, useRef, useEffect } from 'react';
import { Camera, Loader2, MonitorSmartphone } from 'lucide-react';
import ImageUploader from '../../../components/common/ImageUploader';
import JsonViewer from '../../../components/JsonViewer';

interface WebcamComparisonProps {
  referenceImage: string | null;
  onReferenceImageUpload: (file: File) => void;
}

interface VideoDevice {
  deviceId: string;
  label: string;
}

export default function WebcamComparison({
  referenceImage,
  onReferenceImageUpload
}: WebcamComparisonProps) {
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [devices, setDevices] = useState<VideoDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Get the list of available video devices
    const getVideoDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices
          .filter(device => device.kind === 'videoinput')
          .map(device => ({
            deviceId: device.deviceId,
            label: device.label || `Camera ${devices.indexOf(device) + 1}`
          }));
        setDevices(videoDevices);
        
        // Set the first device as default if available
        if (videoDevices.length > 0 && !selectedDeviceId) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      } catch (err) {
        console.error('Error getting video devices:', err);
        setError('Could not access camera devices.');
      }
    };

    getVideoDevices();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const startWebcam = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
        setIsWebcamActive(true);
        startFaceDetection();
      }
      setError(null);
    } catch (err) {
      setError('Could not access webcam. Please ensure you have granted camera permissions.');
      console.error('Error accessing webcam:', err);
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsWebcamActive(false);
    setResult(null);
  };

  const handleDeviceChange = async (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    if (isWebcamActive) {
      await stopWebcam();
      await startWebcam();
    }
  };

  const startFaceDetection = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const detectFaces = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx || !videoRef.current) return;

      // Draw the current frame
      ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

      // Simulate face detection result
      setResult({
        match: Math.random() > 0.5,
        confidence: 0.85 + Math.random() * 0.1,
        face: {
          bbox: {
            x: 200 + Math.random() * 20,
            y: 150 + Math.random() * 20,
            width: 200,
            height: 200
          },
          landmarks: {
            eye_left: [250, 200],
            eye_right: [350, 200],
            nose: [300, 250],
            mouth_left: [275, 300],
            mouth_right: [325, 300]
          }
        },
        processing_time: "0.033s"
      });

      // Draw detection box
      if (result?.face?.bbox) {
        ctx.strokeStyle = result.match ? '#22c55e' : '#ef4444';
        ctx.lineWidth = 2;
        ctx.strokeRect(
          result.face.bbox.x,
          result.face.bbox.y,
          result.face.bbox.width,
          result.face.bbox.height
        );
      }

      animationRef.current = requestAnimationFrame(detectFaces);
    };

    detectFaces();
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-white">Webcam Feed</h3>
            {devices.length > 0 && (
              <div className="flex items-center space-x-2">
                <MonitorSmartphone className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedDeviceId}
                  onChange={(e) => handleDeviceChange(e.target.value)}
                  className="bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {devices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="relative bg-gray-800/50 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full rounded-lg"
              playsInline
              muted
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              width={1280}
              height={720}
            />
            {!isWebcamActive && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={startWebcam}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Camera className="h-5 w-5" />
                  <span>Start Webcam</span>
                </button>
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-500/10">
                <p className="text-red-500 text-center px-4">{error}</p>
              </div>
            )}
          </div>
          {isWebcamActive && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={stopWebcam}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Stop Webcam
              </button>
            </div>
          )}
        </div>
      </div>

      {isWebcamActive && result && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
          <h3 className="text-lg font-medium text-white mb-4">Real-time Analysis</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`h-3 w-3 rounded-full ${
                  result.match ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className="text-lg font-medium text-white">
                  {result.match ? 'Face Match' : 'No Match'}
                </span>
              </div>
              <span className="text-sm text-gray-400">
                Confidence: {Math.round(result.confidence * 100)}%
              </span>
            </div>
            <JsonViewer data={result} />
          </div>
        </div>
      )}
    </div>
  );
}