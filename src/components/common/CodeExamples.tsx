import React, { useState } from 'react';
import CodeBlock from './CodeBlock';

interface CodeExamplesProps {
  examples: Record<string, string>;
  endpoint: string;
}

export default function CodeExamples({ examples, endpoint }: CodeExamplesProps) {
  const [activeTab, setActiveTab] = useState('python');

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
      <div className="px-6 py-4 border-b border-gray-800">
        <h3 className="text-lg font-medium text-white">Implementation Examples</h3>
      </div>
      <div className="border-b border-gray-800">
        <nav className="flex px-6" aria-label="Tabs">
          {Object.keys(examples).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === lang
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6">
        <CodeBlock 
          code={examples[activeTab]}
          language={activeTab === 'curl' ? 'bash' : activeTab}
        />
      </div>
    </div>
  );
}