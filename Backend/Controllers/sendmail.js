var nodemailer = require('nodemailer');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'messenger.pms@gmail.com',
    pass: process.env.EMAIL_PASSWORD
  }
});

var mailOptions = {
  from: 'pms.messenger@gmail.com',
  to: '',
  subject: 'hello world',
  text: `let's see if it works`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});



module.exports = {

}