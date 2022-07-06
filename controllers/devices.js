let { usersList } = require("../utils/testData");
let { userRoles } = require("../utils/testData");
let { devicesList } = require("../utils/testData");

exports.createDevice = (req, res) => {
  try {
    const productPayload = req.body;
    const newDevice = Device.create({
      brand: productPayload.brand,
      model: productPayload.model,
      serialNumber: productPayload.serialNumber,
      activeType: productPayload.activeType,
    });
    res.json(newDevice);
  } catch(error) {
    res.status(500).json({
      message: "Error al registrar activo",
      error,
    });
    return;
  }
};

exports.listDevices = (req, res) => {
  try {
    const result = devicesList;
    res.json(result);
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

//Retorna los dispositivos asociados a un usuario comun especifico
exports.userDevices = (req, res) => {
  const userPayload = req.user;
  try {
    let devices = [];
    for (let index = 0; index < devicesList.length; index++) {
      if (devicesList[index].userId === userPayload.userId) {
        devices.push(devicesList[index]);
      }
    }
    res.json(devices);
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.deviceDetails = (req, res) => {};
exports.deviceDelete = (req, res) => {};
exports.deviceUpdateStatus = (req, res) => {};
