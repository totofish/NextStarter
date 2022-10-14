const path = require('path')
const localePath = path.resolve('./public/locales')

module.exports = {
  debug: process.env.NODE_ENV !== 'production',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-TW'],
  },
  localePath,
  reloadOnPrerender: process.env.NODE_ENV !== 'development',
  // serializeConfig: false,
}
