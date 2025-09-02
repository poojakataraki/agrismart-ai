import React from 'react';
import { Sprout, Brain } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center space-x-4">
          <div className="relative">
            <Sprout className="w-12 h-12" />
            <Brain className="w-6 h-6 absolute -top-2 -right-2 bg-yellow-400 text-green-800 rounded-full p-1" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">AgriSmart AI</h1>
            <p className="text-xl text-green-100 font-medium">Intelligent Crop Recommendations for Modern Farmers</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-lg text-green-100 max-w-3xl mx-auto leading-relaxed">
            Leverage advanced AI algorithms to make informed decisions about crop selection based on your farm's unique conditions, soil type, climate, and market factors.
          </p>
        </div>
      </div>
    </header>
  );
}