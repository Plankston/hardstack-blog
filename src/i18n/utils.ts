export function getLocalePath(locale: string, path: string): string {
  if (locale === 'en') return path;
  return `/${locale}${path}`;
}

export function getSlug(post: { id: string; data: { groupKey?: string } }): string {
  return post.data.groupKey || post.id.replace(/-(en_US|zh_CN)$/, '');
}

export function categoryPillClass(cat: string | undefined): string {
  if (!cat) return 'category-pill-default';
  const c = cat.toLowerCase();
  if (c === 'ai-tools') return 'category-pill-ai-tools';
  if (c === 'guide') return 'category-pill-guide';
  if (c === 'review') return 'category-pill-review';
  return 'category-pill-default';
}

export function categoryLabel(cat: string | undefined, fallback = 'Uncategorized'): string {
  if (!cat) return fallback;
  return cat.toLowerCase().replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
