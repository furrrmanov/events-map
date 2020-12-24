import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { checkUserAuth } from 'src/client/utils/fireBase'
import Spinner from 'src/client/components/blocks/Spinner'
import MessagesBar from 'src/client/components/blocks/MessagesBar'

const login = '/signIn'

export default function PrivateRoute({ children }) {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUserAuth().then((value) => {
      setIsAuth(value)
      setIsLoading(false)
    }).catch(() => {
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  if (isAuth) {
    return (
      <>
      <MessagesBar />
      {children}
      </>
    )
  } else {
    router.push(login)
    return null
  }
}
