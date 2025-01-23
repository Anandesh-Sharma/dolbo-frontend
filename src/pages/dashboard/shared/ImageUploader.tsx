import React from 'react';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onUpload: (file: File) => void;
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-blue-500 transition-colors duration-200 cursor-pointer"
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
      />
      <div className="flex flex-col items-center">
        <div className="p-4 bg-blue-500/10 rounded-full">
          <Upload className="h-8 w-8 text-blue-500" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-white">Upload Image</h3>
        <p className="mt-2 text-sm text-gray-400">
          Drag and drop an image here, or click to select
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supports JPG, PNG • Max file size 5MB
        </p>
      </div>
    </div>
  );
}