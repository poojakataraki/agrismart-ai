import React from 'react';
import { Droplets, DollarSign, Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { CropRecommendation } from '../types';

interface Props {
  crop: CropRecommendation;
  rank: number;
}

export function CropCard({ crop, rank }: Props) {
  const getProfitabilityColor = (profitability: string) => {
    switch (profitability) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getWaterColor = (requirement: string) => {
    switch (requirement) {
      case 'high': return 'text-blue-600';
      case 'medium': return 'text-blue-500';
      case 'low': return 'text-blue-400';
      default: return 'text-blue-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const roi = ((crop.expectedRevenue - crop.initialInvestment) / crop.initialInvestment * 100);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-green-500 relative group hover:scale-[1.02]">
      {/* Rank Badge */}
      <div className="absolute -top-3 -right-3 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
        #{rank}
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{crop.name}</h3>
            <p className="text-sm text-gray-500 italic">{crop.scientificName}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(crop.suitabilityScore)}`}>
            {crop.suitabilityScore}% Match
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{crop.description}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <div className="text-sm text-gray-500">Expected Yield</div>
          <div className="text-lg font-bold text-gray-900">{crop.expectedYield.toLocaleString()} kg/acre</div>
        </div>

        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <div className="text-sm text-gray-500">ROI</div>
          <div className="text-lg font-bold text-gray-900">{roi.toFixed(1)}%</div>
        </div>

        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Clock className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <div className="text-sm text-gray-500">Growth Period</div>
          <div className="text-lg font-bold text-gray-900">{crop.growthDuration} days</div>
        </div>

        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Droplets className={`w-5 h-5 mx-auto mb-1 ${getWaterColor(crop.waterRequirement)}`} />
          <div className="text-sm text-gray-500">Water Need</div>
          <div className="text-lg font-bold text-gray-900 capitalize">{crop.waterRequirement}</div>
        </div>
      </div>

      {/* Financial Details */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Financial Analysis</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Initial Investment</div>
            <div className="text-lg font-bold text-gray-900">${crop.initialInvestment.toLocaleString()}/acre</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Expected Revenue</div>
            <div className="text-lg font-bold text-gray-900">${crop.expectedRevenue.toLocaleString()}/acre</div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getProfitabilityColor(crop.profitability)}`}>
          {crop.profitability} profitability
        </span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(crop.difficulty)}`}>
          {crop.difficulty} level
        </span>
      </div>

      {/* Planting Schedule */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Planting Schedule</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Plant:</span>
            <span className="ml-2 font-medium">{crop.plantingTime}</span>
          </div>
          <div>
            <span className="text-gray-500">Harvest:</span>
            <span className="ml-2 font-medium">{crop.harvestTime}</span>
          </div>
        </div>
      </div>

      {/* Expert Tips */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-700 flex items-center">
          <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
          Expert Tips
        </h4>
        <ul className="space-y-1">
          {crop.tips.map((tip, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}