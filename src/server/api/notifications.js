const handleNotification = require('../serverUtils/notifications')

function handlePostNotification(req, res) {
  const response = handleNotification.createNotification(req.body)
 
  if (response.status === 'ok') {
    return res.json({
      status: 'ok',
    })
  } else {
    return res.json({
      status: 'error',
    })
  }
}

function handleDeleteNotification(req, res) {
  const response = handleNotification.deleteNotification(req.body)
  
  if (response.status === 'ok') {
    return res.json({
      status: 'ok',
    })
  } else {
    return res.json({
      status: 'error',
    })
  }
}

module.exports = {
  handlePostNotification,
  handleDeleteNotification,
}
