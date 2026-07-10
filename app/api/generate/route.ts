import { NextRequest, NextResponse } from 'next/server';
import { WatsonxAI } from '@langchain/community/llms/watsonx_ai';
import { PromptTemplate } from '@langchain/core/prompts';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import type { BrandExtensionOutput, BrandExtensionRequest } from '@/types/brand-extension';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { currentBrand, coreStrength, targetCategory } = body;

    // Validate input
    if (!currentBrand || !coreStrength || !targetCategory) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          details: 'currentBrand, coreStrength, and targetCategory are required',
        },
        { status: 400 }
      );
    }

    // Validate watsonx.ai configuration
    if (!process.env.WATSONX_API_KEY) {
      return NextResponse.json(
        {
          error: 'Configuration Error',
          details: 'WATSONX_API_KEY is not configured. Please set it in environment variables.',
        },
        { status: 500 }
      );
    }

    if (!process.env.WATSONX_PROJECT_ID) {
      return NextResponse.json(
        {
          error: 'Configuration Error',
          details: 'WATSONX_PROJECT_ID is not configured. Please set it in environment variables.',
        },
        { status: 500 }
      );
    }

    // Initialize IBM watsonx.ai with Granite model
    const model = new WatsonxAI({
      ibmCloudApiKey: process.env.WATSONX_API_KEY,
      projectId: process.env.WATSONX_PROJECT_ID,
      modelId: 'ibm/granite-4-h-small',
      modelParameters: {
        max_new_tokens: 2000,
        temperature: 0.7,
        top_p: 1,
        top_k: 50,
      },
    });

    // Create a structured prompt template
    const promptTemplate = PromptTemplate.fromTemplate(`
You are an elite corporate marketing strategist with 20+ years of experience in brand extension and market positioning. Your expertise lies in creating data-driven, innovative brand strategies that resonate with target audiences.

TASK: Develop a comprehensive brand extension strategy for the following:

Current Brand: {currentBrand}
Core Strengths: {coreStrength}
Target Category: {targetCategory}

INSTRUCTIONS:
1. Analyze the brand's core strengths and how they translate to the new category
2. Create a compelling brand extension name that maintains brand equity
3. Conduct a thorough SWOT analysis specific to this extension
4. Develop an AIDA framework for market entry
5. Define the target persona with precision

OUTPUT FORMAT (STRICT JSON):
{{
  "brandExtensionName": "A catchy, memorable name that connects to the parent brand",
  "swotAnalysis": {{
    "strengths": ["strength 1", "strength 2", "strength 3"],
    "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
    "opportunities": ["opportunity 1", "opportunity 2", "opportunity 3"],
    "threats": ["threat 1", "threat 2", "threat 3"]
  }},
  "aidaFramework": {{
    "attention": "Strategy to grab attention (2-3 sentences)",
    "interest": "Strategy to build interest (2-3 sentences)",
    "desire": "Strategy to create desire (2-3 sentences)",
    "action": "Strategy to drive action (2-3 sentences)"
  }},
  "targetPersona": {{
    "demographics": "Age, gender, income, location, education",
    "psychographics": "Lifestyle, values, interests, attitudes",
    "painPoints": ["pain point 1", "pain point 2", "pain point 3"],
    "goals": ["goal 1", "goal 2", "goal 3"]
  }}
}}

IMPORTANT: Return ONLY valid JSON. No markdown, no explanations, no additional text.
`);

    // Create output parser for JSON
    const parser = new JsonOutputParser<BrandExtensionOutput>();

    // Create the chain
    const chain = promptTemplate.pipe(model).pipe(parser);

    // Execute the chain
    const result = await chain.invoke({
      currentBrand,
      coreStrength,
      targetCategory,
    });

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        data: result,
        metadata: {
          brand: currentBrand,
          category: targetCategory,
          model: 'ibm/granite-4-h-small',
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in brand extension generation:', error);

    // Handle specific error types
    if (error.message?.includes('API key') || error.message?.includes('authentication')) {
      return NextResponse.json(
        {
          error: 'Configuration Error',
          details: 'IBM watsonx.ai API key is not configured or invalid. Please check WATSONX_API_KEY in environment variables.',
        },
        { status: 500 }
      );
    }

    if (error.message?.includes('project') || error.message?.includes('PROJECT_ID')) {
      return NextResponse.json(
        {
          error: 'Configuration Error',
          details: 'IBM watsonx.ai Project ID is not configured. Please set WATSONX_PROJECT_ID in environment variables.',
        },
        { status: 500 }
      );
    }

    if (error.message?.includes('JSON')) {
      return NextResponse.json(
        {
          error: 'Parsing Error',
          details: 'Failed to parse LLM response as JSON. Please try again.',
        },
        { status: 500 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    {
      error: 'Method Not Allowed',
      details: 'This endpoint only accepts POST requests',
    },
    { status: 405 }
  );
}
