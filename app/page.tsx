'use client';

import { useState } from 'react';
import { 
  Sparkles, 
  Loader2, 
  TrendingUp, 
  Target, 
  Users, 
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  Heart,
  Zap,
  ArrowRight
} from 'lucide-react';
import type { BrandExtensionResponse, ApiErrorResponse } from '@/types/brand-extension';
import { generateLogoDataUri } from '@/lib/logo-generator';

type TabType = 'overview' | 'swot' | 'aida' | 'persona';

export default function Home() {
  const [currentBrand, setCurrentBrand] = useState('');
  const [coreStrength, setCoreStrength] = useState('');
  const [targetCategory, setTargetCategory] = useState('');
  const [customInstructions, setCustomInstructions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BrandExtensionResponse | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [currentBrandLogo, setCurrentBrandLogo] = useState<string | null>(null);
  const [currentBrandName, setCurrentBrandName] = useState('');

  const generateLogos = async (brandName: string, strength: string, category: string) => {
    setCurrentBrandName(brandName);
    // Show the instant gradient badge immediately, then try to upgrade to a real
    // AI-generated logo in the background. If that fails (e.g. billing/balance
    // issue), the badge already showing stays as a graceful fallback.
    setCurrentBrandLogo(generateLogoDataUri(brandName));

    try {
      const res = await fetch('/api/generate-logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brandName, coreStrength: strength, category }),
      });
      const data = await res.json();
      if (res.ok && data.image) {
        setCurrentBrandLogo(`data:image/png;base64,${data.image}`);
      }
    } catch {
      // Silently keep the gradient badge already showing
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setCurrentBrandLogo(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentBrand,
          coreStrength,
          targetCategory,
          customInstructions,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as ApiErrorResponse;
        throw new Error(errorData.details || 'Failed to generate strategy');
      }

      setResult(data as BrandExtensionResponse);
      setActiveTab('overview');

      // Kick off logo generation in the background; it doesn't block the main result
      generateLogos(currentBrand, coreStrength, targetCategory);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = currentBrand.trim() && coreStrength.trim() && targetCategory.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BrandForge AI
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Marketing Brand Extension & Ideation Platform
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Configuration */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <Target className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Brand Configuration
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Current Brand Name */}
                <div>
                  <label htmlFor="currentBrand" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Brand Name
                  </label>
                  <input
                    type="text"
                    id="currentBrand"
                    value={currentBrand}
                    onChange={(e) => setCurrentBrand(e.target.value)}
                    placeholder="e.g., Horlicks"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all"
                    disabled={loading}
                  />
                </div>

                {/* Brand Core Strengths */}
                <div>
                  <label htmlFor="coreStrength" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Brand Core Strengths
                  </label>
                  <textarea
                    id="coreStrength"
                    value={coreStrength}
                    onChange={(e) => setCoreStrength(e.target.value)}
                    placeholder="e.g., Nutrition, trust, health malt"
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all resize-none"
                    disabled={loading}
                  />
                </div>

                {/* Target Extension Category */}
                <div>
                  <label htmlFor="targetCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Extension Category
                  </label>
                  <input
                    type="text"
                    id="targetCategory"
                    value={targetCategory}
                    onChange={(e) => setTargetCategory(e.target.value)}
                    placeholder="e.g., Energy Bars or Energy Drinks"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all"
                    disabled={loading}
                  />
                </div>

                {/* Custom Instructions / Suggestions */}
                <div>
                  <label htmlFor="customInstructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Additional Instructions <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="customInstructions"
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    placeholder="e.g., focus on Gen Z appeal, keep it budget-friendly, avoid dairy, emphasize sustainability..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all resize-none"
                    disabled={loading}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Forging Strategy...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Forge Extension Strategy</span>
                    </>
                  )}
                </button>
              </form>

              {/* Error Display */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-300">Error</p>
                    <p className="text-sm text-red-700 dark:text-red-400 mt-1">{error}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Results */}
          <div className="lg:col-span-2">
            {!result && !loading && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-12 text-center">
                <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Ready to Forge Your Brand Extension?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill in the brand details on the left and click &ldquo;Forge Extension Strategy&rdquo; to generate AI-powered insights.
                </p>
              </div>
            )}

            {result && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <div className="flex overflow-x-auto">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                        activeTab === 'overview'
                          ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400'
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                      }`}
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Overview</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('swot')}
                      className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                        activeTab === 'swot'
                          ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400'
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                      }`}
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>SWOT Analysis</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('aida')}
                      className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                        activeTab === 'aida'
                          ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400'
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                      }`}
                    >
                      <Target className="w-4 h-4" />
                      <span>Marketing Blueprint</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('persona')}
                      className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                        activeTab === 'persona'
                          ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400'
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span>Target Persona</span>
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                          <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                          {result.data.brandExtensionName}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                          Brand Extension for {result.metadata.brand}
                        </p>
                      </div>

                      {/* Logo */}
                      <div className="flex justify-center">
                        <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-8 border border-gray-200 dark:border-gray-700 text-center inline-block">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">
                            {result.metadata.brand} Logo
                          </h4>
                          {currentBrandLogo && (
                            <img
                              src={currentBrandLogo}
                              alt={`${result.metadata.brand} logo`}
                              className="w-80 h-80 mx-auto rounded-lg object-contain bg-white p-4"
                            />
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                          <div className="flex items-center space-x-2 mb-2">
                            <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <h3 className="font-semibold text-blue-900 dark:text-blue-300">Category</h3>
                          </div>
                          <p className="text-blue-800 dark:text-blue-400">{result.metadata.category}</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                          <div className="flex items-center space-x-2 mb-2">
                            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            <h3 className="font-semibold text-purple-900 dark:text-purple-300">Parent Brand</h3>
                          </div>
                          <p className="text-purple-800 dark:text-purple-400">{result.metadata.brand}</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                            <h3 className="font-semibold text-green-900 dark:text-green-300">Status</h3>
                          </div>
                          <p className="text-green-800 dark:text-green-400">Strategy Generated</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SWOT Analysis Tab */}
                  {activeTab === 'swot' && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">SWOT Analysis</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Strengths */}
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                          <div className="flex items-center space-x-2 mb-4">
                            <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                            <h4 className="text-lg font-semibold text-green-900 dark:text-green-300">Strengths</h4>
                          </div>
                          <ul className="space-y-2">
                            {result.data.swotAnalysis.strengths.map((item, index) => (
                              <li key={index} className="flex items-start space-x-2 text-green-800 dark:text-green-400">
                                <span className="text-green-600 dark:text-green-500 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Weaknesses */}
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                          <div className="flex items-center space-x-2 mb-4">
                            <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                            <h4 className="text-lg font-semibold text-red-900 dark:text-red-300">Weaknesses</h4>
                          </div>
                          <ul className="space-y-2">
                            {result.data.swotAnalysis.weaknesses.map((item, index) => (
                              <li key={index} className="flex items-start space-x-2 text-red-800 dark:text-red-400">
                                <span className="text-red-600 dark:text-red-500 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Opportunities */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                          <div className="flex items-center space-x-2 mb-4">
                            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-300">Opportunities</h4>
                          </div>
                          <ul className="space-y-2">
                            {result.data.swotAnalysis.opportunities.map((item, index) => (
                              <li key={index} className="flex items-start space-x-2 text-blue-800 dark:text-blue-400">
                                <span className="text-blue-600 dark:text-blue-500 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Threats */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                          <div className="flex items-center space-x-2 mb-4">
                            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                            <h4 className="text-lg font-semibold text-yellow-900 dark:text-yellow-300">Threats</h4>
                          </div>
                          <ul className="space-y-2">
                            {result.data.swotAnalysis.threats.map((item, index) => (
                              <li key={index} className="flex items-start space-x-2 text-yellow-800 dark:text-yellow-400">
                                <span className="text-yellow-600 dark:text-yellow-500 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AIDA Framework Tab */}
                  {activeTab === 'aida' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Marketing Blueprint (AIDA Model)</h3>
                      
                      <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

                        {/* Attention */}
                        <div className="relative pl-20 pb-8">
                          <div className="absolute left-4 top-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <Eye className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                            <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center space-x-2">
                              <span>Attention</span>
                              <ArrowRight className="w-4 h-4" />
                            </h4>
                            <p className="text-blue-800 dark:text-blue-400">{result.data.aidaFramework.attention}</p>
                          </div>
                        </div>

                        {/* Interest */}
                        <div className="relative pl-20 pb-8">
                          <div className="absolute left-4 top-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <Lightbulb className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                            <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-3 flex items-center space-x-2">
                              <span>Interest</span>
                              <ArrowRight className="w-4 h-4" />
                            </h4>
                            <p className="text-purple-800 dark:text-purple-400">{result.data.aidaFramework.interest}</p>
                          </div>
                        </div>

                        {/* Desire */}
                        <div className="relative pl-20 pb-8">
                          <div className="absolute left-4 top-0 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                            <Heart className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-6 border border-pink-200 dark:border-pink-800">
                            <h4 className="text-lg font-semibold text-pink-900 dark:text-pink-300 mb-3 flex items-center space-x-2">
                              <span>Desire</span>
                              <ArrowRight className="w-4 h-4" />
                            </h4>
                            <p className="text-pink-800 dark:text-pink-400">{result.data.aidaFramework.desire}</p>
                          </div>
                        </div>

                        {/* Action */}
                        <div className="relative pl-20">
                          <div className="absolute left-4 top-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                            <h4 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3 flex items-center space-x-2">
                              <span>Action</span>
                              <CheckCircle2 className="w-4 h-4" />
                            </h4>
                            <p className="text-green-800 dark:text-green-400">{result.data.aidaFramework.action}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Target Persona Tab */}
                  {activeTab === 'persona' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Target Consumer Persona</h3>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <Users className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Ideal Customer Profile</h4>
                            <p className="text-gray-600 dark:text-gray-400">Detailed persona analysis</p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {/* Demographics */}
                          <div>
                            <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                              <Users className="w-5 h-5 text-blue-600" />
                              <span>Demographics</span>
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 rounded-lg p-4">
                              {result.data.targetPersona.demographics}
                            </p>
                          </div>

                          {/* Psychographics */}
                          <div>
                            <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                              <Heart className="w-5 h-5 text-purple-600" />
                              <span>Psychographics</span>
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 rounded-lg p-4">
                              {result.data.targetPersona.psychographics}
                            </p>
                          </div>

                          {/* Pain Points */}
                          <div>
                            <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                              <AlertCircle className="w-5 h-5 text-red-600" />
                              <span>Pain Points</span>
                            </h5>
                            <ul className="space-y-2">
                              {result.data.targetPersona.painPoints.map((point, index) => (
                                <li key={index} className="flex items-start space-x-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 rounded-lg p-3">
                                  <span className="text-red-500 mt-1">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Goals */}
                          <div>
                            <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                              <Target className="w-5 h-5 text-green-600" />
                              <span>Goals</span>
                            </h5>
                            <ul className="space-y-2">
                              {result.data.targetPersona.goals.map((goal, index) => (
                                <li key={index} className="flex items-start space-x-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 rounded-lg p-3">
                                  <span className="text-green-500 mt-1">•</span>
                                  <span>{goal}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
