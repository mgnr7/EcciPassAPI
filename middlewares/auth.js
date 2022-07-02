const jwt = require("jsonwebtoken");
const { roles } = require("../utils/testData");
let { usersList } = require("../utils/testData");
let { userRoles } = require("../utils/testData");

exports.userIsAuthenticated = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      try {
        //Verificar que el token se genero con nuestra llave privada
        const decryptedToken = jwt.verify(token, process.env.JWT_KEY);
        const user = usersList.find((u) => u.userId === decryptedToken.userId);
        if (!user) {
          res.status(401).json({
            error: true,
            message: "Las credenciales brindadas no son válidas.",
          });
        } else {
          req.user = decryptedToken;
          next();
        }
      } catch (error) {
        res.status(401).json({
          error: true,
          message:
            "Las credenciales brindadas no son válidas o su sesión ha expirado.",
        });
      }
    } else {
      res.status(401).json({
        error: true,
        message: "El no usuario no está autenticado.",
      });
    }
  } else {
    res.status(401).json({
      error: true,
      message: "El no usuario no está autenticado.",
    });
  }
};

exports.userIsInRole = (authorizedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.roles;
    const userValidRole =
      authorizedRoles.find((ar) => ar === userRole) != undefined;
    if (!userValidRole) {
      res.status(401).json({
        error: true,
        message: "El usuario no tiene acceso.",
      });
    } else {
      next();
    }
  };
};
