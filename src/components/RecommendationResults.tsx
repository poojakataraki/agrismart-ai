import React from 'react';
import { CropCard } from './CropCard';
import { CropRecommendation } from '../types';
import { TrendingUp, Award, BarChart3 } from 'lucide-react';

interface Props {
  recommendations: CropRecommendation[];
  onReset: () => void;
}

export function RecommendationResults({ recommendations, onReset }: Props) {
  const topCrop = recommendations[0];
  const averageScore = recommendations.reduce((sum, crop) => sum + crop.suitabilityScore, 0) / recommendations.length;
  const totalPotentialRevenue = recommendations.slice(0, 3).reduce((sum, crop) => sum + crop.expectedRevenue, 0);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6 shadow-lg">
          <Award className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Crop Recommendations</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Based on your farm profile, here are the top crop recommendations optimized for your conditions
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-green-500">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{topCrop.suitabilityScore}%</div>
          <div className="text-sm text-gray-500">Best Match Score</div>
          <div className="text-xs text-gray-400 mt-1">{topCrop.name}</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-blue-500">
          <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{averageScore.toFixed(1)}%</div>
          <div className="text-sm text-gray-500">Average Compatibility</div>
          <div className="text-xs text-gray-400 mt-1">All recommendations</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-yellow-500">
          <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">${totalPotentialRevenue.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Revenue Potential</div>
          <div className="text-xs text-gray-400 mt-1">Top 3 crops/acre</div>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {recommendations.map((crop, index) => (
          <CropCard
            key={crop.id}
            crop={crop}
            rank={index + 1}
          />
        ))}
      </div>

      {/* Reset Button */}
      <div className="text-center pt-8">
        <button
          onClick={onReset}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
        >
          Start New Analysis
        </button>
      </div>
    </div>
  );
}