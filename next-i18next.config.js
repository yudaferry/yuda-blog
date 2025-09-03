/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id'], // English and Indonesian
    localeDetection: true,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  ns: ['common', 'blog', 'profile'],
  defaultNS: 'common',
  serializeConfig: false,
}