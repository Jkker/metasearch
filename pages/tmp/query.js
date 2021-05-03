import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'

export default function Query(props) {
  const router = useRouter()
  const q = router.query.q
  const renderCount = useRef(0)
  useEffect(() => {
    renderCount.current++
    console.log('renderCount', renderCount.current)
  })
  useEffect(() => {
    console.log('Mounted')
  }, [])
  useEffect(() => {
    console.log('q changed: ', q)
  }, [q])
  useEffect(() => {
    console.log('router.isReady', router.isReady)
  }, [router.isReady])
  return <>Query: {q}</>
}
