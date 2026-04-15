import sharp from 'sharp';

const bolt = 'public/bolt.png';

// favicon.png — bolt on blue rounded square background, 32x32
await sharp({
  create: { width: 32, height: 32, channels: 4, background: { r: 0, g: 98, b: 204, alpha: 1 } }
})
  .composite([{
    input: await sharp(bolt).resize(20, 20, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer(),
    gravity: 'centre'
  }])
  .png()
  .toFile('public/favicon.png');
console.log('✓ favicon.png');

// og-image.png — 1200x630 branded card
const boltResized = await sharp(bolt)
  .resize(80, 80, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp({
  create: { width: 1200, height: 630, channels: 4, background: { r: 10, g: 22, b: 40, alpha: 1 } }
})
  .composite([
    // Blue glow ellipse (SVG)
    {
      input: Buffer.from(`<svg width="760" height="440"><ellipse cx="380" cy="220" rx="380" ry="220" fill="#0062cc" fill-opacity="0.18"/></svg>`),
      left: 220, top: 95
    },
    // Blue icon background square
    {
      input: Buffer.from(`<svg width="80" height="80"><rect width="80" height="80" rx="16" fill="#0062cc"/></svg>`),
      left: 76, top: 220
    },
    // Bolt icon
    { input: boltResized, left: 76, top: 220 },
    // Text: Worflo
    {
      input: Buffer.from(`<svg width="400" height="60"><text x="0" y="50" font-family="Arial,sans-serif" font-size="52" font-weight="700" fill="white">Worflo</text></svg>`),
      left: 172, top: 228
    },
    // Tagline
    {
      input: Buffer.from(`<svg width="1050" height="40"><text x="0" y="30" font-family="Arial,sans-serif" font-size="26" fill="#93c5fd">Debug, version-control, and monitor your HubSpot workflows.</text></svg>`),
      left: 76, top: 322
    },
    // URL
    {
      input: Buffer.from(`<svg width="200" height="30"><text x="0" y="22" font-family="Arial,sans-serif" font-size="20" fill="#4b7ab8">worflo.io</text></svg>`),
      left: 76, top: 550
    }
  ])
  .png()
  .toFile('public/og-image.png');
console.log('✓ og-image.png');
