import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
const querystring = require('querystring')

export default function Query(props) {
  const router = useRouter()
  const q = router.query.q
  const renderCount = useRef(0)
  useEffect(() => {
    renderCount.current++
    console.log('renderCount', renderCount.current)
  })
  useEffect(() => {
    console.log('Mounted\nq=', q)
    const handleRouteChange = (url, options) => {
      const query = querystring.parse(url.split('?').slice(1).join())
      console.log(
        'routeChangeStart',
        JSON.stringify(query, null, 2),
        '\nOptions:',
        JSON.stringify(options, null, 2)
      )
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])
  useEffect(() => {
    console.log('q changed: ', q)
  }, [q])
  useEffect(() => {
    console.log('router.isReady', router.isReady)
  }, [router.isReady])

  return <>Query: {q}</>
}
