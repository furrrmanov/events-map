import React from 'react'
import dynamic from 'next/dynamic'

import BasicLayout from 'components/layouts/BasicLayout/component'
import PrivateRoute from 'components/wrappers/PrivateRoute'
import Spinner from 'components/Spinner'

const EventManagementTable = dynamic(
  () => import('components/blocks/EventManagementTable'),
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
