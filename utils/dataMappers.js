import moment from 'moment'

export const tarnsformUserInfoData = (data, location) => {
  return {
    isLogged: true,
    email: data.email,
    name: data.displayName,
    photoUrl: data.providerData[0].photoURL,
  }
}

export const convertEventDataInObject = (
  eventName,
  eventPublick,
  eventDate,
  eventTime,
  expiredEvent,
  eventNotifications,
  createdByEmail,
  friends,
  position
) => {
  let dateForUnixCode

  eventDate && eventTime
    ? (dateForUnixCode = moment(eventDate + ' ' + eventTime).format('x'))
    : dateForUnixCode = ''

  return {
    createdBy: createdByEmail,
    name: eventName,
    public: eventPublick,
    date: dateForUnixCode,
    deleteExpiredEvent: expiredEvent,
    notifications: eventNotifications,
    friendsEmail: friends.lenght >= 1 ? friends.split(',') : friends,
    coordinates: position,
    completed: false,
  }
}

export const transformDataList = (data) => {
  return data.reduce((acc, item) => {
    acc.push({ ...item[1], id: item[0] })
    return acc
  }, [])
}

export const userAccessRightsToViewEvents = (eventsList, userEmail) => {
  return eventsList.public ||
    eventsList.createdBy === userEmail ||
    eventsList.friendsEmail.includes(userEmail)
    ? true
    : false
}

export const filteredEventListUserCreated = (data, userEmail) => {
  return data.filter((item) => item.createdBy === userEmail)
}
