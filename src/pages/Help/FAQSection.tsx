import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How do I get started with the API?',
    answer: 'To get started, sign up for an account and generate an API key. You can then use this key to authenticate your requests to our API endpoints.'
  },
  {
    question: 'What are the API rate limits?',
    answer: 'Rate limits vary by plan. Free tier users get 1000 requests per month, while paid plans have higher or custom limits.'
  },
  {
    question: 'How is billing calculated?',
    answer: 'Billing is based on the number of API requests made per month. Each successful API call counts as one request.'
  },
  {
    question: 'What image formats are supported?',
    answer: 'We support JPEG, PNG, and WebP formats. Maximum file size is 5MB per image.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-800">
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-medium text-white">Frequently Asked Questions</h3>
      </div>
      <div className="divide-y divide-gray-700">
        {faqs.map((faq, index) => (
          <div key={index} className="p-6">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between text-left"
            >
              <span className="text-white font-medium">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {openIndex === index && (
              <p className="mt-4 text-gray-400">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}