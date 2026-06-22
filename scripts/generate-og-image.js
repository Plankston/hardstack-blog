import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// OG Image dimensions (1200x630 is standard for social media)
const WIDTH = 1200;
const HEIGHT = 630;

// Generate SVG template for OG Image
function generateSvgTemplate(title, description, category) {
  // Truncate text if too long
  const maxTitleLength = 60;
  const maxDescLength = 120;
  
  const truncatedTitle = title.length > maxTitleLength 
    ? title.substring(0, maxTitleLength) + '...' 
    : title;
  
  const truncatedDesc = description.length > maxDescLength 
    ? description.substring(0, maxDescLength) + '...' 
    : description;

  // Category color mapping
  const categoryColors = {
    'ai-tools': '#3B82F6',
    'guide': '#10B981',
    'review': '#F59E0B',
    'infrastructure': '#8B5CF6',
    'development': '#EC4899',
  };
  
  const categoryColor = categoryColors[category] || '#6B7280';

  return `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0F172A"/>
  
  <!-- Gradient overlay -->
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1E293B;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0F172A;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#gradient)"/>
  
  <!-- Decorative elements -->
  <circle cx="100" cy="100" r="200" fill="#3B82F6" opacity="0.1"/>
  <circle cx="1100" cy="530" r="150" fill="#8B5CF6" opacity="0.1"/>
  
  <!-- Category badge -->
  <rect x="60" y="60" width="${category.length * 12 + 40}" height="36" rx="18" fill="${categoryColor}"/>
  <text x="80" y="84" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="white">${category.toUpperCase()}</text>
  
  <!-- Title -->
  <text x="60" y="200" font-family="Inter, sans-serif" font-size="48" font-weight="700" fill="#F8FAFC">
    ${truncatedTitle.split('\n').map((line, i) => `
      <tspan x="60" dy="${i === 0 ? 0 : 60}">${line}</tspan>
    `).join('')}
  </text>
  
  <!-- Description -->
  <text x="60" y="320" font-family="Inter, sans-serif" font-size="24" fill="#94A3B8">
    ${truncatedDesc.split('\n').map((line, i) => `
      <tspan x="60" dy="${i === 0 ? 0 : 36}">${line}</tspan>
    `).join('')}
  </text>
  
  <!-- Bottom bar -->
  <rect x="0" y="${HEIGHT - 80}" width="${WIDTH}" height="80" fill="#1E293B"/>
  
  <!-- Site branding -->
  <text x="60" y="${HEIGHT - 36}" font-family="Inter, sans-serif" font-size="20" font-weight="600" fill="#F8FAFC">HardStack</text>
  <text x="${WIDTH - 60}" y="${HEIGHT - 36}" font-family="Inter, sans-serif" font-size="16" fill="#64748B" text-anchor="end">hardstack.org</text>
</svg>`;
}

// Generate OG Image from article data
async function generateOgImage(article) {
  const { title, description, category, slug } = article;
  
  const svg = generateSvgTemplate(title, description, category || 'blog');
  
  const outputPath = join(__dirname, '..', 'public', 'og', `${slug}.png`);
  
  // Ensure output directory exists
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    const fs = await import('fs');
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);
  
  console.log(`Generated OG Image: ${outputPath}`);
  return outputPath;
}

// Example usage
const exampleArticle = {
  title: "Uptime Kuma Self-Hosted Guide: Monitor Everything in 5 Minutes",
  description: "GitHub 88K+ Stars self-hosted monitoring dashboard with 90+ notification channels",
  category: "infrastructure",
  slug: "uptime-kuma-guide",
};

generateOgImage(exampleArticle)
  .then(() => console.log('Done!'))
  .catch(console.error);
