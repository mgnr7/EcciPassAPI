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

    /*
    if (userType == "estudiante") {
      const rolID = 3;
    }
    */

    //const userPicture = userPayload.userPicture,

    //Se guarda toda la info en un arreglo
    const newUserInfo = {userId,username,password,name,apellido,id,email,userType};
    //const newUsersRoles = {userId,rolID};

    usersList.push(newUserInfo);
    //userRoles.push(newUsersRoles);
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

    //Expiracion codigo
    const nowDate = new Date();
    const expirationDate = new Date(
      nowDate.setMinutes(nowDate.getMinutes() + 15)
    ).toISOString();

    UserRecoveryCode.createRecoveryCode({
      userId: user.id,
      code: randomToken,
      expirationDate,
    });

    sendRecoveryCodeEmail(user.email, randomToken);
    res.status(200).send();
    //Si el codigo se crea con exito se envia

  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.resetPassword = (req, res) => {
  const userPayload = req.body;
  try {
      const user = findUser({
      where: { email: userPayload.email },
      include: ["recoveryCode"],
    });
    if (
      !user ||
      !user.recoveryCode ||
      user.recoveryCode.code !== userPayload.code
    ) {
      //Codigo invalido
      res.status(401).send("Datos no válidos");
      return;
    }
    
    //Expiracion de tiempo
    if (user.recoveryCode.expirationDate < new Date()) {
      res
        .status(401)
        .send(
          "El código de recuperación brindado ya expiró. Solicite un nuevo código de recuperación."
        );
      return;
    }

    user.password = bcrypt.hash(userPayload.password, saltRounds);
    user.save();

    //No se borra codigo, no hay DB

    res.status(204).send();
    //Se envia codigo

  } catch (error) {
    res.status(500).send("Error en el servidor al cambiar contraseña: " + error);
  }
};

// Devuelve los datos de un usuario comun especifico GET
exports.userProfile = (req, res) => {
  const userPayload = req.user;
  try {
    let users = [];
    for (let index = 0; index < usersList.length; index++) {
      if (usersList[index].userId === userPayload.userId) {
        users.push(usersList[index]);
      }
    }
    res.json(users);
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

//Dispositivo especifico POST
exports.profileDetails = (req, res) => {
  const userPayload = req.body;
  try {
    //const roles = userRoles.find((ur) => ur.userId === user.userId);
    let user = null;
    for (let index = 0; index < usersList.length; index++) {
      if (usersList[index].userId === userPayload.userId) {
        user = usersList[index];
        break;
      }
    }
    if (!user) {
      res.status(404).json({
        error: true,
        message: "Usuario no encontrado User id: " + devicePayload.userId,
      });
    } else {
      res.json(user);
    }
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