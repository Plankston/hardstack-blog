import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
  const posts = await getCollection('blog');
  const enPosts = posts.filter((p) => (p.data.postLang || 'en') === 'en');
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: enPosts.map((post) => ({
      ...post.data,
      link: `/en/blog/${post.id}/`,
    })),
  });
}
