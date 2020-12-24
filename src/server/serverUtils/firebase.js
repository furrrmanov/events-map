const firebase = require('firebase/app')
require('firebase/database')

const firebaseConfig = {
  apiKey: 'AIzaSyALCk5QBr0DYOjhcs3JpNcSaGcU6AgzQc0',
  authDomain: 'map-events-293ec.firebaseapp.com',
  databaseURL: 'https://map-events-293ec.firebaseio.com',
  projectId: 'map-events-293ec',
  storageBucket: 'map-events-293ec.appspot.com',
  messagingSenderId: '368625046311',
  appId: '1:368625046311:web:412b93094c7e857b8d0f02',
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const database = firebase.database()

const getEventsListFirebaseDb = () => {
  return database
    .ref('/events')
    .once('value')
    .then((snapshot) => Object.entries(snapshot.val()))
}

const getUsersProfileListFirebaseDb = () => {
  return database
    .ref('/userProfiles')
    .once('value')
    .then((snapshot) => Object.entries(snapshot.val()))
}

const updateItemInEventsFirebaseDb = (id) => {
  database.ref(`/events/${id}`).update({ completed: true })
}

module.exports = {
  database,
  getEventsListFirebaseDb,
  getUsersProfileListFirebaseDb,
  updateItemInEventsFirebaseDb,
}
