importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js')

firebase.initializeApp({
  apiKey: 'AIzaSyALCk5QBr0DYOjhcs3JpNcSaGcU6AgzQc0',
  authDomain: 'map-events-293ec.firebaseapp.com',
  databaseURL: 'https://map-events-293ec.firebaseio.com',
  projectId: 'map-events-293ec',
  storageBucket: 'map-events-293ec.appspot.com',
  messagingSenderId: '368625046311',
  appId: '1:368625046311:web:412b93094c7e857b8d0f02',
})

firebase.messaging()
