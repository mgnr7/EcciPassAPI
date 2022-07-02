let { usersList } = require("../utils/testData");
let { userRoles } = require("../utils/testData");
let { devicesList } = require("../utils/testData");

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
