import React, { useState, createRef } from 'react'
import { useSelector } from 'react-redux'

import L from 'leaflet'
import { Marker, useMapEvent, Popup } from 'react-leaflet'

import { defaultMarkerIcon } from 'src/client/utils/defaultMarkerIcon'
import MarkerPopupCreateEvent from 'src/client/components/blocks/MarkerPopupCreateEvent'
import MarkerPopupShowEvent from 'src/client/components/blocks/MarkerPopupShowEvent'
import { usersMarkerIcon } from 'src/client/utils/markerIcon'

export default function LocationMarker(props) {
  const { item } = props
  const userProfilesList = useSelector(
    (state) => state.profiles.userProfilesList
  )
  const [editEventId, SetEditEventId] = useState('')
  const [editMode, setEditMode] = useState(false)

  useMapEvent({
    click(e) {
      SetEditEventId('')
      setEditMode(false)
    },
  })

  const markerIcon = L.icon(
    userProfilesList
      ? usersMarkerIcon(userProfilesList, item, item.completed)
      : defaultMarkerIcon
  )

  const togglePopupMode = (id) => {
    SetEditEventId(id)
    setEditMode(true)
  }

  return (
    <div>
      return (
      <Marker
        key={item.id}
        position={[item.coordinates.lat, item.coordinates.lng]}
        icon={markerIcon}>
        <Popup>
          {editMode && editEventId === item.id ? (
            <MarkerPopupCreateEvent
              position={{
                lat: item.coordinates.lat,
                lng: item.coordinates.lng,
              }}
              editMode={editMode}
              editEventId={editEventId}
              event={item}
            />
          ) : (
            <MarkerPopupShowEvent
              togglePopupMode={togglePopupMode}
              event={item}
            />
          )}
        </Popup>
      </Marker>
      )
    </div>
  )
}
