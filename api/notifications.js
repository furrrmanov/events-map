const handleNotification = require('../serverUtils/notifications')

function handlePostNotification(req, res) {
  handleNotification.createNotification(req.body)

  return res.json({
    ok: 'After job instantiation',
  })
}

function handleDeleteNotification(req, res) {
  handleNotification.deleteNotification(req.body)

  return res.json({
    ok: 'delete notification',
  })
}

module.exports = {
  handlePostNotification,
  handleDeleteNotification,
}
