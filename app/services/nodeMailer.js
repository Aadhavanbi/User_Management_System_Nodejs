const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

function sendMail(Email, subject, text, callback) {
  const mail = {
    from: process.env.MAIL,
    to: Email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mail, function (error, info) {
    if (error) {
      // Pass the error to the callback
      callback(error, null);
      // console.log(error);
    } else {
      // Pass the success information to the callback
      callback(null, { message: "Email sent successfully", email: Email ,otp: text});
      // console.log('Email sent successfully');
    }
  });
}

module.exports = {
  sendMail,
};
