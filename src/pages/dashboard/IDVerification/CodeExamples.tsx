import React, { useState } from 'react';
import CodeBlock from '../../../components/CodeBlock';

const codeExamples = {
  python: `import requests

url = "https://api.dolbo.ai/v1/verify/id"
api_key = "your_api_key"

document_path = "path/to/document.jpg"
with open(document_path, "rb") as document_file:
    response = requests.post(
        url,
        headers={"Authorization": f"Bearer {api_key}"},
        files={"document": document_file}
    )

result = response.json()
print(result)`,

  javascript: `const formData = new FormData();
formData.append('document', documentFile);

const response = await fetch('https://api.dolbo.ai/v1/verify/id', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`
  },
  body: formData
});

const result = await response.json();
console.log(result);`,

  curl: `curl -X POST https://api.dolbo.ai/v1/verify/id \\
  -H "Authorization: Bearer your_api_key" \\
  -F "document=@/path/to/document.jpg"`
};

export default function CodeExamples() {
  const [activeTab, setActiveTab] = useState('python');

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
      <div className="px-6 py-4 border-b border-gray-800">
        <h3 className="text-lg font-medium text-white">Implementation Examples</h3>
      </div>
      <div className="border-b border-gray-800">
        <nav className="flex px-6" aria-label="Tabs">
          {Object.keys(codeExamples).map((lang) => (
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
          code={codeExamples[activeTab as keyof typeof codeExamples]}
          language={activeTab === 'curl' ? 'bash' : activeTab}
        />
      </div>
    </div>
  );
}