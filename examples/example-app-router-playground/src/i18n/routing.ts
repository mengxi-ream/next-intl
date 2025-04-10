import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'es', 'ja'],
  defaultLocale: 'en',
  localePrefix:
    process.env.NEXT_PUBLIC_USE_CASE === 'locale-prefix-never'
      ? 'never'
      : {
          mode: 'as-needed',
          prefixes: {
            es: '/spain'
          }
        },
  domains:
    process.env.NEXT_PUBLIC_USE_CASE === 'domains'
      ? [
          {
            domain: 'example.com',
            defaultLocale: 'en',
            locales: ['en', 'es', 'ja']
          },
          {
            domain: 'example.de',
            defaultLocale: 'de',
            locales: ['de']
          }
        ]
      : undefined,
  pathnames: {
    '/': '/',
    '/client': '/client',
    '/about': '/about',
    '/client/redirect': '/client/redirect',
    '/nested': {
      en: '/nested',
      de: '/verschachtelt',
      es: '/anidada',
      ja: '/ネスト'
    },
    '/redirect': '/redirect',
    '/news/[articleId]': {
      en: '/news/[articleId]',
      de: '/neuigkeiten/[articleId]',
      es: '/noticias/[articleId]',
      ja: '/ニュース/[articleId]'
    },
    '/news/just-in': {
      en: '/news/just-in',
      de: '/neuigkeiten/aktuell',
      es: '/noticias/justo-en',
      ja: '/ニュース/現在'
    }
  },
  localeCookie:
    process.env.NEXT_PUBLIC_USE_CASE === 'locale-cookie-false'
      ? false
      : {
          // 200 days
          maxAge: 200 * 24 * 60 * 60
        }
});
