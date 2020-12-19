import { defaultMarkerIcon } from 'utils/defaultMarkerIcon'

export const usersMarkerIcon = (iconList, marker) => {
  const icon = iconList.find((icon) => {
    return icon.owner === marker.createdBy
  })

  return icon && icon.iconUrl
    ? {
        iconUrl: icon.iconUrl,
        iconSize: [38, 38],
        iconAnchor: [20, 26],
        popupAnchor: [0, -26],
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
