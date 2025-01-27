import React, { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';
import CodeBlock from '../../components/CodeBlock';

interface Endpoint {
  name: string;
  method: string;
  url: string;
  description: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  response: {
    success: any;
    error: any;
  };
  example: {
    curl: string;
    python: string;
    javascript: string;
  };
}

const API_ENDPOINTS: Record<string, Endpoint[]> = {
  'Face Recognition': [
    {
      name: 'Compare Faces',
      method: 'POST',
      url: '/api/face/compare',
      description: 'Compare two faces to determine if they belong to the same person.',
      parameters: [
        {
          name: 'image1',
          type: 'file',
          required: true,
          description: 'First image containing a face'
        },
        {
          name: 'image2',
          type: 'file',
          required: true,
          description: 'Second image containing a face'
        }
      ],
      response: {
        success: {
          similarity: 0.92,
          match: true,
          confidence: 0.95,
          processing_time: "0.45s"
        },
        error: {
          error: "Failed to process images",
          code: "PROCESSING_ERROR"
        }
      },
      example: {
        curl: `curl -X POST https://api.dolbo.ai/api/face/compare \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image1=@/path/to/first.jpg" \\
  -F "image2=@/path/to/second.jpg"`,
        python: `import requests

url = "https://api.dolbo.ai/api/face/compare"
files = {
    'image1': open('first.jpg', 'rb'),
    'image2': open('second.jpg', 'rb')
}
headers = {
    'Authorization': 'Bearer YOUR_API_KEY'
}

response = requests.post(url, files=files, headers=headers)
result = response.json()`,
        javascript: `const formData = new FormData();
formData.append('image1', firstImageFile);
formData.append('image2', secondImageFile);

const response = await fetch('https://api.dolbo.ai/api/face/compare', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`
  },
  body: formData
});

const result = await response.json();`
      }
    }
  ],
  'Face Analysis': [
    {
      name: 'Analyze Face',
      method: 'POST',
      url: '/api/face/analyze',
      description: 'Detect and analyze facial features, attributes, and landmarks.',
      parameters: [
        {
          name: 'image',
          type: 'file',
          required: true,
          description: 'Image containing one or more faces'
        }
      ],
      response: {
        success: {
          faces: [
            {
              face_box: {
                x: 0.1,
                y: 0.2,
                width: 0.3,
                height: 0.4
              },
              attributes: {
                age: 25,
                gender: "male",
                emotion: "neutral"
              },
              landmarks: {
                "eye_left": [0.4, 0.5],
                "eye_right": [0.6, 0.5]
              },
              confidence: 0.98
            }
          ]
        },
        error: {
          error: "No faces detected",
          code: "NO_FACES_FOUND"
        }
      },
      example: {
        curl: `curl -X POST https://api.dolbo.ai/api/face/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@/path/to/image.jpg"`,
        python: `import requests

url = "https://api.dolbo.ai/api/face/analyze"
files = {
    'image': open('image.jpg', 'rb')
}
headers = {
    'Authorization': 'Bearer YOUR_API_KEY'
}

response = requests.post(url, files=files, headers=headers)
result = response.json()`,
        javascript: `const formData = new FormData();
formData.append('image', imageFile);

const response = await fetch('https://api.dolbo.ai/api/face/analyze', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`
  },
  body: formData
});

const result = await response.json();`
      }
    }
  ],
  'Object Detection': [
    {
      name: 'Detect Objects',
      method: 'POST',
      url: '/api/detect/objects',
      description: 'Detect and classify objects within an image.',
      parameters: [
        {
          name: 'image',
          type: 'file',
          required: true,
          description: 'Image containing objects to detect'
        },
        {
          name: 'min_confidence',
          type: 'number',
          required: false,
          description: 'Minimum confidence threshold (0-1)'
        }
      ],
      response: {
        success: {
          objects: [
            {
              class: "person",
              confidence: 0.95,
              bbox: {
                x: 0.1,
                y: 0.2,
                width: 0.3,
                height: 0.4
              }
            }
          ],
          processing_time: "0.32s"
        },
        error: {
          error: "Invalid image format",
          code: "INVALID_FORMAT"
        }
      },
      example: {
        curl: `curl -X POST https://api.dolbo.ai/api/detect/objects \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@/path/to/image.jpg" \\
  -F "min_confidence=0.5"`,
        python: `import requests

url = "https://api.dolbo.ai/api/detect/objects"
files = {
    'image': open('image.jpg', 'rb')
}
data = {
    'min_confidence': 0.5
}
headers = {
    'Authorization': 'Bearer YOUR_API_KEY'
}

response = requests.post(url, files=files, data=data, headers=headers)
result = response.json()`,
        javascript: `const formData = new FormData();
formData.append('image', imageFile);
formData.append('min_confidence', '0.5');

const response = await fetch('https://api.dolbo.ai/api/detect/objects', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`
  },
  body: formData
});

const result = await response.json();`
      }
    }
  ],
  'OCR': [
    {
      name: 'Extract Text',
      method: 'POST',
      url: '/api/ocr/extract',
      description: 'Extract text from images using OCR technology.',
      parameters: [
        {
          name: 'image',
          type: 'file',
          required: true,
          description: 'Image containing text to extract'
        },
        {
          name: 'language',
          type: 'string',
          required: false,
          description: 'Language code (e.g., "en", "es")'
        }
      ],
      response: {
        success: {
          text: "Extracted text content",
          segments: [
            {
              text: "Hello World",
              confidence: 0.98,
              bbox: {
                x: 0.1,
                y: 0.2,
                width: 0.3,
                height: 0.1
              }
            }
          ],
          language: "en",
          confidence: 0.95
        },
        error: {
          error: "Text extraction failed",
          code: "EXTRACTION_ERROR"
        }
      },
      example: {
        curl: `curl -X POST https://api.dolbo.ai/api/ocr/extract \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@/path/to/image.jpg" \\
  -F "language=en"`,
        python: `import requests

url = "https://api.dolbo.ai/api/ocr/extract"
files = {
    'image': open('image.jpg', 'rb')
}
data = {
    'language': 'en'
}
headers = {
    'Authorization': 'Bearer YOUR_API_KEY'
}

response = requests.post(url, files=files, data=data, headers=headers)
result = response.json()`,
        javascript: `const formData = new FormData();
formData.append('image', imageFile);
formData.append('language', 'en');

const response = await fetch('https://api.dolbo.ai/api/ocr/extract', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`
  },
  body: formData
});

const result = await response.json();`
      }
    }
  ],
  'ID Verification': [
    {
      name: 'Verify ID Document',
      method: 'POST',
      url: '/api/verify/document',
      description: 'Verify and extract information from ID documents.',
      parameters: [
        {
          name: 'document',
          type: 'file',
          required: true,
          description: 'Image of the ID document'
        },
        {
          name: 'document_type',
          type: 'string',
          required: false,
          description: 'Type of document (passport, driver_license, id_card)'
        }
      ],
      response: {
        success: {
          verified: true,
          document_type: "passport",
          confidence: 0.98,
          extracted_data: {
            full_name: "John Doe",
            date_of_birth: "1990-01-01",
            document_number: "AB123456",
            expiry_date: "2025-01-01"
          },
          security_features: {
            hologram_detected: true,
            uv_features_valid: true
          }
        },
        error: {
          error: "Invalid document type",
          code: "INVALID_DOCUMENT"
        }
      },
      example: {
        curl: `curl -X POST https://api.dolbo.ai/api/verify/document \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "document=@/path/to/document.jpg" \\
  -F "document_type=passport"`,
        python: `import requests

url = "https://api.dolbo.ai/api/verify/document"
files = {
    'document': open('document.jpg', 'rb')
}
data = {
    'document_type': 'passport'
}
headers = {
    'Authorization': 'Bearer YOUR_API_KEY'
}

response = requests.post(url, files=files, data=data, headers=headers)
result = response.json()`,
        javascript: `const formData = new FormData();
formData.append('document', documentFile);
formData.append('document_type', 'passport');

const response = await fetch('https://api.dolbo.ai/api/verify/document', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`
  },
  body: formData
});

const result = await response.json();`
      }
    }
  ]
};

const serviceCredits: Record<string, number> = {
  'Face Recognition': 10,
  'Face Analysis': 8,
  'Object Detection': 6,
  'OCR': 5,
  'ID Verification': 12
};

export default function APIReference() {
  const [activeService, setActiveService] = useState(Object.keys(API_ENDPOINTS)[0]);
  const [activeEndpoint, setActiveEndpoint] = useState(0);
  const [activeTab, setActiveTab] = useState('curl');
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [key]: true });
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [key]: false });
    }, 2000);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 h-full">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">API Reference</h3>
      </div>
      <div className="grid grid-cols-12 divide-x divide-gray-700 h-[calc(100%-57px)]">
        {/* Service Navigation */}
        <div className="col-span-2 border-r border-gray-700 overflow-y-auto">
          <nav className="p-4 space-y-2">
            {Object.keys(API_ENDPOINTS).map((service) => (
              <button
                key={service}
                onClick={() => {
                  setActiveService(service);
                  setActiveEndpoint(0);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                  activeService === service
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{service}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-gray-800/50 text-gray-400">
                    {serviceCredits[service]} credits
                  </span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Documentation Area */}
        <div className="col-span-7 overflow-y-auto">
          <div className="p-6">
            {API_ENDPOINTS[activeService].map((endpoint, index) => (
              <div key={index} className={index === activeEndpoint ? '' : 'hidden'}>
                <div className="space-y-6">
                  {/* Endpoint Header */}
                  <div>
                    <h4 className="text-xl font-medium text-white mb-2">{endpoint.name}</h4>
                    <p className="text-gray-400">{endpoint.description}</p>
                  </div>

                  {/* HTTP Method and URL */}
                  <div className="flex items-center space-x-3 bg-gray-900/50 rounded-lg p-3">
                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-sm font-medium">
                      {endpoint.method}
                    </span>
                    <code className="text-gray-300">{endpoint.url}</code>
                  </div>

                  {/* Parameters */}
                  <div>
                    <h5 className="text-sm font-medium text-white mb-3">Parameters</h5>
                    <div className="bg-gray-900/50 rounded-lg overflow-hidden">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="px-4 py-2 text-sm font-medium text-gray-300">Name</th>
                            <th className="px-4 py-2 text-sm font-medium text-gray-300">Type</th>
                            <th className="px-4 py-2 text-sm font-medium text-gray-300">Required</th>
                            <th className="px-4 py-2 text-sm font-medium text-gray-300">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {endpoint.parameters.map((param) => (
                            <tr key={param.name}>
                              <td className="px-4 py-2 text-sm text-white">{param.name}</td>
                              <td className="px-4 py-2 text-sm text-blue-400">{param.type}</td>
                              <td className="px-4 py-2 text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  param.required
                                    ? 'bg-red-500/10 text-red-400'
                                    : 'bg-gray-700 text-gray-400'
                                }`}>
                                  {param.required ? 'Required' : 'Optional'}
                                </span>
                              </td>
                              <td className="px-4 py-2 text-sm text-gray-400">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Response */}
                  <div>
                    <h5 className="text-sm font-medium text-white mb-3">Response</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-green-400 mb-2">Success Response</div>
                        <CodeBlock
                          code={JSON.stringify(endpoint.response.success, null, 2)}
                          language="json"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-red-400 mb-2">Error Response</div>
                        <CodeBlock
                          code={JSON.stringify(endpoint.response.error, null, 2)}
                          language="json"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Examples - Right side */}
        <div className="col-span-3 overflow-y-auto">
          <div className="p-6">
            <h5 className="text-sm font-medium text-white mb-3">Code Examples</h5>
            <div className="bg-gray-900/50 rounded-lg overflow-hidden">
              <div className="border-b border-gray-700">
                <nav className="flex px-4" aria-label="Tabs">
                  {Object.keys(API_ENDPOINTS[activeService][activeEndpoint].example).map((lang) => (
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
              <div className="relative">
                <CodeBlock
                  code={API_ENDPOINTS[activeService][activeEndpoint].example[activeTab as keyof typeof API_ENDPOINTS[typeof activeService][typeof activeEndpoint]['example']]}
                  language={activeTab === 'curl' ? 'bash' : activeTab}
                />
                <button
                  onClick={() => handleCopy(
                    API_ENDPOINTS[activeService][activeEndpoint].example[activeTab as keyof typeof API_ENDPOINTS[typeof activeService][typeof activeEndpoint]['example']],
                    `${API_ENDPOINTS[activeService][activeEndpoint].name}-${activeTab}`
                  )}
                  className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-200"
                >
                  {copiedStates[`${API_ENDPOINTS[activeService][activeEndpoint].name}-${activeTab}`] ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}