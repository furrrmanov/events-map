const firebase = require('firebase-admin')
const schedule = require('node-schedule')
const moment = require('moment')
const firebaseDatabase = require('./firebase')
const emailNotification = require('./emailNotificationTransporter')

function NotificationsRegistry() {
  if (arguments.callee._singletonInstance) {
    return arguments.callee._singletonInstance
  }

  arguments.callee._singletonInstance = this
  store = []
  this.state = function () {
    const setState = (item) => {
      store.push(item)
    }

    const getState = () => {
      return store
    }

    const deleteStateItem = (item) => {
      store.forEach((event) => {
        if (event.id === item) {
          event.job.cancel()
        }
      })
      store = store.filter((notification) => notification.id !== item)
    }

    return {
      getState: getState,
      setState: setState,
      deleteStateItem: deleteStateItem,
    }
  }
}

const notificationsRegistry = new NotificationsRegistry()
const options = {
  priority: 'high',
  timeToLive: 60 * 60 * 24,
}

function createNotification(data) {
  const firebaseToken = data.userDivicesToken
  const notificationOption = data.notificationOption
  const eventId = data.eventId
  const tenMinutesInUnix = 600000
  const nameValidation = /^\S+|\S+$/g.test(data.event.name)
  const differenceInTime = data.event.date - moment().format('x')

  if (
    nameValidation &&
    data.event.date &&
    data.event.notifications &&
    differenceInTime > tenMinutesInUnix &&
    data.event.date > moment().format('x')
  ) {
    return createScheduledNotification(
      data.event,
      firebaseToken,
      eventId,
      notificationOption
    )
  } else if (
    nameValidation &&
    data.event.date &&
    data.event.notifications &&
    differenceInTime < tenMinutesInUnix &&
    data.event.date > moment().format('x')
  ) {
    return createInstantNotification(
      data.event,
      firebaseToken,
      differenceInTime,
      eventId,
      notificationOption
    )
  } else if (nameValidation) {
    return { status: 'ok', description: 'event created' }
  } else {
    return { status: 'error', description: 'uncorrected value' }
  }
}

function createScheduledNotification(
  event,
  firebaseToken,
  eventId,
  notificationOption
) {
  try {
    const notificationTitle = '10 minutes left before your event'
    const payload = {
      notification: {
        title: notificationTitle,
        body: event.name,
      },
    }
    const date = moment
      .unix(event.date / 1000)
      .subtract(10, 'minutes')
      .format()

    const scheduleJob = schedule.scheduleJob(date, function () {
      if (
        notificationOption.pushNotification &&
        notificationOption.emailNotification
      ) {
        createEmailNotification(firebaseToken, payload, options)
        createFirebaseMessagesNotification(event, notificationTitle)
      } else if (notificationOption.pushNotification) {
        createFirebaseMessagesNotification(event, notificationTitle)
      } else if (notificationOption.emailNotification) {
        createEmailNotification(firebaseToken, payload, options)
      }

      scheduleJob.cancel()
    })

    const setCompletedSheduleJob = schedule.scheduleJob(
      moment.unix(event.date / 1000).format(),
      function () {
        setCompletedEvent(eventId)
        setCompletedSheduleJob.cancel()
        notificationsRegistry.state().deleteStateItem(eventId)

        if (event.deleteExpiredEvent) {
          console.log('Delete event from firebase')
          firebaseDatabase.deleteItemFromFirebaseDb({
            collectionName: '/events',
            collectionRoot: 'events/',
            itemId: eventId,
          })
        }
      }
    )

    notificationsRegistry.state().setState({ id: eventId, job: scheduleJob })

    notificationsRegistry
      .state()
      .setState({ id: eventId, job: setCompletedSheduleJob })

    console.log('created event notification')

    return { status: 'ok', description: 'event and notification created' }
  } catch (error) {
    return { status: 'error', description: error }
  }
}

function createInstantNotification(
  event,
  firebaseToken,
  differenceInTime,
  eventId,
  notificationOption
) {
  try {
    const difference = moment.unix(differenceInTime / 1000).format('m')
    const notificationTitle =
      difference === '0'
        ? 'your event has come'
        : `${difference} minutes left before your event`
    const payload = {
      notification: {
        title: notificationTitle,
        body: event.name,
      },
    }

    const scheduleJob = schedule.scheduleJob(
      moment().add(30, 'seconds').format(),
      function () {
        console.log('push notification')

        if (
          notificationOption.pushNotification &&
          notificationOption.emailNotification
        ) {
          createEmailNotification(firebaseToken, payload, options)
          createFirebaseMessagesNotification(event, notificationTitle)
        } else if (notificationOption.pushNotification) {
          createFirebaseMessagesNotification(event, notificationTitle)
        } else if (notificationOption.emailNotification) {
          createEmailNotification(firebaseToken, payload, options)
        }

        scheduleJob.cancel()
      }
    )

    const setCompletedSheduleJob = schedule.scheduleJob(
      moment.unix(event.date / 1000).format(),
      function () {
        setCompletedEvent(eventId)
        setCompletedSheduleJob.cancel()
        notificationsRegistry.state().deleteStateItem(eventId)

        if (event.deleteExpiredEvent) {
          console.log('Delete event from firebase')
          firebaseDatabase.deleteItemFromFirebaseDb({
            collectionName: '/events',
            collectionRoot: 'events/',
            itemId: eventId,
          })
        }
      }
    )

    notificationsRegistry.state().setState({ id: eventId, job: scheduleJob })

    notificationsRegistry
      .state()
      .setState({ id: eventId, job: setCompletedSheduleJob })

    console.log('created event notification and push ')

    return { status: 'ok', description: 'event and notification created' }
  } catch (error) {
    return { status: 'error', description: error }
  }
}

function deleteNotification(event) {
  try {
    const eventId = event.iventId
    notificationsRegistry.state().deleteStateItem(eventId)

    return { status: 'ok', description: 'event deleted' }
  } catch (error) {
    return { status: 'error', description: error }
  }
}

function setCompletedEvent(eventId) {
  console.log('id completd event', eventId)
  firebaseDatabase.updateItemInEventsFirebaseDb(eventId)
}

const createEmailNotification = (firebaseToken, payload, options) => {
  firebase.messaging().sendToDevice(firebaseToken, payload, options)
}

const createFirebaseMessagesNotification = (event, notificationTitle) => {
  emailNotification.pushEmailNotification(
    notificationTitle,
    event.name,
    event.createdBy
  )
}

module.exports = {
  createNotification,
  deleteNotification,
}
