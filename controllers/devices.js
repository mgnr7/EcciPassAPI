let { usersList } = require("../utils/testData");
let { userRoles } = require("../utils/testData");
let { devicesList } = require("../utils/testData");

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

/*Este metodo tiene que retornar los datos de un dispositivo en especifico
En el body del request viene el id del dispositivo que hay que traer
*/
exports.deviceDetails = (req, res) => {
  const devicePayload = req.body;
  console.log("Entro al deviceDetails");
  console.log("Device payload ", devicePayload);
  try {
    let device = null;
    for (let index = 0; index < devicesList.length; index++) {
      if (devicesList[index].deviceId === devicePayload.deviceId) {
        device = devicesList[index];
        break;
      }
    }
    if (!device) {
      res.status(404).json({
        error: true,
        message: "Device not found (device id: " + devicePayload.deviceId + ")",
      });
    } else {
      res.json(device);
    }
  } catch (error) {
    res.status(500).send("Server error: " + error);
  }
};

exports.deviceDelete = (req, res) => {};
exports.deviceUpdateStatus = (req, res) => {};
exports.registerDevice = (req, res) => {};
