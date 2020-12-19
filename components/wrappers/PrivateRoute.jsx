import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { checkUserAuth } from 'utils/fireBase'
import Spinner from 'components/Spinner'
import MessagesBar from 'components/blocks/MessagesBar'

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
