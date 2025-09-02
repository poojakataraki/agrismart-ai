export interface FarmProfile {
  location: string;
  soilType: 'clay' | 'sandy' | 'loamy' | 'silty' | 'peaty' | 'chalk';
  farmSize: number;
  climate: 'tropical' | 'temperate' | 'arid' | 'continental' | 'mediterranean';
  waterAvailability: 'abundant' | 'moderate' | 'limited';
  budget: 'low' | 'medium' | 'high';
  previousCrops: string[];
  season: 'spring' | 'summer' | 'fall' | 'winter';
}

export interface CropRecommendation {
  id: string;
  name: string;
  scientificName: string;
  suitabilityScore: number;
  expectedYield: number;
  profitability: 'low' | 'medium' | 'high';
  plantingTime: string;
  harvestTime: string;
  waterRequirement: 'low' | 'medium' | 'high';
  soilPreference: string[];
  climate: string[];
  initialInvestment: number;
  expectedRevenue: number;
  growthDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  tips: string[];
}</parameter>