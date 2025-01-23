import React from 'react';
import Documentation from './Documentation';
import FAQSection from './FAQSection';
import SupportOptions from './SupportOptions';
import SearchBar from './SearchBar';

export default function Help() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Help & Support</h2>
        <p className="mt-1 text-gray-400">Documentation, guides, and support resources</p>
      </div>

      <SearchBar />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Documentation />
          <FAQSection />
        </div>
        <div>
          <SupportOptions />
        </div>
      </div>
    </div>
  );
}