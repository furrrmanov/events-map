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
    friendsEmail:
      friends.length >= 1 && typeof friends == String
        ? friends.split(',')
        : friends.length >= 1
        ? friends
        : '',
    coordinates: position,
    completed: false,
    deleted: false,
  }
}

export const transformDataList = (data) => {
  return data.reduce((acc, item) => {
    acc.push({ ...item[1], id: item[0] })
    return acc
  }, [])
}

export const filteringDeletedEvents = (data) => {
  return data.filter((item) => item.deleted === false)
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
      friendsEmail: event.friendsEmail,
      createdBy: event.createdBy,
      public: event.public,
      deleted: event.deleted,
      deleteExpiredEvent: event.deleteExpiredEvent,
      notifications: event.notifications,
      coordinates: `${event.coordinates.lat}, ${event.coordinates.lng}`,
      completed: event.completed,
    })
    
    return acc
  }, [])

  return dataCsv
}

export const removingDuplicateEvents = (userEventList, eventListOfCsv) => {
  const eventsNameOfCsv = eventListOfCsv.map((event) => event.name)
  const dublicateEvents = userEventList.filter((event) =>
    eventsNameOfCsv.includes(event.name)
  )

  return dublicateEvents
}

export const generateEventsListFromCsvFile = (data) => {
  const filterdData = data.filter((item) => item.name)
 
  return filterdData.reduce((acc, item) => {
    acc.push({
      ...item,
      public: item.public.toUpperCase() === 'TRUE' ? true : false,
      completed: item.completed.toUpperCase() === 'TRUE' ? true : false,
      date: item.date ? moment(item.date, 'LL HH:mm').valueOf() : '',
      deleteExpiredEvent:
        item.deleteExpiredEvent.toUpperCase() === 'TRUE' ? true : false,
      notifications: item.notifications.toUpperCase() === 'TRUE' ? true : false,
      friendsEmail: item.friendsEmail ? item.friendsEmail.split(',') : '',
      coordinates: {
        lat: item.coordinates.split(',')[0],
        lng: item.coordinates.split(',')[1],
      },
      deleted: item.deleted.toUpperCase() === 'TRUE' ? true : false,
    })
    return acc
  }, [])
}
