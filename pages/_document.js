import Document, { Head, Html, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../lib/gtag';
class MyDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					{/* PWA Metadata */}
					<meta name='application-name' content='Metasearch' />
					<meta name='apple-mobile-web-app-capable' content='yes' />
					<meta name='apple-mobile-web-app-status-bar-style' content='default' />
					<meta name='apple-mobile-web-app-title' content='Metasearch' />
					<meta
						name='description'
						content='An intelligent search engine aggregator with high usability and customizability.'
					/>
					<meta name='format-detection' content='telephone=no' />
					<meta name='mobile-web-app-capable' content='yes' />
					<link rel='apple-touch-icon' sizes='180x180' href='/static/icons/apple-touch-icon.png' />
					<link rel='icon' type='image/png' sizes='32x32' href='/static/icons/favicon-32x32.png' />
					<link rel='icon' type='image/png' sizes='16x16' href='/static/icons/favicon-16x16.png' />
					<link rel='manifest' href='/static/manifest.json' />
					<link rel='mask-icon' href='/static/icons/safari-pinned-tab.svg' color='#5bbad5' />
					<link rel='shortcut icon' href='/static/icons/favicon.ico' />
					<meta name='msapplication-TileColor' content='#ffffff' />
					<meta name='msapplication-config' content='/static/icons/browserconfig.xml' />
					<meta name='theme-color' content='#ffffff' />
					{/* Global site tag (gtag.js) - Google Analytics */}
					<script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
					></script>
					<script
						dangerouslySetInnerHTML={{
							__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
						}}
					/>
					{/* Fonts */}
					<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
					<link
						href='https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700;800&display=swap'
						rel='stylesheet'
					/>
					<noscript>
						<link
							rel='stylesheet'
							href='https://fonts.googleapis.com/css2?family=Lexend&display=swap'
						/>
					</noscript>
				</Head>
				<body className='antialiased text-black bg-white dark:bg-gray-900 dark:text-white'>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
