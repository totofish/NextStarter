const path = require('path');
// const glob = require('glob');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  distDir: '../.next',
  poweredByHeader: false,

  webpack: (config, { dev }) => {
    const newConfig = config;

    // Extract SCSS
    newConfig.module.rules.push({
      test: /\.(css|s[ac]ss)$/,
      loader: 'emit-file-loader',
      options: {
        name: 'dist/[path][name].[ext]'
      }
    });

    if (!dev) {
      newConfig.module.rules.push(
        {
          test: /\.(woff2?|ttf|eot|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                // name: 'public/[path][name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.(css|s[ac]ss)$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  url: true,
                  minimize: true,
                  importLoaders: 2,
                  sourceMap: false,
                  modules: false,
                  // localIdentName: false
                  //   ? '[name]-[local]-[hash:base64:5]'
                  //   : '[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: () => [autoprefixer()]
                }
              },
              {
                loader: 'resolve-url-loader',
                options: {
                  sourceMap: true
                  // attempts: 1,
                  // debug: true,
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        }
      );
      newConfig.plugins.push(new ExtractTextPlugin('public/static/styles/app.css'));
    } else {
      newConfig.module.rules.push({
        test: /\.(css|s[ac]ss)$/,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline',
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      });
    }

    // PWA - Service worker
    const oldEntry = newConfig.entry;

    newConfig.entry = () => (oldEntry().then((entry) => {
      entry['main.js'].push(path.resolve(__dirname, 'utility/offline'));
      return entry;
    }));

    if (!dev) {
      // Service Worker
      newConfig.plugins.push(new SWPrecacheWebpackPlugin({
        cacheId: 'next-ss',
        filename: 'public/sw.js',
        minify: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        staticFileGlobs: [
          'static/**/*' // Precache all static files by default
        ],
        runtimeCaching: [
          // Example with different handlers
          {
            handler: 'fastest',
            urlPattern: /[.](png|jpg|css)/
          },
          {
            handler: 'networkFirst',
            urlPattern: /^http.*/ // cache all files
          }
        ]
      }));
    }
    return newConfig;
  }
};
