// src/components/RecommendationResults.tsx
import React from "react";
import { CropRecommendation } from "../types";

interface Props {
  recommendations: CropRecommendation[];
  onReset: () => void;
}

export const RecommendationResults: React.FC<Props> = ({ recommendations, onReset }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-green-700">🌱 Crop Recommendations</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all border border-gray-100"
          >
            <h3 className="text-xl font-semibold text-gray-800">{rec.crop}</h3>
            <p className="text-gray-500 mt-2">Suitability Score</p>
            <p className="text-2xl font-bold text-green-600">{rec.score}%</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition"
        >
          🔄 Try Again
        </button>
      </div>
    </div>
  );
};
