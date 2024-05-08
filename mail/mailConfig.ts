import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "bailey.sanford42@ethereal.email ",
      pass: "uVPuJwtsty79FSf92z",
    },
  });

export default transporter;
  

  