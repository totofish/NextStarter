import React from 'react'
import Document, {
  DocumentContext, Html, Head, Main, NextScript,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import i18nextConfig from '../../next-i18next.config'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () => originalRenderPage({
        // eslint-disable-next-line react/jsx-props-no-spreading
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    // eslint-disable-next-line no-underscore-dangle
    const currentLocale = this.props.__NEXT_DATA__.locale || i18nextConfig.i18n.defaultLocale

    return (
      <Html lang={currentLocale}>
        <Head>
          <link href={`https://fonts.googleapis.com/css?family=Noto+Serif+TC:700&display=swap&text=${process.env.notoSerifTC || ''}`} rel="stylesheet" />
          <link href={`https://fonts.googleapis.com/css?family=Noto+Sans+TC:400&display=optional&text=${process.env.notoSansTC || ''}`} rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
