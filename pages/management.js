import React from 'react'
import dynamic from 'next/dynamic'

import BasicLayout from 'src/client/components/layouts/BasicLayout/component'
import PrivateRoute from 'src/client/components/wrappers/PrivateRoute'
import Spinner from 'src/client/components/blocks/Spinner'

const EventManagementTable = dynamic(
  () => import('src/client/components/blocks/EventManagementTable'),
  {
    loading: () => <Spinner />,
  }
)

export default function EventManagementPage() {
  return (
    <PrivateRoute>
      <BasicLayout>
        <EventManagementTable />
      </BasicLayout>
    </PrivateRoute>
  )
}
