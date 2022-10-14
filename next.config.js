const { i18n } = require('./next-i18next.config')
const fs = require('fs')
const glob = require('glob')
const uniq = require('lodash/uniq')

// Find text content for optimizing font requests
const getFontText = () => {
  const allZhTwJson = glob.sync(`./public/locales/zh-TW/**/*.json`, { nodir: true })
  const getValues = (obj) => (
    Object.keys(obj).reduce((result, key) => {
      if (typeof obj[key] === 'string') {
        if (key === 'title') result.title += obj[key]
        else result.text += obj[key]
      } else {
        const { title, text } = getValues(obj[key])
        result.title += title
        result.text += text
      }
      return result
    }, { title: '', text: '' })
  )
  const { title, text } = allZhTwJson.reduce((result, filePath) => {
    const rawdata = fs.readFileSync(filePath)
    const json = JSON.parse(rawdata)
    const { title, text } = getValues(json)
    result.title += title
    result.text += text
    return result
  }, { title: '', text: '' })
  const uniqueString = str => uniq(str.split('')).join('')
  return {
    notoSerifTC: uniqueString(title),
    notoSansTC: uniqueString(`中文${text}`),
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  env : {
    ...getFontText()
  },
}

module.exports = nextConfig
