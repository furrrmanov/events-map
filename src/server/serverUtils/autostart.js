const handleNotification = require('./notifications')
const firebaseDatabase = require('./firebase')
const dataMappers = require('./dataMappers')

async function createNotificationsForAllEvents() {
  const eventList = await firebaseDatabase.getEventsListFirebaseDb()
  const userProfileList = await firebaseDatabase.getUsersProfileListFirebaseDb()
  const data = dataMappers.transformDataList(eventList, userProfileList)

  data.forEach((event) => {
    handleNotification.createNotification(event)
  })
}

module.exports = {
  createNotificationsForAllEvents,
}
