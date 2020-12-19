const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const firebase = require('firebase-admin')

const serviceAccount = require('./serviceAccountKey.json')
const notificationFunctions = require('./api/notifications')
const autostart = require('./serverUtils/autostart')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const jsonParser = bodyParser.json()

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://map-events-293ec.firebaseio.com',
})

app.prepare().then(() => {
  const server = express()

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.post(
    '/api/notifications',
    jsonParser,
    notificationFunctions.handlePostNotification
  )

  autostart.createNotificationsForAllEvents()

  server.delete(
    '/api/notifications',
    jsonParser,
    notificationFunctions.handleDeleteNotification
  )



  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
  
})
