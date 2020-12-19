const firebase = require('firebase-admin')
const schedule = require('node-schedule')
const moment = require('moment')

function NotificationsRegistry() {
  state = []

  getState = () => {
    return state
  }

  setState = (item) => {
    state.push(item)
  }

  deleteStateItem = (item) => {
    state = state.filter((notification) => notification.id !== item)
  }

  return {
    getState: getState,
    setState: setState,
    deleteStateItem: deleteStateItem,
  }
}

const notificationsRegistry = new NotificationsRegistry()
const options = {
  priority: 'high',
  timeToLive: 60 * 60 * 24,
}

function createNotification(data) {
  const firebaseToken = data.userDivicesToken
  const eventId = data.eventId
  const tenMinutesInUnix = 600000
  const payload = {
    notification: {
      title: '10 minutes left before your event',
      body: data.event.name,
    },
  }
  const differenceInTime = data.event.date - moment().format('x')

  if (
    data.event.date &&
    data.event.notifications &&
    differenceInTime > tenMinutesInUnix &&
    data.event.date > moment().format('x')
  ) {
    const date = moment
      .unix(data.event.date / 1000)
      .subtract(10, 'minutes')
      .format()

    const scheduleJob = schedule.scheduleJob(date, function () {
      firebase.messaging().sendToDevice(firebaseToken, payload, options)
      scheduleJob.cancel()
      notificationsRegistry.deleteStateItem(eventId)
    })

    notificationsRegistry.setState({ id: eventId, notification: scheduleJob })

  } else if (
    data.event.date &&
    data.event.notifications &&
    differenceInTime < tenMinutesInUnix &&
    data.event.date > moment().format('x')
  ) {
    const payload = {
      notification: {
        title: `${moment
          .unix(differenceInTime / 1000)
          .format('m')} minutes left before your event`,
        body: data.event.name,
      },
    }

    const scheduleJob = schedule.scheduleJob(
      moment().add(10, 'seconds').format(),
      function () {
        firebase.messaging().sendToDevice(firebaseToken, payload, options)
        scheduleJob.cancel()
        notificationsRegistry.deleteStateItem(eventId)
      }
    )

    notificationsRegistry.setState({ id: eventId, notification: scheduleJob })

  }
}

function deleteNotification(event) {
  const eventId = event.iventId
  notificationsRegistry.deleteStateItem(eventId)

  return notificationsRegistry.getState()
}

module.exports = {
  createNotification,
  deleteNotification,
}
