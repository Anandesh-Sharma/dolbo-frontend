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
      className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-blue-500 transition-colors duration-200 cursor-pointer"
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
      />
      <div className="flex flex-col items-center">
        <Upload className="h-6 w-6 text-gray-400" />
        <p className="mt-2 text-sm text-gray-400">
          Drag and drop or click to upload
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supports JPG, PNG • Max 5MB
        </p>
      </div>
    </div>
  );
} 