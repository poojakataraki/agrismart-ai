// src/components/FarmProfileForm.tsx
import React, { useState } from "react";
import { MapPin, Droplets, DollarSign, Calendar, Sprout, Thermometer, Droplet } from "lucide-react";
import { FarmProfile } from "../types";

interface Props {
  onSubmit: (profile: FarmProfile) => void;
  loading: boolean;
}

export function FarmProfileForm({ onSubmit, loading }: Props) {
  const [profile, setProfile] = useState<FarmProfile>({
    location: "",
    soilType: "loamy",
    farmSize: 10,
    climate: "temperate",
    waterAvailability: "moderate",
    budget: "medium",
    previousCrops: [],
    season: "spring",
    N: 90,
    P: 40,
    K: 40,
    temperature: 25,
    humidity: 70,
    ph: 6.5,
    rainfall: 200,
  });

  const [previousCropInput, setPreviousCropInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  const addPreviousCrop = () => {
    if (previousCropInput.trim() && !profile.previousCrops.includes(previousCropInput.toLowerCase())) {
      setProfile((prev) => ({
        ...prev,
        previousCrops: [...prev.previousCrops, previousCropInput.toLowerCase()],
      }));
      setPreviousCropInput("");
    }
  };

  const removePreviousCrop = (crop: string) => {
    setProfile((prev) => ({
      ...prev,
      previousCrops: prev.previousCrops.filter((c) => c !== crop),
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700">
            <MapPin className="w-4 h-4 mr-2 text-green-600" /> Farm Location
          </label>
          <input
            type="text"
            value={profile.location}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            placeholder="e.g., Punjab, India"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Soil Type */}
        <div>
          <label className="text-sm font-medium text-gray-700">Soil Type</label>
          <select
            value={profile.soilType}
            onChange={(e) => setProfile({ ...profile, soilType: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="clay">Clay</option>
            <option value="sandy">Sandy</option>
            <option value="loamy">Loamy</option>
            <option value="silty">Silty</option>
            <option value="peaty">Peaty</option>
            <option value="chalk">Chalk</option>
          </select>
        </div>

        {/* Numeric Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">N (Nitrogen)</label>
            <input
              type="number"
              value={profile.N}
              onChange={(e) => setProfile({ ...profile, N: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">P (Phosphorus)</label>
            <input
              type="number"
              value={profile.P}
              onChange={(e) => setProfile({ ...profile, P: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">K (Potassium)</label>
            <input
              type="number"
              value={profile.K}
              onChange={(e) => setProfile({ ...profile, K: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Temperature (°C)</label>
            <input
              type="number"
              value={profile.temperature}
              onChange={(e) => setProfile({ ...profile, temperature: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Humidity (%)</label>
            <input
              type="number"
              value={profile.humidity}
              onChange={(e) => setProfile({ ...profile, humidity: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">pH Level</label>
            <input
              type="number"
              value={profile.ph}
              step="0.1"
              onChange={(e) => setProfile({ ...profile, ph: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Rainfall (mm)</label>
            <input
              type="number"
              value={profile.rainfall}
              onChange={(e) => setProfile({ ...profile, rainfall: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Previous Crops */}
        <div>
          <label className="text-sm font-medium text-gray-700">Previous Crops</label>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={previousCropInput}
              onChange={(e) => setPreviousCropInput(e.target.value)}
              placeholder="Enter previous crop"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addPreviousCrop())}
            />
            <button type="button" onClick={addPreviousCrop} className="px-4 py-2 bg-green-600 text-white rounded-lg">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.previousCrops.map((crop) => (
              <span key={crop} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                {crop}
                <button type="button" onClick={() => removePreviousCrop(crop)} className="ml-2 text-green-600 hover:text-green-800">
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-4 rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50"
        >
          {loading ? "Analyzing Farm Data..." : "Get Crop Recommendations"}
        </button>
      </form>
    </div>
  );
}
