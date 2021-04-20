import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Children } from 'react'

const ActiveLink = ({ children, activeClassName, ...props }) => {
  const router = useRouter()
  const child = Children.only(children)
  const childClassName = child.props.className || ''

  const className =
    router?.pathname === props.as || router?.pathname?.split('/')[1] === props.href.split('/')[1]
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

export default ActiveLink
