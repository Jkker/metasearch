import { SEO } from '@/components/SEO'
import '@/css/tailwind.css'
import { Provider } from 'next-auth/client'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
/* import { Router } from 'next/router'
Router.events.on('routeChangeComplete', (url) => {
  try {
    window._hmt.push(['_trackPageview', url])
  } catch (e) {}
}) */
export default function App({ Component, pageProps, router }) {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <script
            dangerouslySetInnerHTML={{
              __html: `var _hmt = _hmt || [];
					(function() {
						var hm = document.createElement("script");
						hm.src = "https://hm.baidu.com/hm.js?19c6c97c67dfab6941857d9604f545f2";
						var s = document.getElementsByTagName("script")[0];
						s.parentNode.insertBefore(hm, s);
					})();`,
            }}
          />
        </Head>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ThemeProvider>{' '}
    </Provider>
  )
}
