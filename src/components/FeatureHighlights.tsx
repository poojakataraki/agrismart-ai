import React from 'react';
import { Brain, TrendingUp, Calendar, Shield, Globe, BarChart3 } from 'lucide-react';

export function FeatureHighlights() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze multiple factors for optimal crop selection',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Profitability Insights',
      description: 'Detailed ROI calculations and market analysis for informed financial decisions',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Calendar,
      title: 'Seasonal Planning',
      description: 'Optimal planting and harvesting schedules based on local climate patterns',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Evaluate potential risks and mitigation strategies for each crop option',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Globe,
      title: 'Climate Adaptation',
      description: 'Recommendations adapted to your specific geographic and climatic conditions',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: BarChart3,
      title: 'Performance Tracking',
      description: 'Monitor and track the success of implemented recommendations over time',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AgriSmart AI?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with agricultural expertise to help you make the best farming decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group hover:scale-105"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}