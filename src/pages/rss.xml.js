import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

const SITE_TITLE = 'HardStack';
const SITE_DESCRIPTION = 'Every open-source project deserves a proper setup — deep dive installation guides, comparisons & real-world troubleshooting';

export async function GET(context) {
  const posts = await getCollection('blog');

  const enPosts = posts
    .filter((p) => (p.data.postLang || 'en') === 'en')
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: `${SITE_TITLE} (English)`,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: enPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.data.groupKey || post.id.replace(/-(en_US|zh_CN)$/, '')}/`,
    })),
  });
}
