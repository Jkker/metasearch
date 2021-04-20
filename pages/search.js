import { frames, links } from '@/data/config.js';
import { LinkOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Tabs } from 'antd';
import mobile from 'ismobilejs';
import { debounce } from 'lodash';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import ThemeSwitch from '../components/ThemeSwitch';
const querystring = require('querystring');

export async function getServerSideProps(context) {
	const { q, engine } = context.query;
	// console.log('getServerSideProps: q=' + q + ' engine=' + engine)
	return {
		props: {
			default: {
				q: q ?? '',
				engine: engine ?? 'default',
			},
		},
	};
	// const requestIp = require('request-ip')
	// const clientIp = requestIp.getClientIp(context.req)
	// const DEBUG = clientIp === '::1' || clientIp === '127.0.0.1'
	/* if (engine) {
    // Client declared default search engine
    return {
      props: {
        default: {
          q: q ?? '',
          engine,
        },
        DEBUG,
      },
    }
  } else {
    // Use client's geoip to find the most appropriate default search engine
    const { lookup } = require('geoip-country')

    const DEFAULT_IP = '1.0.1.0' // CN
    const geo = lookup(clientIp?.replace('::1', '')?.replace('127.0.0.1', '') || DEFAULT_IP) // Replace lan IP address with default IP address
    const clientInCN = geo?.country === 'CN' ? false : true
    const defaultEngine = clientInCN
      ? frames('', clientInCN)[0].title
      : frames('', clientInCN)[1].title

    return {
      props: {
        default: {
          q: q ?? '',
          engine: defaultEngine,
        },
        geo,
        DEBUG,
      },
    }
  } */
}
const DEBUG = false;

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Test(props) {
	const { data: geoData, error: geoError } = useSWR('/api/geoip/country', fetcher);

	const { resolvedTheme } = useTheme();

	// * Search Functionality
	const router = useRouter();
	const engine = useRef(
		props.default.engine === 'default' ? frames('', false)[0].title : props.default.engine
	);
	const searchKey = useRef(props.default.q);

	const [inputKey, setInputKey] = useState(props.default.q);
	const [refresher, setRefresher] = useState(0);

	// Respond to route change events (back / forward button click)
	useEffect(() => {
		/* navigator.serviceWorker.register('/sw.js', { scope: '/search' }).catch(function (e) {
      console.error('Error during service worker registration:', e)
    }) */
		const handleRouteChange = (url, { shallow }) => {
			const query = querystring.parse(url.split('?').slice(1).join());
			const newEng = query.engine ?? props.default.engine;
			const newSearchKey = query.q ?? '';
			if (engine.current !== newEng) {
				engine.current = newEng;
				if (DEBUG) {
					console.log('Engine:', newEng);
				}
			}
			if (newSearchKey !== searchKey.current) {
				if (DEBUG) {
					console.log('Search:', newSearchKey);
				}
				searchKey.current = newSearchKey;
				setInputKey(newSearchKey);
			}
		};
		router.events.on('routeChangeStart', handleRouteChange);
		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	}, []);

	useEffect(() => {
		const clientInCN = geoData?.country === 'CN' ? false : true;
		const defaultEngine = clientInCN
			? frames('', clientInCN)[0].title
			: frames('', clientInCN)[1].title;
		if (props.default.engine === 'default' && engine.current !== defaultEngine) {
			if (DEBUG)
				console.log('GEO API responded: change engine from', engine.current, 'to', defaultEngine);
			handleSetEngine(defaultEngine);
		}
	}, [geoData]);

	const handleSetSearch = (newSearchKey) => {
		const trimmedKey = newSearchKey.trim();

		if (trimmedKey === searchKey.current) {
			if (DEBUG) {
				console.log('Refresh Iframe');
			}
			setRefresher(refresher + 1);
			return;
		} else {
			if (DEBUG) {
				console.log('Search:', newSearchKey);
			}
			searchKey.current = newSearchKey;
			router.push(
				{ pathname: router.pathname, query: { q: newSearchKey, engine: engine.current } },
				undefined,
				{
					shallow: true,
				}
			);
		}
	};
	const debounceSetSearch = useCallback(debounce(handleSetSearch, 1000), [engine.current]);

	const handleInputChange = (e) => {
		setInputKey(e.target.value);
		debounceSetSearch(e.target.value);
	};

	const handleSetEngine = (newEng) => {
		if (newEng === engine.current) {
			if (DEBUG) {
				console.log('Refresh Iframe');
			}
			setRefresher(refresher + 1);
			return;
		} else {
			if (DEBUG) {
				console.log('Engine:', newEng);
			}
			engine.current = newEng;
			router.push(
				{ pathname: router.pathname, query: { q: inputKey, engine: newEng } },
				undefined,
				{
					shallow: true,
				}
			);
		}
	};

	// When logo or clear button is clicked
	const handleReset = () => {
		setInputKey('');
		searchKey.current = props.default.q;
		router.push(
			{ pathname: router.pathname, query: { q: '', engine: engine.current } },
			undefined,
			{
				shallow: true,
			}
		);
	};

	// DEBUGGING: render count
	const renderCount = useRef(0);
	useEffect(() => {
		renderCount.current++;
		if (props.DEBUG) console.log('renderCount', renderCount.current);
	});

	// Auto focus search bar after refresh on desktop
	const landingSearchBarRef = useRef(null);
	const isMobile = mobile().any;
	const platform = isMobile ? 'mobile' : 'desktop';

	useEffect(() => {
		if (!isMobile) {
			landingSearchBarRef?.current?.focus?.();
		}
	}, [searchKey.current, engine.current]);

	// Detect if user is on mobile platform & parse link accordingly
	const parseLink = (link) => {
		return link?.[platform] ?? link;
	};

	const menu = isMobile ? (
		<Menu>
			{links(encodeURIComponent(searchKey.current)).map(({ link, title }) => (
				<Menu.Item key={title}>
					<a
						title={title}
						key={title}
						href={link}
						target='_blank'
						rel='noreferrer'
						className='links'
					>
						{title}
					</a>
				</Menu.Item>
			))}
		</Menu>
	) : null;

	return (
		<div className='app-container flex flex-col h-screen w-screen'>
			{/* Custom HTML head */}
			<Head>
				<title>
					{searchKey.current ? `${searchKey.current} - ${engine.current}` : 'Metasearch'}
				</title>
			</Head>
			{/* Body */}
			<div className='h-8 flex max-w-screen mt-2 justify-between items-center flex-nowrap text-center flex-none head-container bg-white dark:bg-gray-900 z-10'>
				{/* Logo */}
				<Link href='/'>
					<a className='block my-1 mx-2 h-8 flex-none'>
						<Image
							src='/static/images/search-logo.png'
							alt='logo'
							layout='fixed'
							height={26}
							width={26}
						></Image>
					</a>
				</Link>
				{/* Search Bar */}
				<div className='flex-auto meta-search-bar relative'>
					<input
						aria-label='Metasearch'
						placeholder='搜你所想'
						type='text'
						ref={landingSearchBarRef}
						onChange={handleInputChange}
						className='flex-auto ring-opacity-50 w-full h-8 rounded-sm text-black dark:text-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 rounded-r-none bg-gray-100 p-3 pr-8 text-base'
						value={inputKey}
						onKeyDown={({ key }) => {
							switch (key) {
								case 'Enter': {
									handleSetSearch(inputKey);
									break;
								}
								case 'Escape': {
									handleReset();
									break;
								}
								default:
									break;
							}
						}}
					/>
					{/* Search Bar Actions */}
					<div className='absolute text-gray-800 dark:text-gray-100 right-3 top-0 text-opacity-70 flex items-center justify-evenly space-x-4 h-full'>
						<button
							className='reset button'
							onClick={handleReset}
							onKeyDown={(e) => {
								if (e.key === 'Escape') {
									handleReset();
								}
							}}
						>
							<svg
								className='w-3 h-3 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400'
								aria-hidden='true'
								focusable='false'
								data-prefix='fas'
								data-icon='times-circle'
								role='img'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 512 512'
							>
								<path
									fill='currentColor'
									d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z'
								></path>
							</svg>
						</button>
					</div>
				</div>
				{/* Search Button */}
				<button
					id='search'
					className='rounded-sm rounded-l-none h-8 w-9 flex justify-center items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 z-20'
					onClick={() => handleSetSearch(inputKey)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							handleSetSearch(inputKey);
						}
					}}
				>
					<svg
						className='w-5 h-5 text-gray-900 dark:text-gray-100 text-opacity-70'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
						/>
					</svg>
				</button>
				<div className='h-full mx-2 border-l dark:border-gray-600'></div>
				{/* Links Container */}
				<div className='flex-0'>
					{/* Mobile Links */}
					<Dropdown overlay={menu} trigger={['click', 'hover']} className='md:hidden'>
						<button
							className='rounded-sm responsive-element h-8 p-2 flex flex-nowrap whitespace-nowrap justify-evenly items-center focus:outline-none '
							onClick={(e) => e.preventDefault()}
						>
							Links <LinkOutlined className='ml-1' />
						</button>
					</Dropdown>
					{/* Desktop Links */}
					<div className='hidden md:block'>
						<div className='flex flex-nowrap space-x-1 xl:space-x-2 h-full justify-evenly'>
							{links(encodeURIComponent(searchKey.current)).map(({ link, title }) => (
								<a
									title={title}
									key={title}
									href={link}
									target='_blank'
									rel='noreferrer'
									className='rounded-sm responsive-element h-8 p-1 lg:p-2 flex flex-nowrap whitespace-nowrap justify-evenly items-center'
								>
									{title} <LinkOutlined className='ml-1' />
								</a>
							))}
						</div>
					</div>
				</div>
				<div className='h-full ml-2 border-l dark:border-gray-600'></div>
				<div className='flex-0 mr-1'>
					<ThemeSwitch />
				</div>
			</div>
			<div className='search-body-container flex-1 flex items-stretch'>
				<Tabs
					className='dark:text-white dark:bg-gray-900'
					activeKey={engine.current}
					onTabClick={handleSetEngine}
				>
					{frames(encodeURIComponent(searchKey.current))
						// .sort((a, b) => (b?.priority ?? 0) - (a?.priority ?? 0))
						.map(({ title, link }) => (
							<Tabs.TabPane key={title} tab={title} className='tabpane'>
								{DEBUG ? (
									<ul className='ml-24 h-full flex flex-col justify-center leading-loose list-disc dark:text-white'>
										<li>Search Key: {searchKey.current}</li>
										<li>Engine: {engine.current}</li>
										{/* <li>Country: {geoData?.country}</li> <li>IP: {geoData?.ip}</li> */}
										<li>Theme: {resolvedTheme}</li>
										<li>Query: {searchKey.current}</li>
									</ul>
								) : (
									<iframe
										title={title}
										className='frame'
										src={parseLink(link)}
										key={title + refresher}
										width='100%'
										height='100%'
										frameBorder='0'
										loading='lazy'
										sandbox='allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
										referrerPolicy='no-referrer'
										style={
											resolvedTheme === 'dark' ? { filter: 'invert(1) hue-rotate(180deg)' } : {}
										}
									/>
								)}
							</Tabs.TabPane>
						))}
				</Tabs>
			</div>
		</div>
	);
}
