const express = require("express");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const shell = require("child_process").execSync;

const router = express.Router();

const multer = require("multer");

const mysql = require("mysql");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "projetGI2Dev",
});

const upload = multer({ dest: "images" });
const uploadDocument = multer({ dest: "document" });

router.get("/", (req, res) => {
  res.status(200).send("You can post to /image");
});

router.post("/image", upload.single("photo"), (req, res) => {
  console.log(req.file);
  res.status(200).json({
    message: "success!",
    file: req.file,
  });
});

router.post("/document", uploadDocument.single("file"), (req, res) => {
  console.log(req.file);
  res.status(200).json({
    message: "success!",
    file: req.file.path,
  });
});
module.exports = router;
