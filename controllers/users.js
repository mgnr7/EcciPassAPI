const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getQuery } = require("../services/dbService");
const { sendRecoveryCodeEmail } = require("../services/mailService");
//const { roles } = require("../utils/testData");
let { usersList } = require("../utils/testData");
let { userRoles } = require("../utils/testData");
let { recoveryCodes } = require("../utils/testData");
const { restart } = require("nodemon");
const nodemailer = require("nodemailer");

const saltRounds = 10;

exports.userWelcome = (req, res) => {
  res.send("Welcome");
};

//Crear un usuario
// Darle a ese usuario un rol especifico
exports.createUser = (req, res) => {
  try {
    const userPayload = req.body;

    //Info user
    const userId = userPayload.id;
    const username = userPayload.username;
    const password = bcrypt.hash(userPayload.password, saltRounds);
    const name = userPayload.name;
    const apellido = userPayload.appellido;
    const id = userPayload.id;
    const email = userPayload.email;
    const userType = userPayload.userType;
    const imageUrl = userPayload.imageUrl;
    const roleID = 3; //Usuario comun por default

    //Se guarda toda la info en un arreglo
    const newUserInfo = {
      userId,
      username,
      password,
      name,
      apellido,
      id,
      email,
      userType,
      imageUrl,
    };

    const newUserRoles = {
      userId,
      roleID,
    }

    usersList.push(newUserInfo);
    userRoles.push(newUserRoles);
    res.json(newUserInfo);

  } catch(error) {
    res.status(500).json({
      message: "Error al crear el usuario",
      error,
    });
    return;
  }
};

exports.loginUser = (req, res) => {
  try {
    const userPayload = req.body;
    const email = userPayload.email;
    //Se busca el usuario con el email de la solicitud
    const user = usersList.find((u) => u.email === email);
    let passwordCheck = false;
    if (user == null) {
      res.status(401).json({
        error: true,
        message: "Las credenciales son incorrectas.",
      });
      return;
    } else {
      passwordCheck = user.password === userPayload.password;
    }

    //const passwordCheck = await bcrypt.compare(
    //userPayload.password
    //resultado_de_la_query.password
    //);

    if (!user || !passwordCheck) {
      res.status(401).json({
        error: true,
        message: "Las credenciales son incorrectas.",
      });
      return;
    }

    //Sacar los roles del usuario
    const roles = userRoles.find((ur) => ur.userId === user.userId);
    const token = jwt.sign(
      { userId: user.userId, roles: roles.roleID },
      process.env.JWT_KEY,
      { expiresIn: "10m" }
    );
    user.token = token;
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.recoverPassword = async (req, res) => {
  try {
    const userPayload = req.body;
    const user = userPayload.email;
    if (!user) {
      res.status(401).send("Las credenciales son incorrectas.");
      return;
    }
    const randomToken = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    
    const mailTransporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        }
    });

    mailTransporter.sendMail(
      {
        from: "ci0137@psgfanclubcr.com",
        to: user,
        subject: "Código de recuperación EcciPass",
        text: `Utilice este código para recuperar su contraseña: ${randomToken}`,
        html: `Utilice este código para recuperar su contraseña: <strong>${randomToken}</strong>`,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );

    recoveryCodes.push({user,randomToken});
    res.status(200).send();

  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const userPayload = req.body;
    const email = userPayload.email;

    //Se busca el usuario con el email de la solicitud
    const user = recoveryCodes.find((u) => u.email === email);
    let passwordCheck = false;

    if (!user == null) {
      res.status(401).json({
        error: true,
        message: "Las credenciales son incorrectas.",
      });
      return;
    } else {
      passwordCheck = user.code === userPayload.code;
    }

    if (!user || !passwordCheck) {
      res.status(401).json({
        error: true,
        message: "Invalid user or code.",
      });
      return;
    }
  
    const newPassword = bcrypt.hash(userPayload.password, saltRounds);
    recoveryCodes.push({user,passwordCheck,newPassword});

    console.log("Password succesfully changed " + newPassword);
    res.status(204).send();

  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

//Usuario especifico
exports.userProfile = (req, res) => {
  const userPayload = req.user;
  try {
    let users = [];
    for (let index = 0; index < usersList.length; index++) {
      if (usersList[index].userId === userPayload.userId) {
        users.push(usersList[index]);
      }
    }
    res.json(users)
  } catch (error) { 
    restart.status(500).send("Server error: " + error);
  }
};

exports.profileDetails = (req, res) => {
  const userId = parseInt(req.params.userId);
  try {
    let users = null;
    for (let index = 0; index < usersList.length; index++) {
      if (usersList[index].userId === userId) {
        users = usersList[index];
        break;
      }
    }
    if (!users) {
      res.status(404).json({
        error: true,
        message: "User not found (user id: " + userId + ")",
      });
    } else {
      res.json(users);
    }
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.profileUpdate = (req, res) => {
  try {
    const userId = req.user.userId;
    const userPayload = req.body;

    for (let index = 0; index < usersList.length; index++) {
      if (usersList[index].userId === userId) {
        payloadProperties = Object.keys(userPayload);

        for (
          let keyIndex = 0;
          keyIndex < payloadProperties.length;
          keyIndex++
        ) {
          if (
            payloadProperties[keyIndex] === "password" ||
            payloadProperties[keyIndex] === "AccountType"
          ) {
            res.status(401).json({
              error: true,
              message: "Trying to change restricted properties",
            });
            return;
          }
          usersList[index][payloadProperties[keyIndex]] =
            userPayload[payloadProperties[keyIndex]];
        }
      }
      res.json(usersList[index]);
      break;
    }
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.profileDelete = (req, res) => {
  const userId = parseInt(req.params.userId);
  const userReqId = req.user.userId;
  if (userId <= 0) {
    res.status(404).json({
      error: true,
      message: "The current user Id is not valid (user id: " + userId + ")",
    });
  } else {
    try {
      let user = null;
      for (let index = 0; index < usersList.length; index++) {
        if (usersList[index].userId === userId) {
          if (usersList[index].userId === userReqId) {
            user = usersList.splice(index, 1);
          } else {
            res.status(403).json({
              error: true,
              message: "The user does not have the access rights needed",
            });
            return;
          }
          break;
        }
      }
      if (user === null || user === undefined || user.length == 0) {
        res.status(404).json({
          error: true,
          message: "User not found (user id: " + userId + ")",
        });
      } else {
        res.json(user);
      }
    } catch (error) {
      res.status(500).send("Server error: " + error);
    }
  }
};
