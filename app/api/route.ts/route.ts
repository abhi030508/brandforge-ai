import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { brandName } = body;

    if (!brandName) {
      return NextResponse.json(
        { error: 'Missing required fields', details: 'brandName is required' },
        { status: 400 }
      );
    }

    // Step 1: search Wikidata for an entity matching the brand name
    const searchUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(
      brandName
    )}&language=en&format=json&limit=3&origin=*`;

    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    const topResult = searchData?.search?.[0];

    if (!topResult?.id) {
      return NextResponse.json({ success: true, logoImageUrl: null, domain: null });
    }

    // Step 2: fetch ALL claims for that entity in one call, so we can check
    // both P154 (logo image) and P856 (official website)
    const entityUrl = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${topResult.id}&props=claims&format=json&origin=*`;
    const entityRes = await fetch(entityUrl);
    const entityData = await entityRes.json();
    const claims = entityData?.entities?.[topResult.id]?.claims;

    // P154 = "logo image" - a filename on Wikimedia Commons. This is the actual
    // real-world logo file, which is far more reliable than guessing a domain.
    const logoFilename = claims?.P154?.[0]?.mainsnak?.datavalue?.value;
    const logoImageUrl = logoFilename
      ? `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(logoFilename)}?width=800`
      : null;

    // P856 = "official website" - used as a fallback for a Hunter.io logo lookup
    // if Wikidata doesn't have a direct logo image for this entity.
    const websiteClaim = claims?.P856?.[0]?.mainsnak?.datavalue?.value;
    const domain = websiteClaim
      ? websiteClaim.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
      : null;

    return NextResponse.json({ success: true, logoImageUrl, domain });
  } catch (error: any) {
    console.error('Error resolving brand logo:', error);
    // Fail soft - the frontend will fall back to a guessed domain or gradient badge
    return NextResponse.json({ success: true, logoImageUrl: null, domain: null });
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method Not Allowed', details: 'This endpoint only accepts POST requests' },
    { status: 405 }
  );
}
