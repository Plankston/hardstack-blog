import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

const SITE_TITLE = 'HardStack';
const SITE_DESCRIPTION = '覆盖 Jellyfin、n8n、Home Assistant、Ollama 等热门开源项目的深度安装教程、横向对比与真实踩坑记录';

export async function GET(context) {
  const posts = await getCollection('blog');

  const sortedPosts = posts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.data.groupKey || post.id.replace(/-(en_US|zh_CN)$/, '')}/`,
    })),
  });
}
