const nodemailer = require("nodemailer");

const SUBJECT = "Hải Sơn Company";

const sendMail = async (emailTo, html) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MY_EMAIL, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `${SUBJECT} <${process.env.MY_EMAIL}>`, // sender address
    to: emailTo, // list of receivers
    subject: SUBJECT, // Subject line
    html: html, // html body
  });

  return info;
};

module.exports = sendMail;
