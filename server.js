/*
const express = require("express");
const cors = require("cors");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");

dotenv.config();

aws.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_KEY_SECRET,
  region: "us-east-1",
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "ci0137",
    key: function (req, file, cb) {
      cb(null, `ecci-pass/devices/${file.originalname}`);
    },
  }),
});

const userRoutes = require("./routes/users");
const devicesRoutes = require("./routes/devices");

const server = express();
server.use(express.json());
server.use(cors());

/*Se montan las rutas*/ /*
server.use("/users", userRoutes);
server.use("/devices", devicesRoutes);

server.post("/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.send({
    message: "Uploaded!",
    url: file.location,
    name: file.key,
    type: file.mimetype,
    size: file.size,
  });
});

server.listen(process.env.PORT || 7500);
console.log(
  `The server is running at http://localhost:${process.env.PORT || 7500}`
);

*/
