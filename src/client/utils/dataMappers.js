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
    friendsEmail: friends.length >= 1 ? friends.split(',') : '',
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

export const transformDataInCsv = (data) => {
  const dataCsv = data.reduce((acc, event) => {
    acc.push({
      name: event.name,
      date: event.date ? moment.unix(event.date / 1000).format('LL HH:mm') : '',
      friends: event.friendsEmail,
      createdBy: event.createdBy,
      public: event.public,
      deleteExpiredEvent: event.deleteExpiredEvent,
      notifications: event.notifications,
      coordinates: `${event.coordinates.lat}, ${event.coordinates.lng}`,
      completed: event.completed
    })
    return acc
  }, [])
  return dataCsv
}
