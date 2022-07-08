const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getQuery } = require("../services/dbService");
const { sendRecoveryCodeEmail } = require("../services/mailService");
const { roles } = require("../utils/testData");
let { usersList } = require("../utils/testData");
let { userRoles } = require("../utils/testData");
const { restart } = require("nodemon");

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
  const userPayload = req.body;
};


exports.resetPassword = (req, res) => {
  const userPayload = req.body;
};

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
  const userPayload = req.body;
};

exports.profileDelete = (req, res) => {
  const userPayload = req.body;
};