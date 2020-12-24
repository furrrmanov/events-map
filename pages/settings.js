import React from 'react'
import dynamic from 'next/dynamic'

import BasicLayout from 'src/client/components/layouts/BasicLayout/component'
import PrivateRoute from 'src/client/components/wrappers/PrivateRoute'
import Spinner from 'src/client/components/blocks/Spinner'

const Settings = dynamic(() => import('src/client/components/blocks/Settings'), {
  loading: () => <Spinner />,
})

export default function SettingsPage() {
  return (
    <PrivateRoute>
      <BasicLayout>
        <Settings />
      </BasicLayout>
    </PrivateRoute>
  )
}
