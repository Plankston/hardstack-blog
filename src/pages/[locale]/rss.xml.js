import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

const SITE_TITLE = 'HardStack';
const SITE_DESCRIPTION = '每个开源项目都值得被认真装一遍 — 深度开源项目安装教程与踩坑记录';

export async function GET(context) {
  const posts = (await getCollection('blog'))
    .filter((p) => (p.data.postLang || 'en') === 'zh-CN')
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: `${SITE_TITLE} (中文)`,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/zh-CN/blog/${post.data.groupKey || post.id.replace(/-(en_US|zh_CN)$/, '')}/`,
    })),
  });
}

export async function getStaticPaths() {
  return [{ params: { locale: 'zh-CN' } }];
}
