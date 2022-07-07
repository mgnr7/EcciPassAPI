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

exports.deviceDetails = (req, res) => {
  const devicePayload = req.body;
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

exports.deviceDelete = (req, res) => {
  const deviceId = parseInt(req.params.deviceId);
  if (deviceId <= 0) {
    res.status(404).json({
      error: true,
      message: "The current device Id is not valid (device id: " + deviceId + ")",
    });
  }
  else{
    try {
      let device = null;
      for (let index = 0; index < devicesList.length; index++) {
        if (devicesList[index].deviceId === deviceId) {
          console.log("Lo encontro, index: ", index);
          device = devicesList.splice(index, 1);
          break;
        }
      }
      if (device === null || device === undefined || device.length == 0) {
        console.log(device);
        res.status(404).json({
          error: true,
          message: "Device not found (device id: " + deviceId + ")",
        });
      } else {
        console.log(JSON.stringify(devicesList));
          res.json(device);
      }
    } catch (error) {
      res.status(500).send("Server error: " + error);
    }
  }
};

exports.deviceUpdateStatus = (req, res) => {};
exports.registerDevice = (req, res) => {};
