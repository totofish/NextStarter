import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
// styles
import stylesheet from '../styles/index.scss';

export default class MyDocument extends Document {
  render() {
    const ieScript = `
      if(/MSIE \\d|Trident.*rv:/.test(navigator.userAgent)) {
        document.write('<script src="/static/scripts/es6-promise.min.js"><\\/script>');
        document.write('<script src="/static/scripts/es6-shim.min.js"><\\/script>');
      }
    `;
    const ie9 = `
      <!--[if lte IE 9]>
        <script src="/static/scripts/console-polyfill.js"></script>
        <script src="/static/scripts/es5-shim.min.js"></script>
        <script src="/static/scripts/es5-sham.min.js"></script>
        <script src="/static/scripts/fetch.js"></script>
        <script src="/static/scripts/xhr-polyfill.js"></script>
      <![endif]-->
    `;
    const appCSS = process.env.NODE_ENV === 'production'
      ? (
        <link
          type="text/css"
          rel="stylesheet"
          href={`/static/styles/app.css?${this.props.__NEXT_DATA__.buildStats['app.js'].hash}`} // eslint-disable-line no-underscore-dangle
        />
      ) : (
        <style
          global="true"
          dangerouslySetInnerHTML={{ __html: stylesheet }}
        />
      );

    return (
      <html lang="en">
        <Head>
          <base href="/" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />

          <meta name="theme-color" content="#673ab7" />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
          { appCSS }
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: ieScript }} />
        </Head>
        <body>
          <div dangerouslySetInnerHTML={{ __html: ie9 }} />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
