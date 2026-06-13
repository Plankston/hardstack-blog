import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../consts';
import { LOCALES } from '../../i18n/ui';

export async function GET(context) {
  const { locale } = context.params;
  const lang = locale === 'zh-CN' ? 'zh-CN' : 'en';

  const posts = (await getCollection('blog'))
    .filter((p) => (p.data.postLang || 'en') === lang)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const title = lang === 'zh-CN' ? `${SITE_TITLE} (中文)` : `${SITE_TITLE} (English)`;

  return rss({
    title,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/${lang}/blog/${post.data.groupKey || post.id.replace(/-(en_US|zh_CN)$/, '')}/`,
    })),
  });
}

export async function getStaticPaths() {
  return Object.keys(LOCALES).map((locale) => ({ params: { locale } }));
}
