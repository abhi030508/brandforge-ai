/**
 * Type definitions for Brand Extension API
 */

export interface BrandExtensionRequest {
  currentBrand: string;
  coreStrength: string;
  targetCategory: string;
}

export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface AidaFramework {
  attention: string;
  interest: string;
  desire: string;
  action: string;
}

export interface TargetPersona {
  demographics: string;
  psychographics: string;
  painPoints: string[];
  goals: string[];
}

export interface BrandExtensionOutput {
  brandExtensionName: string;
  swotAnalysis: SwotAnalysis;
  aidaFramework: AidaFramework;
  targetPersona: TargetPersona;
}

export interface BrandExtensionResponse {
  success: boolean;
  data: BrandExtensionOutput;
  metadata: {
    brand: string;
    category: string;
    timestamp: string;
  };
}

export interface ApiErrorResponse {
  error: string;
  details: string;
}

// Made with Bob
