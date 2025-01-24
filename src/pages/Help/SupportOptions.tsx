import React from 'react';
import { MessageCircle, Mail, Phone, Clock } from 'lucide-react';

export default function SupportOptions() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Contact Support</h3>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <MessageCircle className="h-5 w-5 mr-2" />
            Start Live Chat
          </button>
          <a
            href="mailto:support@dolbo.ai"
            className="w-full flex items-center justify-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            <Mail className="h-5 w-5 mr-2" />
            Email Support
          </a>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Support Hours</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-white">Monday - Friday</p>
              <p className="text-sm text-gray-400">9:00 AM - 6:00 PM EST</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Phone className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-white">Emergency Support</p>
              <p className="text-sm text-gray-400">24/7 for Enterprise customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}