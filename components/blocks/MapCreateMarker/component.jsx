import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Marker, useMapEvent, Popup } from 'react-leaflet'
import L from 'leaflet'

import { defaultMarkerIcon } from 'utils/defaultMarkerIcon'
import { createMarkerIcon } from 'utils/markerIcon'
import MarkerPopupCreateEvent from 'components/blocks/MarkerPopupCreateEvent'

export default function CreateMarker() {
  const userProfilesList = useSelector(
    (state) => state.profiles.userProfilesList
  )
  const userEmail = useSelector((state) => state.user.email)
  const [position, setPosition] = useState(null)

  useMapEvent({
    click(e) {
      setPosition(e.latlng)
    },
  })

  const markerIcon = L.icon(
    userProfilesList
      ? createMarkerIcon(userProfilesList, userEmail)
      : defaultMarkerIcon
  )

  return (
    position && (
      <Marker position={position} icon={markerIcon}>
        <Popup>
          <MarkerPopupCreateEvent position={position} />
        </Popup>
      </Marker>
    )
  )
}
