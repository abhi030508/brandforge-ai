import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { brandName, coreStrength, category } = body;

    if (!brandName) {
      return NextResponse.json(
        { error: 'Missing required fields', details: 'brandName is required' },
        { status: 400 }
      );
    }

    if (!process.env.ZENMUX_API_KEY) {
      return NextResponse.json(
        {
          error: 'Configuration Error',
          details: 'ZENMUX_API_KEY is not configured. Please set it in environment variables.',
        },
        { status: 500 }
      );
    }

    // Deliberately don't ask the model to render the brand name as text -
    // image models render text unreliably, so we describe the visual concept only.
    const subject = category || coreStrength || 'a modern consumer brand';
    const mood = coreStrength || 'quality, trust and innovation';

    const prompt =
      `professional corporate logo icon for the ${subject} industry, ` +
      `visually conveying ${mood}. ` +
      `Flat vector design, simple bold geometric shapes, clean two-tone color palette, ` +
      `single recognizable icon/emblem, no text, no letters, no words, no watermark, ` +
      `centered on a plain white background, modern professional branding style.`;

    const response = await fetch('https://zenmux.ai/api/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.ZENMUX_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-image-1',
        prompt,
        size: '1024x1024',
        quality: 'medium',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data?.error?.message || 'Failed to generate logo';
      return NextResponse.json(
        { error: 'ZenMux API Error', details: message },
        { status: response.status }
      );
    }

    const imageBase64 = data?.data?.[0]?.b64_json;

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'Generation Error', details: 'No image data was returned.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, image: imageBase64 }, { status: 200 });
  } catch (error: any) {
    console.error('Error in logo generation:', error);
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
    { error: 'Method Not Allowed', details: 'This endpoint only accepts POST requests' },
    { status: 405 }
  );
}
