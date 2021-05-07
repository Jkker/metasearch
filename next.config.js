const withPWA = require('next-pwa')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(
  withPWA({
    future: {
      webpack5: true,
    },
    i18n: {
      locales: ['en-US', 'zh-CN'],
      defaultLocale: 'en-US',
    },
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'development',
      register: true,
      scope: '/',
    },
    async rewrites() {
      return [
        { source: '/proxy/google/:slug*', destination: 'https://www.google.com/:slug*' },
        { source: '/proxy/youtube/:slug*', destination: 'https://www.youtube.com/:slug*' },
        { source: '/proxy/github/:slug*', destination: 'https://github.com/:slug*' },
        // { source: '/proxy/any/:slug*', destination: 'https://:slug*' },
      ]
    },
    webpack: (config, { dev, isServer }) => {
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|mp4)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next',
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
      })

      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })

      /:slug* 	if (!dev && !isServer) {
				// Replace React with Preact only in client production build
				Object.assign(config.resolve.alias, {
					react: 'preact/compat',
					'react-dom/test-utils': 'preact/test-utils',
					'react-dom': 'preact/compat',
				});
			} */
      return config
    },
  })
)
