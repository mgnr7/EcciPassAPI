const express = require("express");
const cors = require("cors");

//const swaggerJsDoc = require("swagger-jsdoc");
const swaggerFile = require('./swagger.json');
const swaggerUI = require("swagger-ui-express");
const userRoutes = require("./routes/users");
const devicesRoutes = require("./routes/devices");
const { connectDb } = require("./services/dbService");
const { application } = require("express");

const server = express();
server.use(express.json());
server.use(cors());
connectDb();

/*Se montan las rutas*/
server.use("/users", userRoutes);
server.use("/devices", devicesRoutes);

//Documentacion de codigo en swagger

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EcciPass - API",
      version: "1.0.0",
    },
  },
  apis: [
    "./routes/*.js",
  ],
};

//const swaggerDocs = swaggerJsDoc(swaggerOptions);
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
//server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
//server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

server.listen(process.env.PORT || 7500);
console.log(
  `The server is running at http://localhost:${process.env.PORT || 7500}`
);
