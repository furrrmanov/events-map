import React from 'react'

import BasicLayout from 'src/client/components/layouts/BasicLayout/component'
import EventManagementTable from 'src/client/components/blocks/EventManagementTable'

export default function EventManagementPage() {
  return (
    <BasicLayout>
      <EventManagementTable />
    </BasicLayout>
  )
}
