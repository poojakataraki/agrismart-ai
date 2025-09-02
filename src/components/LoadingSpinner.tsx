import React from 'react';
import { Brain, Leaf } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-green-200 rounded-full animate-spin border-t-green-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="w-8 h-8 text-green-600 animate-pulse" />
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Analysis in Progress</h3>
        <p className="text-gray-600 mb-4">Analyzing your farm conditions and generating personalized recommendations...</p>
        
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
            <span>Soil Analysis</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <span>Climate Matching</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            <span>Profitability Calculation</span>
          </div>
        </div>
      </div>
    </div>
  );
}