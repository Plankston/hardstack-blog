export const LOCALES = {
  en: 'EN',
  'zh-CN': '中文',
} as const;

export type Locale = keyof typeof LOCALES;

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  'zh-CN': '中文',
};

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    'site.title': 'HardStack',
    'site.description':
      'Every open-source project deserves a proper setup — deep dive installation guides, comparisons & real-world troubleshooting',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'blog.allPosts': 'All Posts',
    'blog.archive': 'Archive',
    'blog.postedOn': 'Posted',
    'blog.updatedOn': 'Updated',
    'blog.minRead': 'min read',
    'blog.readMore': 'Read more',
    'blog.category': '',
    'blog.difficulty': '',
    'footer.tagline': 'Every open-source project deserves a proper setup',
    'footer.colophon': 'Published with Astro',
    'about.title': 'About HardStack',
    'about.description':
      'A technical blog focused on open-source, self-hosted, and AI tools — with real installation logs.',
    'home.hero':
      'A deep dive into open-source projects — installations, comparisons, and real-world troubleshooting.',
    'site.lang': 'en',
  },
  'zh-CN': {
    'site.title': 'HardStack',
    'site.description': '每个开源项目都值得被认真装一遍 — 深度开源项目安装教程与踩坑记录',
    'nav.blog': '博客',
    'nav.about': '关于',
    'blog.allPosts': '全部文章',
    'blog.archive': '归档',
    'blog.postedOn': '发布于',
    'blog.updatedOn': '更新于',
    'blog.minRead': '分钟阅读',
    'blog.readMore': '阅读更多',
    'blog.category': '',
    'blog.difficulty': '',
    'footer.tagline': '每个开源项目都值得被认真装一遍',
    'footer.colophon': '使用 Astro 发布',
    'about.title': '关于 HardStack',
    'about.description': '一个专注开源、自托管与 AI 工具类项目的深度技术博客',
    'home.hero': '深度开源项目安装教程、横向对比与真实踩坑记录',
    'site.lang': 'zh-CN',
  },
};

export function useTranslations(locale: string) {
  const t = translations[locale as Locale] || translations.en;
  return (key: string): string => t[key] || key;
}
