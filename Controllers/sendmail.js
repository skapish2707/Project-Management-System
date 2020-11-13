var nodemailer = require('nodemailer');
// require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'messenger.pms@gmail.com',
    pass: process.env.EMAIL_PASSWORD  
  }
});


async function sendmail(data,type){
  if(type === "registeration")
  {
    registerOptions = {
        from: 'pms.messenger@gmail.com',
        to:data.email,
        subject : "Registeration email for project management system ",
        html : `<h3>Hi ${data.name[0].toUpperCase() + data.name.substring(1) },</h3>
                <p>Your new account for managing your project was created on 
                https://project-management-system-ark.herokuapp.com/ 
                ${data.admin_name}<br/>
                Your login password is  ${data.password}
                <br/>
                <i>You can change this password once you login </i></p>
                <br/><br/>
                We welcome you to our community and would love to hear your comments about the application.<br/>
                <h3>Sincerely,<br/>
                project management system <br/>
                Development Team</h3>`
      }      
      try{
        await transporter.sendMail(registerOptions);
        console.log('send mail to '+data.email );
      }
      catch(e){
        console.log(e)
      }
  }
  else if (type == "forgetPassword"){
    passwordResetOption = {
        from: 'pms.messenger@gmail.com',
        to:data.email,
        subject : "password reset for project management system",
        html : `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.<br/><br/>
                Please click on the following link, or paste this into your browser to complete the process:<br/><br/>
                ${data.link}
                <br/>
                If you did not request this, please ignore this email and your password will remain unchanged.\n 
                the above link will automatically expire after 10 minutes </p>
                <h3>Sincerely,<br/>
                project management system <br/>
                Development Team</h3>`
      }
      try{
        await transporter.sendMail(passwordResetOption);
        console.log('send mail to '+data.email );
      }
      catch(e){
        console.log(e)
      }
  }
}

module.exports = sendmail