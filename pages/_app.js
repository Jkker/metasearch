import { SEO } from '@/components/SEO';
import '@/css/tailwind.css';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';

export default function App({ Component, pageProps, router }) {
	return (
		<ThemeProvider attribute='class' enableSystem={true} defaultTheme='system'>
			<Head>
				<meta content='width=device-width, initial-scale=1' name='viewport' />
			</Head>
			<DefaultSeo {...SEO} />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
