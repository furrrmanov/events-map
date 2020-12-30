import React from 'react'

import NotificationsControls from 'src/client/components/blocks/NotificationsControls'
import MarkerControls from 'src/client/components/blocks/MarkerControls'
import EventsControls from 'src/client/components/blocks/EventsControls'

import { SettingsWrapper } from './styles'

export default function Settings() {
  return (
    <SettingsWrapper>
      <NotificationsControls />
      <MarkerControls />
      <EventsControls />
    </SettingsWrapper>
  )
}
