const nodemailer = require("nodemailer");

const getTransporter = function () {
    let transporter;
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  return transporter;
};

exports.senRecoveryCodeEmail = () => {
    let transporter = getTransporter();
    await transporter.sendMail({
      /*Definir correo electronico*/
      from: "",
      to: userEmail,
      subject: "Código de recuperación EcciPass",
      text: `Utilice este código para recuperar su contraseña: ${randomToken}`,
      html: `Utilice este código para recuperar su contraseña: <strong>${randomToken}</strong>`,
    });
};
