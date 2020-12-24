import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { MapContainer, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import LocationMarker from 'src/client/components/blocks/MapMarker'
import CreateMarker from 'src/client/components/blocks/MapCreateMarker'
import { userAccessRightsToViewEvents } from 'src/client/utils/dataMappers'
import { getEventListFromFirebaseDb, usersProfileListRequest } from 'src/client/actions'

import { MapWrapper } from './styles'

export default function WorldMap() {
  const position = useSelector((state) => state.map.userLocation.coordinates)
  const userEmail = useSelector((state) => state.user.email)
  const eventList = useSelector((state) => state.event.eventsList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(usersProfileListRequest())
    dispatch(getEventListFromFirebaseDb())
  }, [])

  return (
    <MapWrapper className="map">
      <MapContainer className="leaflet-map" center={position} zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {eventList.map((item, index) => {
            return userAccessRightsToViewEvents(item, userEmail) === true ? (
              <LocationMarker key={index} item={item} />
            ) : null
          })}
          <CreateMarker />
        </MarkerClusterGroup>
      </MapContainer>
    </MapWrapper>
  )
}
