import React from 'react';
import { Camera, FileSearch, Scan, Brain } from 'lucide-react';

export default function Services() {
  const services = [
    {
      name: 'Face Detection & Recognition',
      description: 'Advanced facial detection, recognition, and anti-spoofing capabilities.',
      icon: Camera,
    },
    {
      name: 'Object Detection',
      description: 'Precise object detection and classification for various applications.',
      icon: Scan,
    },
    {
      name: 'OCR Solutions',
      description: 'Extract text from images and documents with high accuracy.',
      icon: FileSearch,
    },
    {
      name: 'ID Document Processing',
      description: 'Automated ID document verification and data extraction.',
      icon: Brain,
    },
  ];

  return (
    <div className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-lg text-gray-400">
            Comprehensive AI solutions for your business needs
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex flex-col bg-gray-800 rounded-lg p-8 hover:bg-gray-750 transition-colors duration-300"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <service.icon className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium">{service.name}</h3>
                    <p className="mt-2 text-gray-400">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}