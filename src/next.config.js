const path = require('path');
const glob = require('glob');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	distDir: '../.next',

	webpack: (config, { dev }) => {

		// Extract SCSS
		config.module.rules.push({
      test: /\.(css|s[ac]ss)$/,
      loader: 'emit-file-loader',
      options: {
        name: 'dist/[path][name].[ext]'
      }
		});

		if (!dev) {
      config.module.rules.push({
				test: /\.(woff2?|ttf|eot|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							// name: 'public/[path][name].[ext]'
						},
					},
				],
			}, {
        test: /\.(css|s[ac]ss)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: false,
                url: true,
                sourceMap: false,
                minimize: true,
                localIdentName: false
                  ? '[name]-[local]-[hash:base64:5]'
                  : '[hash:base64:5]'
              }
            }, {
							loader: 'postcss-loader',
							options: {
								sourceMap: true,
								plugins: () => [
									autoprefixer(),
								],
							},
						}, {
							loader: 'resolve-url-loader',
							options: {
								sourceMap: true,
								// root: path.resolve(__dirname, 'node_modules'),
								// attempts: 1,
								// debug: true,
							},
						}, {
							loader: 'sass-loader',
							options: {
								sourceMap: true,
								includePaths: [
									// path.resolve(__dirname, 'src'),
									// path.resolve(__dirname, 'node_modules'),
								],
							},
						}
          ]
        })
      });
      config.plugins.push(new ExtractTextPlugin('public/static/styles/app.css'));
    } else {
      config.module.rules.push({
				test: /\.(css|s[ac]ss)$/,
				use: [
					{
						loader: 'raw-loader'
					}, {
						loader: 'postcss-loader',
						options: {
							sourceMap: 'inline',
							plugins: () => [
								autoprefixer(),
							],
						},
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							includePaths: [
								// path.resolve(__dirname, 'src'),
								// path.resolve(__dirname, 'node_modules'),
							],
						},
					},
				],
			});
    }
		
		
		// PWA - Service worker
		const oldEntry = config.entry;

		config.entry = () =>
		oldEntry().then(entry => {
			entry['main.js'].push(path.resolve(__dirname, 'utility/offline'));
			return entry;
		});

		if (!dev) {
			// Service Worker
			config.plugins.push(
				new SWPrecacheWebpackPlugin({
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
							urlPattern: /^http.*/ //cache all files
						}
					]
				})
			);
		}
		return config;
	}
};
