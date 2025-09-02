import React, { useState } from 'react';
import { Header } from './components/Header';
import { FarmProfileForm } from './components/FarmProfileForm';
import { RecommendationResults } from './components/RecommendationResults';
import { LoadingSpinner } from './components/LoadingSpinner';
import { FeatureHighlights } from './components/FeatureHighlights';
import { FarmProfile, CropRecommendation } from './types';
import { calculateCropSuitability } from './utils/recommendationEngine';

type AppState = 'input' | 'loading' | 'results';

function App() {
  const [state, setState] = useState<AppState>('input');
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);

  const handleProfileSubmit = (profile: FarmProfile) => {
    setState('loading');
    
    // Simulate API call with realistic delay
    setTimeout(() => {
      const cropRecommendations = calculateCropSuitability(profile);
      setRecommendations(cropRecommendations);
      setState('results');
    }, 3000);
  };

  const handleReset = () => {
    setState('input');
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        {state === 'input' && (
          <div className="space-y-16">
            <FarmProfileForm onSubmit={handleProfileSubmit} loading={false} />
            <FeatureHighlights />
          </div>
        )}
        
        {state === 'loading' && <LoadingSpinner />}
        
        {state === 'results' && (
          <RecommendationResults
            recommendations={recommendations}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="relative">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
            </div>
            <span className="text-xl font-bold">AgriSmart AI</span>
          </div>
          <p className="text-gray-400 mb-6">Empowering farmers with intelligent crop recommendations</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Technology</h3>
              <p className="text-gray-400">AI-powered recommendations using advanced algorithms and agricultural data</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Support</h3>
              <p className="text-gray-400">24/7 agricultural expert consultation and technical support available</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Impact</h3>
              <p className="text-gray-400">Helping farmers increase yields and profitability through smart farming decisions</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-gray-400">
            <p>&copy; 2025 AgriSmart AI. Revolutionizing agriculture through artificial intelligence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;