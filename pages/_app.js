import { SEO } from '@/components/SEO'
import '@/css/tailwind.css'
import { Provider } from 'next-auth/client'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

export default function App({ Component, pageProps, router }) {
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ThemeProvider>{' '}
    </Provider>
  )
}
