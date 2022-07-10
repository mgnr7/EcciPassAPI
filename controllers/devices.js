let { usersList } = require("../utils/testData");
let { userRoles } = require("../utils/testData");
let { devicesList } = require("../utils/testData");

newDeviceId = () => {
  deviceId = devicesList[devicesList.length - 1].deviceId;
  deviceId += 1;
  return deviceId;
};

exports.createDevice = (req, res) => {
  try {
    const productPayload = req.body;
    const userPayload = req.user;

    const userId = userPayload.userId;
    const deviceId = newDeviceId();
    const brand = productPayload.brand;
    const model = productPayload.model;
    const serialNumber = productPayload.serialNumber;
    const deviceType = productPayload.deviceType;
    const imageUrl = productPayload.imageUrl;
    const state = productPayload.state;

    const newDevice = {
      userId,
      deviceId,
      brand,
      model,
      serialNumber,
      deviceType,
      imageUrl,
      state,
    };

    devicesList.push(newDevice);
    res.json(newDevice);
  } catch (error) {
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

exports.deviceDetails = (req, res) => {
  const deviceId = parseInt(req.params.deviceId);
  try {
    let device = null;
    for (let index = 0; index < devicesList.length; index++) {
      if (devicesList[index].deviceId === deviceId) {
        device = devicesList[index];
        break;
      }
    }
    if (!device) {
      res.status(404).json({
        error: true,
        message: "Device not found (device id: " + deviceId + ")",
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
  const userId = req.user.userId;
  if (deviceId <= 0) {
    res.status(404).json({
      error: true,
      message:
        "The current device Id is not valid (device id: " + deviceId + ")",
    });
  } else {
    try {
      let device = null;
      for (let index = 0; index < devicesList.length; index++) {
        if (devicesList[index].deviceId === deviceId) {
          if (devicesList[index].userId === userId) {
            device = devicesList.splice(index, 1);
            console.log("Se elimino el dispositivo id: ", deviceId);
          } else {
            res.status(403).json({
              error: true,
              message:
                "The user does not have access rights to the content (device id: " +
                deviceId +
                ")",
            });
            return;
          }
          break;
        }
      }
      if (device === null || device === undefined || device.length == 0) {
        res.status(404).json({
          error: true,
          message: "Device not found (device id: " + deviceId + ")",
        });
      } else {
        res.json(device);
      }
    } catch (error) {
      res.status(500).send("Server error: " + error);
    }
  }
};

exports.deviceUpdateStatus = (req, res) => {
  const deviceId = parseInt(req.params.deviceId);
  const devicePayload = req.body;
  if (deviceId <= 0) {
    res.status(404).json({
      error: true,
      message:
        "The current device Id is not valid (device id: " + deviceId + ")",
    });
  } else {
    try {
      let device = false;
      for (let index = 0; index < devicesList.length; index++) {
        if (devicesList[index].deviceId === deviceId) {
          devicesList[index].state = devicePayload.state;
          device = true;
          res.json(devicesList[index]);
          break;
        }
      }
      if (!device) {
        res.status(404).json({
          error: true,
          message: "Device not found (device id: " + deviceId + ")",
        });
      }
    } catch (error) {
      res.status(500).send("Server error: " + error);
    }
  }
};
