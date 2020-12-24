import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'

import { getGeolocationRequest } from 'src/client/actions'
import PrivateRoute from 'src/client/components/wrappers/PrivateRoute'
import Spinner from 'src/client/components/blocks/Spinner'

const Landing = dynamic(() => import('src/client/components/pages/Landing'), {
  loading: () => <Spinner />,
})

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGeolocationRequest())
  }, [])

  return (
    <PrivateRoute>
      <Landing />
    </PrivateRoute>
  )
}
