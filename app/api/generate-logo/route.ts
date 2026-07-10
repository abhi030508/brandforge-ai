import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { brandName, coreStrength, category, isExtension } = body;

    if (!brandName) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          details: 'brandName is required',
        },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: 'Configuration Error',
          details: 'GEMINI_API_KEY is not configured. Please set it in environment variables.',
        },
        { status: 500 }
      );
    }

    // Build a prompt tailored to whether this is the parent brand or the new extension
    const prompt = isExtension
      ? `A professional, modern logo design for a new product line called "${brandName}", ` +
        `a brand extension entering the ${category || 'consumer'} category. ` +
        `The brand's core strengths are: ${coreStrength || 'quality and trust'}. ` +
        `Minimalist flat vector logo, clean modern typography, simple icon or wordmark, ` +
        `centered on a plain white background, no mockups, no extra text, no watermark.`
      : `A professional, modern logo design for a brand called "${brandName}". ` +
        `The brand's core strengths are: ${coreStrength || 'quality and trust'}. ` +
        `Minimalist flat vector logo, clean modern typography, simple icon or wordmark, ` +
        `centered on a plain white background, no mockups, no extra text, no watermark.`;

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent',
      {
        method: 'POST',
        headers: {
          'x-goog-api-key': process.env.GEMINI_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const message = data?.error?.message || 'Failed to generate logo';
      return NextResponse.json(
        {
          error: 'Gemini API Error',
          details: message,
        },
        { status: response.status }
      );
    }

    // Find the image part in the response (Gemini returns text and/or image parts)
    const parts = data?.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((p: any) => p.inlineData);

    if (!imagePart) {
      return NextResponse.json(
        {
          error: 'Generation Error',
          details: 'No image data was returned from the Gemini image model.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        image: imagePart.inlineData.data, // base64 PNG, render as data:image/png;base64,<image>
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in logo generation:', error);

    if (error.message?.includes('API key') || error.message?.includes('authentication')) {
      return NextResponse.json(
        {
          error: 'Configuration Error',
          details: 'Gemini API key is not configured or invalid. Please check GEMINI_API_KEY in environment variables.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error.message || 'An unexpected error occurred while generating the logo',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      error: 'Method Not Allowed',
      details: 'This endpoint only accepts POST requests',
    },
    { status: 405 }
  );
}
