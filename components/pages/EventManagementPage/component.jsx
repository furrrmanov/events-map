import React from 'react'

import BasicLayout from 'components/layouts/BasicLayout/component'
import EventManagementTable from 'components/blocks/EventManagementTable'

export default function EventManagementPage() {
  return (
    <BasicLayout>
      <EventManagementTable />
    </BasicLayout>
  )
}
