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

exports.createUser = (req, res) => {
  const userPayload = req.body;
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
  const userPayload = req.body;
};

exports.userHelp = (req, res) => {
  const userPayload = req.body;
};
