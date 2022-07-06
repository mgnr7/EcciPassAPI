const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getQuery } = require("../services/dbService");
const { sendRecoveryCodeEmail } = require("../services/mailService");
const { roles } = require("../utils/testData");
let { usersList } = require("../utils/testData");
let { userRoles } = require("../utils/testData");

const saltRounds = 10;

exports.userWelcome = (req, res) => {
  res.send("Welcome");
};

//Creacion de usuario comunes unicamente
//Los perfiles de guardas deben ser creados con el adminisrador directamente
exports.createUser = (req, res) => {
  try {
    const userPayload = req.body;
    const newUser = User.create({
      username: userPayload.username,
      password: bcrypt.hash(userPayload.password, saltRounds),
      name: userPayload.name,
      appellido: userPayload.appellido,
      id: userPayload.id,
      email: userPayload.email,
      userType: userPayload.userType,
      userPicture: userPayload.userPicture,
    });
    res.json(newUser);
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
    const query = getQuery();
    const userPayload = req.body;
    const email = userPayload.email;
    //Se busca el usuario con el email de la solicitud
    const user = usersList.find((u) => u.email === email);
    let passwordCheck = false;
    if (user) {
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
      { expiresIn: "5m" }
    );
    user.token = token;
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.recoverPassword = (req, res) => {
  try {
    const userPayload = req.body;
    // El usuario debe relacionarse con un correo de recuperacion
    const user = userPayload.email;
    if (!user) {
      res.status(401).send("Las credenciales son incorrectas.");
      return;
    }
    const randomToken = Math.floor(
      Math.random() * (999999 - 100000 + 1) + 100000
    );
    //No se destruye el codigo porque no hay db
    const nowDate = new Date();
    const expirationDate = new Date(
      nowDate.setMinutes(nowDate.getMinutes() + 15)
    ).toISOString();

    createRecoveryCode({
      userId: user.id,
      code: randomToken,
      expirationDate,
    });
    
    sendRecoveryCodeEmail(user.email, randomToken);
    res.status(200).send();
    //Si el codigo se crea con exito y se envia (200)

  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.resetPassword = (req, res) => {
  const userPayload = req.body;
};

// Devuelve los datos de un usuario comun especifico
exports.userProfile = (req, res) => {
  const userPayload = req.body;
  try {
    //const roles = userRoles.find((ur) => ur.userId === user.userId);
    let profileData = [];
    for (let index = 0; index < usersList.length; index++) {
      if (usersList[index].userId === userPayload.userId) {
        profileData.push(usersList[index]);
      }
    }
    res.json(profileData);
  } catch (error) {
    res.status(500).send("No se pudo cargar los datos del perfil: " + error);
  }
};

exports.profileUpdate = (req, res) => {
  const userPayload = req.body;
};

exports.profileDelete = (req, res) => {
  const userPayload = req.body;
};
