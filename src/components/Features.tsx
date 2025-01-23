import React from 'react';
import { Shield, Brain, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      name: 'High Accuracy',
      description: 'State-of-the-art AI models delivering exceptional accuracy across all services.',
      icon: Brain,
    },
    {
      name: 'Real-time Processing',
      description: 'Lightning-fast processing for immediate results in your applications.',
      icon: Zap,
    },
    {
      name: 'Enterprise Security',
      description: 'Bank-grade security with encrypted data processing and storage.',
      icon: Shield,
    },
  ];

  return (
    <div className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Why Choose dolbo.ai?
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Enterprise-grade AI solutions built for scale and reliability
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-gray-900 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-400">{feature.description}</p>
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