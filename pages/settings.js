import React from 'react'
import dynamic from 'next/dynamic'

import BasicLayout from 'components/layouts/BasicLayout/component'
import PrivateRoute from 'components/wrappers/PrivateRoute'
import Spinner from 'components/Spinner'

const Settings = dynamic(() => import('components/blocks/Settings'), {
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
