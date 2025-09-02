import React, { useState } from 'react';
import { MapPin, Droplets, DollarSign, Calendar, Sprout } from 'lucide-react';
import { FarmProfile } from '../types';

interface Props {
  onSubmit: (profile: FarmProfile) => void;
  loading: boolean;
}

export function FarmProfileForm({ onSubmit, loading }: Props) {
  const [profile, setProfile] = useState<FarmProfile>({
    location: '',
    soilType: 'loamy',
    farmSize: 10,
    climate: 'temperate',
    waterAvailability: 'moderate',
    budget: 'medium',
    previousCrops: [],
    season: 'spring'
  });

  const [previousCropInput, setPreviousCropInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  const addPreviousCrop = () => {
    if (previousCropInput.trim() && !profile.previousCrops.includes(previousCropInput.toLowerCase())) {
      setProfile(prev => ({
        ...prev,
        previousCrops: [...prev.previousCrops, previousCropInput.toLowerCase()]
      }));
      setPreviousCropInput('');
    }
  };

  const removePreviousCrop = (crop: string) => {
    setProfile(prev => ({
      ...prev,
      previousCrops: prev.previousCrops.filter(c => c !== crop)
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Sprout className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Farm Profile Setup</h2>
        <p className="text-gray-600">Tell us about your farm to get personalized crop recommendations</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Location */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <MapPin className="w-4 h-4 mr-2 text-green-600" />
              Farm Location
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., Punjab, India"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Farm Size */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <MapPin className="w-4 h-4 mr-2 text-green-600" />
              Farm Size (acres)
            </label>
            <input
              type="number"
              value={profile.farmSize}
              onChange={(e) => setProfile(prev => ({ ...prev, farmSize: Number(e.target.value) }))}
              min="0.1"
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Soil Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Soil Type</label>
            <select
              value={profile.soilType}
              onChange={(e) => setProfile(prev => ({ ...prev, soilType: e.target.value as any }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            >
              <option value="clay">Clay Soil</option>
              <option value="sandy">Sandy Soil</option>
              <option value="loamy">Loamy Soil (Best)</option>
              <option value="silty">Silty Soil</option>
              <option value="peaty">Peaty Soil</option>
              <option value="chalk">Chalk Soil</option>
            </select>
          </div>

          {/* Climate */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Climate Type</label>
            <select
              value={profile.climate}
              onChange={(e) => setProfile(prev => ({ ...prev, climate: e.target.value as any }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            >
              <option value="tropical">Tropical</option>
              <option value="temperate">Temperate</option>
              <option value="arid">Arid/Desert</option>
              <option value="continental">Continental</option>
              <option value="mediterranean">Mediterranean</option>
            </select>
          </div>

          {/* Water Availability */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Droplets className="w-4 h-4 mr-2 text-blue-600" />
              Water Availability
            </label>
            <select
              value={profile.waterAvailability}
              onChange={(e) => setProfile(prev => ({ ...prev, waterAvailability: e.target.value as any }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            >
              <option value="abundant">Abundant (River/Canal)</option>
              <option value="moderate">Moderate (Wells/Bore)</option>
              <option value="limited">Limited (Rainwater)</option>
            </select>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <DollarSign className="w-4 h-4 mr-2 text-yellow-600" />
              Investment Budget
            </label>
            <select
              value={profile.budget}
              onChange={(e) => setProfile(prev => ({ ...prev, budget: e.target.value as any }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            >
              <option value="low">Low (&lt; $50k)</option>
              <option value="medium">Medium ($50k - $200k)</option>
              <option value="high">High (&gt; $200k)</option>
            </select>
          </div>

          {/* Season */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4 mr-2 text-purple-600" />
              Planting Season
            </label>
            <select
              value={profile.season}
              onChange={(e) => setProfile(prev => ({ ...prev, season: e.target.value as any }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            >
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="fall">Fall/Autumn</option>
              <option value="winter">Winter</option>
            </select>
          </div>

          {/* Previous Crops */}
          <div className="space-y-2 lg:col-span-2">
            <label className="text-sm font-medium text-gray-700">Previous Crops (for rotation planning)</label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={previousCropInput}
                onChange={(e) => setPreviousCropInput(e.target.value)}
                placeholder="Enter previous crop name"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPreviousCrop())}
              />
              <button
                type="button"
                onClick={addPreviousCrop}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Add
              </button>
            </div>
            {profile.previousCrops.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {profile.previousCrops.map(crop => (
                  <span
                    key={crop}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                  >
                    {crop}
                    <button
                      type="button"
                      onClick={() => removePreviousCrop(crop)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !profile.location.trim()}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-4 rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? 'Analyzing Farm Data...' : 'Get Crop Recommendations'}
        </button>
      </form>
    </div>
  );
}