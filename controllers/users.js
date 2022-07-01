const bcrypt = require("bcrypt");
const { getQuery } = require("../services/dbService");
const { sendRecoveryCodeEmail } = require("../services/mailService");

const saltRounds = 10;

exports.userWelcome = (req, res) => {
  res.send("Welcome");
};

exports.createUser = (req, res) => {
  const userPayload = req.body;
};

exports.loginUser = (req, res) => {
  const userPayload = req.body;
};

exports.recoverPassword = (req, res) => {
  const userPayload = req.body;
};

exports.resetPassword = (req, res) => {
  const userPayload = req.body;
};
