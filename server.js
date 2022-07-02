const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/users");
const devicesRoutes = require("./routes/devices");
const { connectDb } = require("./services/dbService");

const server = express();
server.use(express.json());
server.use(cors());
connectDb();

/*Se montan las rutas*/
server.use("/users", userRoutes);
//server.use("/devices", devicesRoutes);

server.listen(process.env.PORT || 7500);
console.log(
  `The server is running at http://localhost:${process.env.PORT || 7500}`
);
