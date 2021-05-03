import { PageSeo } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'
import { placeholderText } from 'data/i18n'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

export async function getStaticProps(context) {
  const locale = context.locale ?? context.defaultLocale
  const placeholder = placeholderText(locale)
  return {
    props: {
      DEBUG: process.env.NODE_ENV === 'development',
      placeholder,
    },
  }
}

export default function Home(props) {
  const [searchKey, setSearchKey] = useState('')
  const router = useRouter()
  const searchBarRef = useRef()
  const handleSearch = () => {
    router.push({
      pathname: 'search',
      query: {
        q: searchKey,
      },
    })
  }
  // Keyboard shortcuts
  useEffect(() => {
    function onKeyDown(e) {
      // console.log(e.key);
      const key = e.key
      switch (key) {
        // Focus search bar on /
        case '/': {
          if (document.activeElement !== searchBarRef.current) {
            console.log('focus')
            e.preventDefault()
            searchBarRef?.current?.focus?.()
          }

          break
        }
        // Unfocus search bar on escape
        case 'Escape': {
          console.log('blur')
          e.preventDefault()
          searchBarRef?.current?.blur?.()
          break
        }
        default:
          break
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])
  return (
    <>
      <Head>
        <title>Metasearch</title>
      </Head>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <Header override={'bg-transparent text-white'} />
      <Footer />
      <div className="index-container h-screen relative z-30  bg-gray-700 bg-cover bg-no-repeat bg-center image shadow-2xl">
        <div className="meta-search-index-page bg-transparent w-full h-full flex-center flex-col">
          <Image
            className="logo-center ml-2 mb-2 sm:mb-4 opacity-90"
            src="/static/images/index-logo.png"
            height={264 / 2}
            width={1004 / 2}
            alt="Metasearch Logo"
          ></Image>
          <div className="meta-search-bar w-4/5 sm:max-w-lg relative ">
            <input
              aria-label="Metasearch"
              placeholder={props.placeholder}
              type="text"
              ref={searchBarRef}
              onChange={(e) => setSearchKey(e.target.value)}
              className="w-full text-gray-100 sm:shadow focus:shadow-md sm:focus:shadow-xl bg-gray-100 dark:bg-gray-800 acrylic bg-opacity-40 dark:bg-opacity-50 rounded placeholder-gray-200 dark:placeholder-gray-400 h-10 p-3 text-base mb-4 sm:mb-1 bg-transparent outline-none focus:outline-none border-none focus:border-transparent ring-0 focus:ring-0"
              value={searchKey}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
            />
            <button
              onClick={() => handleSearch()}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
            >
              <svg
                className="absolute w-5 h-5 text-gray-100 right-3 top-2.5 text-opacity-70"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <button
          className="absolute z-20 bottom-0 bg-transparent w-full outline-none"
          onClick={() => window.scroll(0, window.innerHeight)}
        >
          <i className="fas fa-angle-down fa-2x text-white pb-2 animate-bounce"></i>
        </button>
      </div>
    </>
  )
}
