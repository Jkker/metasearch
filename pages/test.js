// import AddEngineModal from "@/components/AddEngineModal"
// import dbConnect from "lib/dbConnect.js"
// import User from "models/User.js"
// import Form from "components/ConfigItemForm"
// import ClientOnly from "components/ClientOnly"
// import { Spin  } from 'antd'
import Loading from 'components/Loading.js'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Page() {
  const [session, loading] = useSession()
  const router = useRouter()
  useEffect(() => {
    if (router.isReady) console.log(router.query.e, typeof router.query.e)
  }, [router.isReady])
  return (
    <Loading spinning={loading}>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.name} <br />
          <div>{JSON.stringify(session, null, 2)}</div>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </Loading>
  )
}
