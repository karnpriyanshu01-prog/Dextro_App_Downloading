import { NextResponse } from 'next/server'

// Replace with the exact line(s) provided by your Google AdSense account.
// Never invent a publisher ID — an incorrect ads.txt can block monetization.
const ADSENSE_PUBLISHER_ID = process.env.ADSENSE_PUBLISHER_ID || ''

export async function GET() {
  const body = ADSENSE_PUBLISHER_ID
    ? `google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0`
    : '# Add your AdSense publisher ID via the ADSENSE_PUBLISHER_ID env var to populate this file.'

  return new NextResponse(body, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
