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

export function findRelatedPosts(
  current: { id: string; data: { groupKey?: string; tags?: string[]; category?: string; postLang?: string } },
  allPosts: Array<{ id: string; data: { groupKey?: string; tags?: string[]; category?: string; postLang?: string; title?: string; description?: string; pubDate?: Date; difficulty?: string; timeToRead?: number } }>,
  limit = 3,
) {
  const locale = current.data.postLang || 'en';
  const currentSlug = getSlug(current);
  const currentTags = new Set(current.data.tags || []);

  return allPosts
    .filter(p => (p.data.postLang || 'en') === locale && getSlug(p) !== currentSlug)
    .map(p => {
      let score = 0;
      if (p.data.category && p.data.category === current.data.category) score += 3;
      for (const t of (p.data.tags || [])) {
        if (currentTags.has(t)) score += 1;
      }
      return { post: p, score };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(x => ({
      slug: getSlug(x.post),
      title: x.post.data.title,
      description: x.post.data.description,
      category: x.post.data.category,
      difficulty: x.post.data.difficulty,
      timeToRead: x.post.data.timeToRead,
      date: x.post.data.pubDate,
    }));
}
