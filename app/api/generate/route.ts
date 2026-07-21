import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentBrand, coreStrength, targetCategory, customInstructions } = body;

    if (!currentBrand || !coreStrength || !targetCategory) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          details: 'currentBrand, coreStrength, and targetCategory are required',
        },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          error: 'Configuration Error',
          details: 'GROQ_API_KEY is not configured. Please set it in environment variables.',
        },
        { status: 500 }
      );
    }

    const systemPrompt = `You are an elite corporate marketing strategist with 20+ years of experience in brand extension and market positioning. Your expertise lies in creating data-driven, innovative brand strategies that resonate with target audiences.

Return ONLY valid JSON matching this exact structure, with no markdown formatting, no code fences, and no explanatory text before or after:
{
  "brandExtensionName": "A catchy, memorable name that connects to the parent brand",
  "swotAnalysis": {
    "strengths": ["strength 1", "strength 2", "strength 3"],
    "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
    "opportunities": ["opportunity 1", "opportunity 2", "opportunity 3"],
    "threats": ["threat 1", "threat 2", "threat 3"]
  },
  "aidaFramework": {
    "attention": "Strategy to grab attention (2-3 sentences)",
    "interest": "Strategy to build interest (2-3 sentences)",
    "desire": "Strategy to create desire (2-3 sentences)",
    "action": "Strategy to drive action (2-3 sentences)"
  },
  "targetPersona": {
    "demographics": "Age, gender, income, location, education",
    "psychographics": "Lifestyle, values, interests, attitudes",
    "painPoints": ["pain point 1", "pain point 2", "pain point 3"],
    "goals": ["goal 1", "goal 2", "goal 3"]
  }
}`;

    const userPrompt = `Develop a comprehensive brand extension strategy for:

Current Brand: ${currentBrand}
Core Strengths: ${coreStrength}
Target Category: ${targetCategory}
Additional Instructions From User (if any, incorporate these into the strategy - if empty, ignore): ${customInstructions?.trim() || 'None provided'}

Analyze the brand's core strengths and how they translate to the new category, create a compelling brand extension name that maintains brand equity, conduct a thorough SWOT analysis specific to this extension, develop an AIDA framework for market entry, and define the target persona with precision. If additional instructions were provided, make sure the strategy specifically reflects them.`;

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
    });

    const groqData = await groqResponse.json();

    if (!groqResponse.ok) {
      const message = groqData?.error?.message || 'Failed to generate strategy';
      return NextResponse.json(
        { error: 'Groq API Error', details: message },
        { status: groqResponse.status }
      );
    }

    const rawContent = groqData?.choices?.[0]?.message?.content;

    if (!rawContent) {
      return NextResponse.json(
        { error: 'Generation Error', details: 'No content was returned from the model.' },
        { status: 500 }
      );
    }

    let result;
    try {
      result = JSON.parse(rawContent);
    } catch {
      return NextResponse.json(
        {
          error: 'Parsing Error',
          details: 'Failed to parse LLM response as JSON. Please try again.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: result,
        metadata: {
          brand: currentBrand,
          category: targetCategory,
          model: 'llama-3.3-70b-versatile',
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in brand extension generation:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method Not Allowed', details: 'This endpoint only accepts POST requests' },
    { status: 405 }
  );
}
