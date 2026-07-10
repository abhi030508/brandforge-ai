import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'BrandForge AI API is running',
    timestamp: new Date().toISOString(),
  });
}

// Made with Bob
