import React from 'react';
import CodeBlock from './CodeBlock';

interface JsonViewerProps {
  data: any;
  title?: string;
}

export default function JsonViewer({ data, title }: JsonViewerProps) {
  const formattedJson = JSON.stringify(data, null, 2);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
      {title && (
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-lg font-medium text-white">{title}</h3>
        </div>
      )}
      <div className="p-4">
        <CodeBlock 
          code={formattedJson}
          language="json"
        />
      </div>
    </div>
  );
}