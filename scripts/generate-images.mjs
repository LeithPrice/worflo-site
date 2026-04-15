import sharp from 'sharp';
import { readFileSync } from 'fs';

const faviconSvg = readFileSync('public/favicon.svg');
const ogSvg      = readFileSync('public/og-image.svg');

await sharp(faviconSvg).resize(32, 32).png().toFile('public/favicon.png');
console.log('✓ favicon.png');

await sharp(ogSvg).resize(1200, 630).png().toFile('public/og-image.png');
console.log('✓ og-image.png');
