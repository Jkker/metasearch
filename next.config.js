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
        { source: '/proxy/google/:param*', destination: 'https://www.google.com/:param*' },
        { source: '/proxy/youtube/:param*', destination: 'https://www.youtube.com/:param*' },
        { source: '/proxy/github/:param*', destination: 'https://github.com/:param*' },
        { source: '/proxy/any/:param*', destination: 'https://:param*' },
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

      /:param* 	if (!dev && !isServer) {
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
