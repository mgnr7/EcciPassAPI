const jwt = require("jsonwebtoken");

exports.userIsAuthenticated = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      try {
        //Verificar que el token se genero con nuestra llave privada
        const decryptedToken = jwt.verify(token, process.env.JWT_KEY);
        /*const sqlQuery = `SELECT * FROM test.Users WHERE id = '${decryptedToken.userId}';`;
                const query = getQuery();
                const result = await query(sqlQuery);
                if (!result || !result[0]) {
                    res.status(401).json({
                        error: true,
                        message: "Las credenciales brindadas no son válidas."
                    });
                }
                else {
                    req.user = decryptedToken;
                    next();
                }*/
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
    const userRoles = ["Comun"];
    const userValidRole = userRoles.find((ur) => {
      return authorizedRoles.find((ar) => ar === ur) != undefined;
    });
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
