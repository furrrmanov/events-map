import { defaultMarkerIcon } from 'src/client/utils/defaultMarkerIcon'

export const usersMarkerIcon = (iconList, marker, completed) => {
  const icon = iconList.find((icon) => {
    return icon.owner === marker.createdBy
  })

  return icon && icon.iconUrl
    ? {
        iconUrl: icon.iconUrl,
        iconSize: [38, 38],
        iconAnchor: [20, 26],
        popupAnchor: [0, -26],
        className: completed ? 'event-completed' : null
      }
    : defaultMarkerIcon
}

export const createMarkerIcon = (iconList, userEmail) => {
  const icon = iconList.find((icon) => {
    return icon.owner === userEmail
  })

  return icon && icon.iconUrl
    ? {
        iconUrl: icon.iconUrl,
        iconSize: [38, 38],
        iconAnchor: [20, 26],
        popupAnchor: [0, -26],
        className: 'create-marker',
      }
    : defaultMarkerIcon
}
