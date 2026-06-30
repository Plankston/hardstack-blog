import sharp from 'sharp';
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
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

  // Escape special XML characters
  function escapeXml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  const escapedTitle = escapeXml(truncatedTitle);
  const escapedDesc = escapeXml(truncatedDesc);
  const escapedCategory = escapeXml(category);

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
  <rect x="60" y="60" width="${escapedCategory.length * 12 + 40}" height="36" rx="18" fill="${categoryColor}"/>
  <text x="80" y="84" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="white">${escapedCategory.toUpperCase()}</text>
  
  <!-- Title -->
  <text x="60" y="200" font-family="Inter, sans-serif" font-size="48" font-weight="700" fill="#F8FAFC">
    ${escapedTitle.split('\n').map((line, i) => `
      <tspan x="60" dy="${i === 0 ? 0 : 60}">${line}</tspan>
    `).join('')}
  </text>
  
  <!-- Description -->
  <text x="60" y="320" font-family="Inter, sans-serif" font-size="24" fill="#94A3B8">
    ${escapedDesc.split('\n').map((line, i) => `
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

// Parse MDX frontmatter (handles simple key: value pairs with quoted strings)
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const data = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    if (key) data[key] = value;
  }
  return data;
}

// Generate OG Image from article data
async function generateOgImage(article) {
  const { title, description, category, slug } = article;
  
  const svg = generateSvgTemplate(title, description, category || 'blog');
  
  const outputPath = join(__dirname, '..', 'public', 'og', `${slug}.png`);
  
  // Ensure output directory exists
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);
  
  console.log(`Generated OG Image: ${outputPath}`);
  return outputPath;
}

// Main function
async function main() {
  const blogDir = join(__dirname, '..', 'src', 'content', 'blog');
  
  if (!existsSync(blogDir)) {
    console.error('Blog directory not found:', blogDir);
    return;
  }
  
  const files = readdirSync(blogDir).filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
  
  console.log(`Found ${files.length} blog posts`);
  
  for (const file of files) {
    const filePath = join(blogDir, file);
    const content = readFileSync(filePath, 'utf-8');
    
    const frontmatter = parseFrontmatter(content);
    if (!frontmatter) {
      console.log(`Skipping ${file} - no frontmatter found`);
      continue;
    }
    
    const slug = basename(file, extname(file));
    const article = {
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || 'No description',
      category: frontmatter.category || 'blog',
      slug: slug,
    };
    
    try {
      await generateOgImage(article);
    } catch (error) {
      console.error(`Error generating OG image for ${file}:`, error);
    }
  }
  
  console.log('All OG images generated!');
}

// Run the script
main().catch(console.error);
