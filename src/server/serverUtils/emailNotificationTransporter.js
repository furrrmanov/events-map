const nodemailer = require('nodemailer')

const pushEmailNotification = (text, eventName, email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'eventsmapApp@gmail.com',
      pass: 'password123_',
    },
  })

  const mailOptions = {
    from: 'eventsmapApp@gmail.com',
    to: email,
    subject: 'Upcoming event notification',
    text: text,
    html: `
    <p><b>${text}</b></p>
    <p><b>${eventName}</b></p>
    <img src="cid:imgForEmail" width="500" height="350"/>`,

    amp: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.gstatic.com">
      </head>
      <body>
        <p><b>Hello</b></p>
      </body>
    </html>`,
    attachments: [
      {
        filename: 'cat',
        path:'public/cat.jpg',
        cid:
          'imgForEmail', 
      },
    ],
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('error', err)
    } else {
      console.log('Email Send!!!!')
    }
  })
}

module.exports = {
  pushEmailNotification,
}
