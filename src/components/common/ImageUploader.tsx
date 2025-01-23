import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  accept?: string;
  maxSize?: number;
}

export default function ImageUploader({ 
  onUpload, 
  accept = "image/*",
  maxSize = 5 // MB
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      onUpload(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      onUpload(file);
    }
  };

  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return false;
    }
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return false;
    }
    return true;
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-lg border-2 border-dashed border-gray-700 hover:border-blue-500 transition-all duration-200 cursor-pointer overflow-hidden"
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleChange}
      />
      <div className="flex items-center gap-3 p-4">
        <div className="shrink-0 p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-200">
          <Upload className="h-5 w-5 text-blue-500" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-white">
            Upload Image
          </p>
          <p className="text-xs text-gray-400 truncate">
            Drop image here or click • JPG, PNG • Max {maxSize}MB
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </div>
  );
}