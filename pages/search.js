// import { frames, links } from '@/data/config-v1.js';
import getConfig from '@/lib/getConfig'
import {
  LinkOutlined,
  LockOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Dropdown, Menu, Switch, Tabs, Tooltip } from 'antd'
import Loading from 'components/Loading.js'
import { placeholderText } from 'data/i18n'
import mobile from 'ismobilejs'
import parseConfig from 'lib/parseConfig.js'
import { debounce } from 'lodash'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import ConfigEditor from '../components/ConfigEditor'
import SVGFromString from '../components/SVGFromString'
import ThemeSwitch from '../components/ThemeSwitch'

const querystring = require('querystring')

export async function getStaticProps(context) {
  const locale = context.locale ?? context.defaultLocale
  const name = locale
  const config = await getConfig(locale)
  const placeholder = placeholderText(locale)
  return {
    props: {
      config,
      DEBUG: process.env.NODE_ENV === 'development',
      name,
      placeholder,
    },
    revalidate: 1,
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
  const DEBUG_LOGGING = props.DEBUG
  const DEBUG_FRAMES = props.DEBUG

  const router = useRouter()
  const [session, sessionLoading] = useSession()

  const isMobile = mobile().any
  const platform = isMobile ? 'mobile' : 'desktop'
  // console.log('platform:', platform)

  const [config, setConfig] = useState(props.config)
  const { links, frames } = parseConfig(config, platform)

  const [hydrated, setHydrated] = React.useState(false)

  const { data: geoData, error: geoError } = useSWR('/api/geoip/country', fetcher)

  const { resolvedTheme } = useTheme()

  // * Search Functionality
  const defaultEngine = useRef(frames[0].title)

  const search = useRef({
    q: '',
    engine: defaultEngine.current,
  })
  const [inputKey, setInputKey] = useState('')
  const [refresher, setRefresher] = useState(0)
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (router.isReady) {
      if (DEBUG_LOGGING)
        console.log(
          'router.isReady\n',
          'Search: ',
          search.current.q,
          '→',
          router.query.q,
          '\nEngine: ',
          search.current.engine,
          '→',
          router.query.engine
        )
      search.current.q = router.query.q
      search.current.engine = router.query.engine ? router.query.engine : defaultEngine.current
      setInputKey(router.query.q)
      setHydrated(true)
      if (router.query.edit && router.query.edit !== '0') {
        if (DEBUG_LOGGING) console.log('setEdit: ', router.query.edit)
        setEdit(router.query.edit)
      }
    }
  }, [router.isReady])

  useEffect(() => {
    if (!sessionLoading && session && session.user.name !== props.name) {
      if (DEBUG_LOGGING) console.log('Updating config to: ', session.user.name)
      setConfig(session.user.config)
    }
  }, [sessionLoading])

  const toggleEdit = () => {
    router.push(
      edit
        ? {
            pathname: router.pathname,
            query: { q: search.current.q, engine: search.current.engine },
          }
        : {
            pathname: router.pathname,
            query: { q: search.current.q, engine: search.current.engine, edit: 1 },
          },
      undefined,
      {
        shallow: true,
      }
    )
    setEdit((prev) => !prev)
  }

  // Respond to route change events (back / forward button click)
  useEffect(() => {
    if (DEBUG_LOGGING) {
      console.log('Mounted')
    }
    const handleRouteChange = (url, { shallow }) => {
      if (router.isReady) {
        const query = querystring.parse(url.split('?').slice(1).join())
        if (DEBUG_LOGGING) console.log('routeChangeStart', query, '\nshallow:', shallow)
        const newEng = query.engine ?? defaultEngine.current
        const newSearchKey = query.q ?? ''
        if (search.current.engine !== newEng) {
          if (DEBUG_LOGGING) {
            console.log('handleRouteChange Engine:', search.current.engine, '→', newEng)
          }
          search.current.engine = newEng
        }
        if (newSearchKey !== search.current.q) {
          if (DEBUG_LOGGING) {
            console.log('handleRouteChange Search:', search.current.q, '→', newSearchKey)
          }
          search.current.q = newSearchKey
          setInputKey(newSearchKey)
        }
      }
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  // Change default engine based on geo-ip data (skip engines unavailable in current region)
  useEffect(() => {
    if (!router.query?.engine && geoData) {
      for (const e of frames) {
        if (!e.blockedRegions?.includes(geoData.country)) {
          defaultEngine.current = e.title
          break
        }
      }
      if (defaultEngine.current && defaultEngine.current !== search.current.engine) {
        if (DEBUG_LOGGING)
          console.log('GEO API responded:', search.current.engine, '→', defaultEngine.current)
        handleSetEngine(defaultEngine.current)
      }
    }
  }, [geoData])
  const t = useRef(Date.now())
  const handleSetSearch = (newSearchKey) => {
    if (DEBUG_LOGGING) {
      const now = Date.now()
      console.log('handleSetSearch invoked', now - t.current, 'ms after previous call')
      t.current = now
    }

    const trimmedKey = newSearchKey.trim()

    if (trimmedKey === search.current.q || newSearchKey === search.current.q) {
      if (DEBUG_LOGGING) console.log('REFRESH: refresher =', refresher + 1)
      setRefresher(refresher + 1)
      return
    } else if (router.isReady) {
      if (DEBUG_LOGGING) console.log('SetSearch:', search.current.q, '→', trimmedKey)
      search.current.q = newSearchKey
      router.push(
        { pathname: router.pathname, query: { ...search.current, q: newSearchKey } },
        undefined,
        {
          shallow: true,
        }
      )
    }
  }
  const debounceSetSearch = useCallback(debounce(handleSetSearch, 800), [search.current.engine], {
    leading: true,
  })

  const handleInputChange = (e) => {
    setInputKey(e.target.value)
    if (!isMobile) {
      // if (DEBUG_LOGGING) console.log('on input change: debounceSetSearch', e.target.value)
      debounceSetSearch(e.target.value)
    }
  }

  const handleSetEngine = (newEng) => {
    if (DEBUG_LOGGING)
      console.log(
        'handleSetEngine:',
        search.current.engine,
        '→',
        newEng,
        '\nsearch.current.q =',
        search.current.q,
        '\nrouter.query?.q =',
        router.query?.q,
        '\ninputKey =',
        inputKey
      )
    if (newEng === search.current.engine) {
      setRefresher(refresher + 1)
      return
    } else if (router.isReady) {
      search.current.engine = newEng
      router.push(
        { pathname: router.pathname, query: { ...search.current, engine: newEng } },
        undefined,
        {
          shallow: true,
        }
      )
    }
  }

  // When logo or clear button is clicked
  const handleReset = () => {
    if (DEBUG_LOGGING) console.log('handleReset')
    setInputKey('')
    search.current.q = ''
    router.push(
      { pathname: router.pathname, query: { q: '', engine: search.current.engine } },
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
    if (DEBUG_LOGGING) console.log('renderCount', renderCount.current)
  })

  // Auto focus search bar after refresh on desktop
  const landingSearchBarRef = useRef(null)

  useEffect(() => {
    if (!search.current.q && !inputKey && !isMobile) {
      landingSearchBarRef?.current?.focus?.()
    }
  })

  const enginesList = frames.map(({ title }) => title)
  const linksList = links.map(({ title }) => title)
  const currLinkIdx = useRef(false)

  // Keyboard shortcuts

  useEffect(() => {
    const onKeyDown = (e) => {
      // if (DEBUG_LOGGING) console.log('Key Pressed: ', e.key, '\tEdit Mode: ', edit)
      const key = e.key
      if (DEBUG_LOGGING) {
        console.log(e.key, 'Key Pressed!!: ', '\tEdit Mode: ', edit, '\tInputKey:', inputKey)
      }
      switch (key) {
        // Search / refresh on enter
        case 'Enter': {
          if (edit) break
          if (currLinkIdx.current === false) {
            e.preventDefault()
            document?.activeElement?.click?.()
          } else {
            e.preventDefault()
            handleSetSearch(inputKey)
          }
          break
        }
        // Focus search bar on /
        case '/': {
          if (document.activeElement !== landingSearchBarRef.current && !edit) {
            e.preventDefault()
            landingSearchBarRef?.current?.focus?.()
          }
          break
        }
        // Blur search bar on escape
        case 'Escape': {
          e.preventDefault()
          currLinkIdx.current = false
          document?.activeElement?.blur?.()
          break
        }
        case ']': {
          if (!edit) {
            if (e.ctrlKey && !e.shiftKey) {
              // Switch to the next tab on ctrl + right arrow
              e.preventDefault()
              const currEngIdx = enginesList.indexOf(search.current.engine)
              handleSetEngine(enginesList[currEngIdx + 1] ?? enginesList[0])
            } else if (e.altKey) {
              // Switch to the next link on ctrl + right arrow
              e.preventDefault()
              if (currLinkIdx === false) {
                currLinkIdx.current = 0
                document.getElementById(linksList[0] + '-link')?.focus()
              } else {
                document.getElementById(linksList[currLinkIdx.current] + '-link')?.blur()
                const nextIdx =
                  currLinkIdx.current + 1 >= linksList.length ? 0 : currLinkIdx.current + 1
                currLinkIdx.current = nextIdx
                document.getElementById(linksList[nextIdx] + '-link')?.focus()
              }
            }
          }
          break
        }
        case '[': {
          if (!edit) {
            if (e.ctrlKey && !e.shiftKey) {
              // Switch to the previous tab on ctrl + left arrow
              e.preventDefault()
              const currEngIdx = enginesList.indexOf(search.current.engine)
              handleSetEngine(enginesList[currEngIdx - 1] ?? enginesList[enginesList.length - 1])
            } else if (e.altKey) {
              // Switch to the previous link on shift + left arrow
              e.preventDefault()
              if (currLinkIdx === false) {
                currLinkIdx.current = 0
                document.getElementById(linksList[0] + '-link')?.focus()
              } else {
                document.getElementById(linksList[currLinkIdx.current] + '-link')?.blur()
                const nextIdx =
                  currLinkIdx.current - 1 < 0 ? linksList.length - 1 : currLinkIdx.current - 1
                currLinkIdx.current = nextIdx
                document.getElementById(linksList[nextIdx] + '-link')?.focus()
              }
            }
          }
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
  }, [edit, inputKey])

  const [dropdownVisible, setDropdownVisible] = useState(false)

  return (
    <>
      {/* Custom HTML head */}
      <Head>
        <title>
          {search.current.q ? `${search.current.q} - ${search.current.engine}` : 'Metasearch'}
        </title>
      </Head>
      {/* HTML Body */}
      <Loading spinning={loading}>
        <div className="app-container flex flex-col h-screen w-screen items-stretch">
          <div className="search-header-container h-8 flex w-screen my-2 justify-between items-center flex-nowrap text-center flex-none head-container bg-white dark:bg-gray-900 z-10">
            <div id="search-header-left" className="flex flex-auto flex-center max-w-screen-md">
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
              <div className="meta-search-bar flex-auto focus:shadow hover:shadow focus-within:shadow flex flex-nowrap">
                <div className="relative flex-auto">
                  <input
                    aria-label="Metasearch"
                    placeholder={props.placeholder}
                    type="text"
                    ref={landingSearchBarRef}
                    onChange={handleInputChange}
                    className="flex-auto ring-opacity-50 w-full h-8 rounded-sm text-black dark:text-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-r-none bg-gray-100 p-3 pr-8 text-base outline-none focus:outline-none border-none focus:border-transparent ring-0 focus:ring-0"
                    value={inputKey}
                    autoFocus
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
              <div className="h-full mx-2 border-l dark:border-gray-600" />
            </div>
            <div id="search-header-right" className="flex flex-0 flex-center space-x-3 mr-1">
              <Loading spinning={sessionLoading}>
                {session ? (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item className="flex justify-between items-center">
                          Edit
                          <Tooltip title="Toggle Edit Mode">
                            <Switch
                              className="ml-2"
                              checked={edit}
                              onChange={toggleEdit}
                              checkedChildren={<SettingOutlined />}
                              unCheckedChildren={<LockOutlined />}
                            />
                          </Tooltip>
                        </Menu.Item>
                        <Menu.Item className="flex justify-between items-center">
                          <button onClick={() => signOut()}>
                            Logout <LogoutOutlined className="ml-2" />
                          </button>
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    {session.user?.image ? (
                      <Avatar
                        icon={<UserOutlined />}
                        src={session?.user?.image}
                        size={28}
                        className="flex-center"
                      />
                    ) : (
                      <Avatar>{session.user?.name?.charAt(0)}</Avatar>
                    )}
                  </Dropdown>
                ) : (
                  <Tooltip title="Sign In">
                    <button onClick={() => signIn()}>
                      <Avatar icon={<UserOutlined />} size={28} className="flex-center" />
                    </button>
                  </Tooltip>
                )}
              </Loading>

              {/* <div className="h-full ml-2 border-l dark:border-gray-600"></div> */}
              <div className="flex-0 ">
                <ThemeSwitch />
              </div>
            </div>
          </div>
          <div className="search-body-container flex-1 h-full flex items-stretch">
            {edit ? (
              <ConfigEditor
                config={config}
                setConfig={setConfig}
                name={props.name}
                loading={loading}
                setLoading={setLoading}
                session={session}
                DEBUG={DEBUG_LOGGING}
                resolvedTheme={resolvedTheme}
              />
            ) : (
              <Tabs
                className="dark:text-white dark:bg-gray-900"
                type="card"
                activeKey={search.current.engine}
                onTabClick={handleSetEngine}
                tabBarExtraContent={
                  // links container
                  <div className="flex-0">
                    {/* Mobile Links */}
                    <Dropdown
                      visible={dropdownVisible}
                      onVisibleChange={setDropdownVisible}
                      overlay={
                        <Menu>
                          {links.map(({ url, title }) => (
                            <Menu.Item key={title}>
                              <a
                                title={title}
                                key={title}
                                href={processUrl(url, search.current.q)}
                                target="_blank"
                                rel="noreferrer"
                                className="links"
                              >
                                {title}
                              </a>
                            </Menu.Item>
                          ))}
                        </Menu>
                      }
                      trigger={['click', 'hover']}
                      className="lg:hidden"
                    >
                      <button
                        className="rounded-sm responsive-element h-9-1 p-2 flex flex-nowrap whitespace-nowrap justify-evenly items-center focus:outline-none z-20"
                        onClick={(e) => e.preventDefault()}
                      >
                        Links <LinkOutlined className="ml-1" />
                      </button>
                    </Dropdown>
                    {/* Desktop Links */}
                    <div className="hidden lg:block">
                      <div className="flex flex-nowrap space-x-1 xl:space-x-2 h-full justify-evenly">
                        {links.map(({ url, title }) => (
                          <a
                            title={title}
                            key={title}
                            id={title + '-link'}
                            href={processUrl(url, search.current.q)}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-sm responsive-element h-9-1 p-1 lg:p-2 flex flex-nowrap whitespace-nowrap justify-evenly items-center"
                          >
                            {title} <LinkOutlined className="ml-1" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                }
              >
                {frames.map(({ title, url, style }) => (
                  <Tabs.TabPane
                    key={title}
                    className="tabpane"
                    tab={
                      <div
                        className="tab-title flex-center"
                        // style={{ background: style?.hex, color: 'white' }}
                      >
                        <SVGFromString
                          svg={style?.svg}
                          style={resolvedTheme === 'dark' ? { filter: 'invert(1)' } : {}}
                        />
                        {title}
                      </div>
                    }
                  >
                    {DEBUG_FRAMES ? (
                      <section>
                        <ul className="ml-24 h-full flex flex-col justify-center leading-loose list-disc dark:text-white">
                          <h2>
                            <b>Search</b>
                          </h2>
                          <li>Search Key: {search.current.q}</li>
                          <li>Engine: {search.current.engine}</li>
                          <li>Country: {geoData?.country}</li> <li>IP: {geoData?.ip}</li>
                          <li>Theme: {resolvedTheme}</li>
                          <li>Query: {search.current.q}</li>
                          <h2>
                            <b>User</b>
                          </h2>
                          <li>Username: {session?.user?.name}</li>
                          <li>Email: {session?.user?.email}</li>
                          <li>AccessToken: {session?.accessToken}</li>
                          <li>
                            User Config:{' '}
                            {JSON.stringify(session?.user?.config?.map((e) => e.title))}
                          </li>
                        </ul>
                      </section>
                    ) : (
                      <ClientOnly hasMounted={hydrated}>
                        <iframe
                          title={title}
                          className="frame"
                          src={processUrl(url, search.current.q)}
                          key={title + refresher}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          loading="lazy"
                          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
                          referrerPolicy="no-referrer"
                          style={
                            resolvedTheme === 'dark'
                              ? { filter: 'invert(1) hue-rotate(180deg)' }
                              : {}
                          }
                        />
                      </ClientOnly>
                    )}
                  </Tabs.TabPane>
                ))}
              </Tabs>
            )}
          </div>
        </div>
      </Loading>
    </>
  )
}
