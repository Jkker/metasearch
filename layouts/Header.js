import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import ActiveLink from '../components/ActiveLink'
import Link from '../components/Link'
import ThemeSwitch from '../components/ThemeSwitch'
import MobileNav from './MobileNav'

export default function navbar({ override }) {
  return (
    <header
      className={`fixed h-14 p-3 top-0 z-50 w-full flex items-center justify-end ${
        override
          ? override
          : 'bg-white dark:bg-gray-800 acrylic shadow-md dark:shadow-none  bg-opacity-80 dark:bg-opacity-50 text-gray-900 dark:text-gray-100 '
      } `}
    >
      {/* <Link
        href="/"
        aria-label={siteMetadata.headerTitle}
        className="flex items-center justify-between"
      >
        <h1
          className={`h-6 text-2xl font-semibold ${
            override ? 'text-white' : 'text-gray-900 dark:text-gray-100'
          }`}
        >
          {siteMetadata.headerTitle}
        </h1>
      </Link> */}
      <nav className="nav-bar flex items-center text-base leading-5">
       {/*  {headerNavLinks.map((link) => (
          <ActiveLink key={link.title} href={link.href} activeClassName="active-link">
            <a className="p-2 sm:p-3 custom-link relative">{link.title}</a>
          </ActiveLink>
        ))} */}
        <ThemeSwitch override={override} className="ml-1 mr-1 sm:ml-4" />
        {/* <MobileNav override={override} /> */}
      </nav>
    </header>
  )
}
