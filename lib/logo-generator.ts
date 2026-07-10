// Generates a stylized wordmark/icon logo entirely offline as an SVG data URI.
// No API calls, no keys, no quotas, no billing - runs instantly, unlimited use.

const GRADIENT_PALETTES: [string, string][] = [
  ['#6366F1', '#A855F7'], // indigo -> purple (matches app theme)
  ['#3B82F6', '#06B6D4'], // blue -> cyan
  ['#F59E0B', '#EF4444'], // amber -> red
  ['#10B981', '#3B82F6'], // emerald -> blue
  ['#EC4899', '#8B5CF6'], // pink -> violet
  ['#F97316', '#EC4899'], // orange -> pink
  ['#14B8A6', '#6366F1'], // teal -> indigo
  ['#EAB308', '#F97316'], // yellow -> orange
];

/** Simple deterministic hash so the same brand name always gets the same look. */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/** Extract up to 2 initials from a brand/extension name. */
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function generateLogoDataUri(name: string): string {
  const hash = hashString(name);
  const [colorA, colorB] = GRADIENT_PALETTES[hash % GRADIENT_PALETTES.length];
  const initials = getInitials(name);
  const gradientId = `grad-${hash}`;

  const svg = `
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colorA}" />
      <stop offset="100%" stop-color="${colorB}" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="48" fill="${gradientId === '' ? '#fff' : `url(#${gradientId})`}" />
  <circle cx="200" cy="160" r="90" fill="rgba(255,255,255,0.15)" />
  <text x="200" y="192" font-family="Arial, Helvetica, sans-serif" font-size="90" font-weight="700"
        fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${initials}</text>
  <text x="200" y="330" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="600"
        fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${escapeXml(truncate(name, 18))}</text>
</svg>`.trim();

  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');

  return `data:image/svg+xml,${encoded}`;
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Builds a URL for a real AI-generated logo via Pollinations.ai (Flux model).
 * Free, no API key, no billing, no signup - just an image URL.
 * Note: quality/reliability isn't guaranteed like a paid provider, so pair
 * this with a fallback (e.g. generateLogoDataUri) in case it fails to load.
 */
export function generateAiLogoUrl(
  brandName: string,
  coreStrength: string,
  category: string,
  isExtension: boolean
): string {
  // Deliberately do NOT include the brand name as text-to-render in the prompt -
  // image models render text unreliably/garbled, so we only describe the visual
  // concept (industry + strengths) and let the caption above the image carry the name.
  //
  // The category is the strongest, most concrete visual anchor we have (e.g.
  // "energy drink", "paint", "pharma"), so it comes first and drives the actual
  // subject matter of the icon. Core strengths shape the style/mood on top of that.
  const subject = isExtension && category
    ? category
    : coreStrength || 'a modern consumer brand';

  const mood = coreStrength || 'quality, trust and innovation';

  const prompt =
    `professional corporate logo icon for the ${subject} industry, ` +
    `visually conveying ${mood}. ` +
    `Flat vector design, simple bold geometric shapes, clean two-tone color palette, ` +
    `single recognizable icon/emblem (not a scene, not a photo, not a mascot crowd), ` +
    `no text, no letters, no words, no writing, no typography, no labels, no watermark, ` +
    `centered on a plain white background, award-winning modern branding style.`;

  const encodedPrompt = encodeURIComponent(prompt);
  // width/height keep it square; nologo removes the watermark;
  // enhance lets Pollinations improve/steer the prompt for better relevance
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true&model=flux&enhance=true`;
}

/**
 * Builds a URL to fetch the REAL logo of an existing brand via Hunter.io's
 * free logo API (free forever, no API key, no signup - just a domain).
 * If no website is provided, makes a best-effort guess at the domain
 * (brandname.com) - this won't always be correct for real companies,
 * so pair this with a fallback for when the guess misses.
 */
export function generateRealLogoUrl(brandName: string, website?: string): string {
  const domain = website?.trim()
    ? website.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    : `${brandName.trim().toLowerCase().replace(/\s+/g, '')}.com`;

  return `https://logos.hunter.io/${domain}`;
}
