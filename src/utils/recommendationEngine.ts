import { FarmProfile, CropRecommendation } from '../types';

const cropDatabase: Omit<CropRecommendation, 'suitabilityScore'>[] = [
  {
    id: 'rice',
    name: 'Rice',
    scientificName: 'Oryza sativa',
    expectedYield: 4500,
    profitability: 'medium',
    plantingTime: 'June - July',
    harvestTime: 'October - November',
    waterRequirement: 'high',
    soilPreference: ['clay', 'loamy'],
    climate: ['tropical', 'temperate'],
    initialInvestment: 800,
    expectedRevenue: 1500,
    growthDuration: 120,
    difficulty: 'intermediate',
    description: 'Staple grain crop with consistent market demand and good storage life.',
    tips: ['Ensure proper water management', 'Monitor for pest control', 'Use certified seeds']
  },
  {
    id: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    expectedYield: 3200,
    profitability: 'medium',
    plantingTime: 'October - December',
    harvestTime: 'March - May',
    waterRequirement: 'medium',
    soilPreference: ['loamy', 'silty'],
    climate: ['temperate', 'continental'],
    initialInvestment: 600,
    expectedRevenue: 1200,
    growthDuration: 150,
    difficulty: 'beginner',
    description: 'Hardy cereal crop suitable for cooler climates with excellent market value.',
    tips: ['Plant in well-drained soil', 'Apply fertilizer at right time', 'Store in dry conditions']
  },
  {
    id: 'corn',
    name: 'Corn',
    scientificName: 'Zea mays',
    expectedYield: 5500,
    profitability: 'high',
    plantingTime: 'April - June',
    harvestTime: 'September - October',
    waterRequirement: 'medium',
    soilPreference: ['loamy', 'sandy'],
    climate: ['temperate', 'continental'],
    initialInvestment: 700,
    expectedRevenue: 1800,
    growthDuration: 120,
    difficulty: 'intermediate',
    description: 'High-yield crop with multiple uses including food, feed, and biofuel.',
    tips: ['Ensure adequate spacing', 'Monitor soil moisture', 'Protect from birds during maturation']
  },
  {
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    expectedYield: 4000,
    profitability: 'high',
    plantingTime: 'March - May',
    harvestTime: 'July - September',
    waterRequirement: 'medium',
    soilPreference: ['loamy', 'silty'],
    climate: ['tropical', 'temperate', 'mediterranean'],
    initialInvestment: 1000,
    expectedRevenue: 2500,
    growthDuration: 90,
    difficulty: 'intermediate',
    description: 'High-value vegetable crop with strong market demand and good profit margins.',
    tips: ['Support with stakes', 'Regular pruning required', 'Protect from diseases']
  },
  {
    id: 'cotton',
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    expectedYield: 1200,
    profitability: 'medium',
    plantingTime: 'April - May',
    harvestTime: 'October - December',
    waterRequirement: 'medium',
    soilPreference: ['loamy', 'sandy'],
    climate: ['tropical', 'arid'],
    initialInvestment: 900,
    expectedRevenue: 1600,
    growthDuration: 180,
    difficulty: 'advanced',
    description: 'Cash crop with stable market but requires careful management.',
    tips: ['Monitor for bollworm', 'Proper irrigation timing', 'Quality seed selection']
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    scientificName: 'Saccharum officinarum',
    expectedYield: 8000,
    profitability: 'high',
    plantingTime: 'February - April',
    harvestTime: 'December - March',
    waterRequirement: 'high',
    soilPreference: ['loamy', 'clay'],
    climate: ['tropical'],
    initialInvestment: 1200,
    expectedRevenue: 2800,
    growthDuration: 300,
    difficulty: 'advanced',
    description: 'Long-duration cash crop with excellent returns for suitable conditions.',
    tips: ['Requires consistent water supply', 'Heavy machinery for harvest', 'Long-term commitment']
  },
  {
    id: 'potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    expectedYield: 3500,
    profitability: 'medium',
    plantingTime: 'January - March',
    harvestTime: 'May - July',
    waterRequirement: 'medium',
    soilPreference: ['sandy', 'loamy'],
    climate: ['temperate', 'continental'],
    initialInvestment: 800,
    expectedRevenue: 1400,
    growthDuration: 90,
    difficulty: 'beginner',
    description: 'Versatile crop with consistent demand and relatively simple cultivation.',
    tips: ['Proper hilling essential', 'Store in cool, dark places', 'Monitor for late blight']
  },
  {
    id: 'soybean',
    name: 'Soybean',
    scientificName: 'Glycine max',
    expectedYield: 2800,
    profitability: 'medium',
    plantingTime: 'May - June',
    harvestTime: 'September - October',
    waterRequirement: 'medium',
    soilPreference: ['loamy', 'silty'],
    climate: ['temperate', 'continental'],
    initialInvestment: 500,
    expectedRevenue: 1100,
    growthDuration: 120,
    difficulty: 'beginner',
    description: 'Nitrogen-fixing legume that improves soil health while providing good returns.',
    tips: ['Inoculate seeds with rhizobia', 'Good rotation crop', 'Monitor for aphids']
  }
];

export function calculateCropSuitability(profile: FarmProfile): CropRecommendation[] {
  const recommendations = cropDatabase.map(crop => {
    let score = 0;
    
    // Soil type matching (30% weight)
    if (crop.soilPreference.includes(profile.soilType)) {
      score += 30;
    }
    
    // Climate matching (25% weight)
    if (crop.climate.includes(profile.climate)) {
      score += 25;
    }
    
    // Water availability matching (20% weight)
    const waterMatch = getWaterMatch(crop.waterRequirement, profile.waterAvailability);
    score += waterMatch * 20;
    
    // Budget considerations (15% weight)
    const budgetMatch = getBudgetMatch(crop.initialInvestment, profile.budget, profile.farmSize);
    score += budgetMatch * 15;
    
    // Farm size considerations (10% weight)
    const sizeMatch = getSizeMatch(crop.name, profile.farmSize);
    score += sizeMatch * 10;
    
    // Bonus for crop rotation (avoid previous crops)
    if (!profile.previousCrops.includes(crop.name.toLowerCase())) {
      score += 5;
    }
    
    return {
      ...crop,
      suitabilityScore: Math.min(100, Math.max(0, score))
    };
  });
  
  return recommendations
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore)
    .slice(0, 6);
}

function getWaterMatch(requirement: string, availability: string): number {
  const matchMatrix: Record<string, Record<string, number>> = {
    'high': { 'abundant': 1, 'moderate': 0.6, 'limited': 0.2 },
    'medium': { 'abundant': 0.9, 'moderate': 1, 'limited': 0.5 },
    'low': { 'abundant': 0.8, 'moderate': 0.9, 'limited': 1 }
  };
  
  return matchMatrix[requirement]?.[availability] || 0.5;
}

function getBudgetMatch(investment: number, budget: string, farmSize: number): number {
  const totalInvestment = investment * farmSize;
  
  const budgetRanges = {
    'low': 50000,
    'medium': 200000,
    'high': 500000
  };
  
  const maxBudget = budgetRanges[budget];
  
  if (totalInvestment <= maxBudget * 0.5) return 1;
  if (totalInvestment <= maxBudget) return 0.7;
  if (totalInvestment <= maxBudget * 1.5) return 0.4;
  return 0.1;
}

function getSizeMatch(cropName: string, farmSize: number): number {
  const idealSizes: Record<string, { min: number; max: number }> = {
    'Rice': { min: 2, max: 50 },
    'Wheat': { min: 5, max: 100 },
    'Corn': { min: 1, max: 80 },
    'Tomato': { min: 0.5, max: 10 },
    'Cotton': { min: 3, max: 200 },
    'Sugarcane': { min: 2, max: 100 },
    'Potato': { min: 0.5, max: 20 },
    'Soybean': { min: 1, max: 150 }
  };
  
  const ideal = idealSizes[cropName];
  if (!ideal) return 0.5;
  
  if (farmSize >= ideal.min && farmSize <= ideal.max) return 1;
  if (farmSize < ideal.min) return farmSize / ideal.min;
  return Math.max(0.2, ideal.max / farmSize);
}