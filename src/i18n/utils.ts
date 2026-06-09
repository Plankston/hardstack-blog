import type { Locale } from './ui';
import { LOCALES } from './ui';

export function getLocaleFromParams(locale?: string): Locale {
  if (locale && locale in LOCALES) return locale as Locale;
  return 'en';
}

export function getSlug(post: { id: string; data: { groupKey?: string } }): string {
  return post.data.groupKey || post.id.replace(/-(en_US|zh_CN)$/, '');
}

export function getLocalizedUrl(path: string, locale: Locale): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return locale === 'en' ? `/en${cleanPath}` : `/${locale}${cleanPath}`;
}
