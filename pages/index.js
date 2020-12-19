import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'

import { getGeolocationRequest } from 'actions'
import PrivateRoute from 'components/wrappers/PrivateRoute'
import Spinner from 'components/Spinner'

const Landing = dynamic(() => import('components/pages/Landing'), {
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
