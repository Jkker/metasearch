// import { frames, links } from '@/data/config-v1.js';
import { LinkOutlined, SettingFilled } from "@ant-design/icons"
import { Button, Dropdown, Menu, Tabs } from "antd"
import mobile from "ismobilejs"
import parseConfig from "lib/parseConfig.js"
import getConfig from '@/lib/getConfig'
import { debounce } from "lodash"
import { useTheme } from "next-themes"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useCallback, useEffect, useRef, useState } from "react"
import useSWR from "swr"
import ThemeSwitch from "../components/ThemeSwitch"
const querystring = require("querystring")

export async function getStaticProps(context) {
  const username =context.locale
  const config = await getConfig(username)
  return {
    props: {
      config,
      DEBUG: process.env.NODE_ENV === 'development',
      username,
    },
  }
}

const fetcher = (url) => fetch(url).then((r) => r.json())

const processUrl = (url, key) => url.replace(/%s/g, encodeURIComponent(key))

function ClientOnly({ children, hasMounted }) {
  if (!hasMounted) {
    return null
  } else {
    return children
  }
}

export default function Search(props) {
  const DEBUG = props.DEBUG
  const isMobile = mobile().any
  const platform = isMobile ? "mobile" : "desktop"
  console.log("platform:", platform)

  const [config, setConfig] = useState(props.config)
  const { links, frames } = parseConfig(config, platform)

  const [hasMounted, setHasMounted] = React.useState(false)

  const { data: geoData, error: geoError } = useSWR("/api/geoip/country", fetcher)

  const { resolvedTheme } = useTheme()

  // * Search Functionality
  const router = useRouter()
  const defaultEngine = frames[0].title

  const engine = useRef(router.query?.engine ?? defaultEngine)
  const searchKey = useRef(router.query?.q ?? "")
  const [inputKey, setInputKey] = useState(router.query?.q ?? "")
  const [refresher, setRefresher] = useState(0)

  // Respond to route change events (back / forward button click)
  useEffect(() => {
    setHasMounted(true)
    const handleRouteChange = (url, { shallow }) => {
      const query = querystring.parse(url.split("?").slice(1).join())
      const newEng = query.engine ?? defaultEngine
      const newSearchKey = query.q ?? ""
      if (engine.current !== newEng) {
        engine.current = newEng
        if (DEBUG) {
          console.log("Engine:", newEng)
        }
      }
      if (newSearchKey !== searchKey.current) {
        if (DEBUG) {
          console.log("Search:", newSearchKey)
        }
        searchKey.current = newSearchKey
        setInputKey(newSearchKey)
      }
    }
    router.events.on("routeChangeStart", handleRouteChange)
    return () => {
      router.events.off("routeChangeStart", handleRouteChange)
    }
  }, [])

  // Change default engine based on geo-ip data
  /* 	useEffect(() => {
		const clientInCN = geoData?.country === 'CN' ? false : true;
		const defaultEngine = clientInCN
			? frames('', clientInCN)[0].title
			: frames('', clientInCN)[1].title;
		if (props.default.engine === 'default' && engine.current !== defaultEngine) {
			if (DEBUG)
				console.log('GEO API responded: change engine from', engine.current, 'to', defaultEngine);
			handleSetEngine(defaultEngine);
		}
	}, [geoData]); */

  const handleSetSearch = (newSearchKey) => {
    const trimmedKey = newSearchKey.trim()

    if (trimmedKey === searchKey.current) {
      if (DEBUG) {
        console.log("Refresh Iframe")
      }
      setRefresher(refresher + 1)
      return
    } else {
      if (DEBUG) {
        console.log("Search:", newSearchKey)
      }
      searchKey.current = newSearchKey
      router.push(
        { pathname: router.pathname, query: { q: newSearchKey, engine: engine.current } },
        undefined,
        {
          shallow: true,
        }
      )
    }
  }
  const debounceSetSearch = useCallback(debounce(handleSetSearch, 1000), [engine.current])

  const handleInputChange = (e) => {
    setInputKey(e.target.value)
    debounceSetSearch(e.target.value)
  }

  const handleSetEngine = (newEng) => {
    if (newEng === engine.current) {
      if (DEBUG) {
        console.log("Refresh Iframe")
      }
      setRefresher(refresher + 1)
      return
    } else {
      if (DEBUG) {
        console.log("Engine:", newEng, "; inputKey:", inputKey)
        console.log("Engine:", newEng, "; searchKey:", searchKey.current)
      }
      engine.current = newEng
      router.push(
        { pathname: router.pathname, query: { q: searchKey.current, engine: newEng } },
        undefined,
        {
          shallow: true,
        }
      )
    }
  }

  // When logo or clear button is clicked
  const handleReset = () => {
    setInputKey("")
    searchKey.current = ""
    router.push(
      { pathname: router.pathname, query: { q: "", engine: engine.current } },
      undefined,
      {
        shallow: true,
      }
    )
  }

  // DEBUGGING: render count
  const renderCount = useRef(0)
  useEffect(() => {
    renderCount.current++
    if (props.DEBUG) console.log("renderCount", renderCount.current)
  })

  // Auto focus search bar after refresh on desktop
  const landingSearchBarRef = useRef(null)

  useEffect(() => {
    if (!searchKey.current && !inputKey && !isMobile) {
      landingSearchBarRef?.current?.focus?.()
    }
  }, [searchKey.current])

  const menu = isMobile ? (
    <Menu>
      {links.map(({ url, title }) => (
        <Menu.Item key={title}>
          <a
            title={title}
            key={title}
            href={processUrl(url, searchKey.current)}
            target="_blank"
            rel="noreferrer"
            className="links"
          >
            {title}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  ) : null

  const enginesList = frames.map(({ title }) => title)
  const linksList = links.map(({ title }) => title)
  const currLinkIdx = useRef(0)
  const [modalVisible, setModalVisible] = useState(false)

  // Keyboard shortcuts
  useEffect(() => {
    function onKeyDown(e) {
      // console.log(e.key);
      const key = e.key
      switch (key) {
        // Search / refresh on enter
        case "Enter": {
          if (!modalVisible) handleSetSearch(inputKey)
          break
        }
        // Focus search bar on /
        case "/": {
          if (document.activeElement !== landingSearchBarRef.current && !modalVisible) {
            e.preventDefault()
            landingSearchBarRef?.current?.focus?.()
          }
          break
        }
        // Unfocus search bar on escape
        case "Escape": {
          e.preventDefault()
          landingSearchBarRef?.current?.blur?.()
          break
        }
        case "ArrowRight": {
          if (document.activeElement !== landingSearchBarRef.current && !modalVisible) {
            if (e.ctrlKey && e.shiftKey) {
              break
            } else if (e.ctrlKey) {
              // Switch to the next tab on ctrl + right arrow
              e.preventDefault()
              const currEngIdx = enginesList.indexOf(engine.current)
              handleSetEngine(enginesList[currEngIdx + 1] ?? enginesList[0])
            } else if (e.shiftKey) {
              // Switch to the next link on ctrl + right arrow
              e.preventDefault()
              document.getElementById(linksList[currLinkIdx.current] + "-link")?.blur()
              const nextIdx =
                currLinkIdx.current + 1 >= linksList.length ? 0 : currLinkIdx.current + 1
              currLinkIdx.current = nextIdx
              document.getElementById(linksList[nextIdx] + "-link")?.focus()
            }
          }
          break
        }
        case "ArrowLeft": {
          if (document.activeElement !== landingSearchBarRef.current && !modalVisible) {
            if (e.ctrlKey && e.altKey) {
              break
            } else if (e.ctrlKey) {
              // Switch to the previous tab on ctrl + left arrow
              e.preventDefault()
              const currEngIdx = enginesList.indexOf(engine.current)
              handleSetEngine(enginesList[currEngIdx - 1] ?? enginesList[enginesList.length - 1])
            } else if (e.shiftKey) {
              // Switch to the previous link on shift + left arrow
              e.preventDefault()
              document.getElementById(linksList[currLinkIdx.current] + "-link")?.blur()
              const nextIdx =
                currLinkIdx.current - 1 < 0 ? linksList.length - 1 : currLinkIdx.current - 1
              currLinkIdx.current = nextIdx
              document.getElementById(linksList[nextIdx] + "-link")?.focus()
            }
          }
          break
        }
        // Auto focus on the 1st link
        case "Shift": {
          if (document.activeElement !== landingSearchBarRef.current && !modalVisible) {
            e.preventDefault()
            // currLinkIdx.current = 0;
            document.getElementById(linksList[currLinkIdx.current] + "-link")?.focus()
          }
        }
        default:
          break
      }
    }
    // Open the currently focused link when shift key is released
    function onKeyUp(e) {
      // console.log('Released: ', e.key);
      if (
        e.key === "Shift" &&
        document.activeElement !== landingSearchBarRef.current &&
        !modalVisible
      ) {
        console.log("modalVisible:", modalVisible)
        e.preventDefault()
        const currLink = document.getElementById(linksList[currLinkIdx.current] + "-link")
        currLink.click()
        currLink.blur()
        // currLinkIdx.current = false;
      }
    }
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("keyup", onKeyUp)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("keyup", onKeyUp)
    }
  }, [modalVisible])

  return (
    <div className="app-container flex flex-col h-screen w-screen">
      {/* Custom HTML head */}
      <Head>
        <title>
          {searchKey.current ? `${searchKey.current} - ${engine.current}` : 'Metasearch'}
        </title>
      </Head>
      {/* Body */}
      <div className="h-8 flex w-screen mt-2 justify-between items-center flex-nowrap text-center flex-none head-container bg-white dark:bg-gray-900 z-10">
        {/* Logo */}
        <Link href="/">
          <a className="z-20 my-1 mx-2 h-8 flex-none flex justify-center items-center">
            <Image
              src="/static/images/search-logo.png"
              alt="logo"
              layout="fixed"
              height={28}
              width={28}
            ></Image>
          </a>
        </Link>
        {/* Search Bar */}
        <div className="meta-search-bar flex-auto focus:shadow-md hover:shadow focus-within:shadow-md flex flex-nowrap">
          <div className="relative flex-auto">
            <input
              aria-label="Metasearch"
              placeholder="搜你所想"
              type="text"
              ref={landingSearchBarRef}
              onChange={handleInputChange}
              className="flex-auto ring-opacity-50 w-full h-8 rounded-sm text-black dark:text-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-r-none bg-gray-100 p-3 pr-8 text-base outline-none focus:outline-none border-none focus:border-transparent ring-0 focus:ring-0"
              value={inputKey}
            />
            {/* Search Bar Actions */}
            <div className="absolute text-gray-800 dark:text-gray-100 right-3 top-0 text-opacity-70 flex items-center justify-evenly space-x-4 h-full">
              <button className="reset button" onClick={handleReset}>
                <svg
                  className="w-3 h-3 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="times-circle"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <button
            id="search"
            className="rounded-sm rounded-l-none h-8 w-9 flex justify-center items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 z-20"
            onClick={() => handleSetSearch(inputKey)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSetSearch(inputKey)
              }
            }}
          >
            <svg
              className="w-5 h-5 text-gray-900 dark:text-gray-100 text-opacity-70"
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
        <div className="h-full mx-2 border-l dark:border-gray-600"></div>
        {/* Links Container */}
        <div className="flex-0">
          {/* Mobile Links */}
          <Dropdown overlay={menu} trigger={['click', 'hover']} className="md:hidden">
            <button
              className="rounded-sm responsive-element h-8 p-2 flex flex-nowrap whitespace-nowrap justify-evenly items-center focus:outline-none "
              onClick={(e) => e.preventDefault()}
            >
              Links <LinkOutlined className="ml-1" />
            </button>
          </Dropdown>
          {/* Desktop Links */}
          <div className="hidden md:block">
            <div className="flex flex-nowrap space-x-1 xl:space-x-2 h-full justify-evenly">
              {links.map(({ url, title }) => (
                <a
                  title={title}
                  key={title}
                  id={title + '-link'}
                  href={processUrl(url, searchKey.current)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-sm responsive-element h-8 p-1 lg:p-2 flex flex-nowrap whitespace-nowrap justify-evenly items-center"
                >
                  {title} <LinkOutlined className="ml-1" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="h-full ml-2 border-l dark:border-gray-600"></div>
        <div className="flex-0 mr-1">
          <ThemeSwitch />
        </div>
      </div>
      <div className="search-body-container flex-1 flex items-stretch">
        <Tabs
          className="dark:text-white dark:bg-gray-900"
          type="card"
          activeKey={engine.current}
          onTabClick={handleSetEngine}
          tabBarExtraContent={
            <Button
              type="primary"
              icon={<SettingFilled />}
              onClick={(e) => setModalVisible(true)}
              href={`/config/${props.username}`}
              className="rounded-sm flex flex-nowrap whitespace-nowrap justify-evenly items-center"
            >
              Config
            </Button>
          }
        >
          {frames.map(({ title, url }) => (
            <Tabs.TabPane key={title} tab={title} className="tabpane">
              {DEBUG ? (
                <ul className="ml-24 h-full flex flex-col justify-center leading-loose list-disc dark:text-white">
                  <li>Search Key: {searchKey.current}</li>
                  <li>Engine: {engine.current}</li>
                  {/* <li>Country: {geoData?.country}</li> <li>IP: {geoData?.ip}</li> */}
                  <li>Theme: {resolvedTheme}</li>
                  <li>Query: {searchKey.current}</li>
                </ul>
              ) : (
                <ClientOnly hasMounted={hasMounted}>
                  <iframe
                    title={title}
                    className="frame"
                    src={processUrl(url, searchKey.current)}
                    key={title + refresher}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    loading="lazy"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
                    referrerPolicy="no-referrer"
                    style={
                      resolvedTheme === 'dark' ? { filter: 'invert(1) hue-rotate(180deg)' } : {}
                    }
                  />
                </ClientOnly>
              )}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
      {/* <ConfigEditor
        config={config}
        setConfig={setConfig}
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
      /> */}
    </div>
  )
}
