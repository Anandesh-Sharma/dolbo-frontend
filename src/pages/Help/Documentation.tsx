import React from 'react';
import { Book, Code, Shield, Zap } from 'lucide-react';

const docs = [
  {
    title: 'Getting Started',
    icon: Zap,
    description: 'Learn the basics of using our API services',
    links: [
      { title: 'Quick Start Guide', href: '#' },
      { title: 'API Overview', href: '#' },
      { title: 'Authentication', href: '#' }
    ]
  },
  {
    title: 'API Reference',
    icon: Code,
    description: 'Detailed API documentation and examples',
    links: [
      { title: 'Face Recognition API', href: '#' },
      { title: 'Object Detection API', href: '#' },
      { title: 'OCR API', href: '#' }
    ]
  },
  {
    title: 'Security',
    icon: Shield,
    description: 'Security best practices and guidelines',
    links: [
      { title: 'API Key Management', href: '#' },
      { title: 'Data Privacy', href: '#' },
      { title: 'Compliance', href: '#' }
    ]
  }
];

export default function Documentation() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">Documentation</h3>
      </div>
      <div className="p-6 grid gap-6">
        {docs.map((section) => (
          <div key={section.title} className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <section.icon className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white">{section.title}</h4>
                <p className="text-sm text-gray-400">{section.description}</p>
              </div>
            </div>
            <div className="ml-11 space-y-2">
              {section.links.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="block text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}