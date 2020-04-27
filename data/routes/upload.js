const express = require("express");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const router = express.Router();
const multer = require('multer')

const mysql = require("mysql");

const connection = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "root",
	database: "projetGI2Dev",
});


const StorageImage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}.jpg`)
  },
})

const StorageDocument = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './document')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}.pdf`)
  },
})

const uploadImage = multer({ storage: StorageImage })
const uploadDocument = multer({ storage: StorageDocument })

router.get('/', (req, res) => {
  res.status(200).send('You can post to /image')
})

router.post('/image', uploadImage.single('photo'), (req, res) => {
  console.log('file', req.files)
  console.log('body', req.body)
  res.status(200).json({
    message: 'success!',
    chemin: req.files[0].path
  })
})

router.post('/document', uploadDocument.single('file'), (req, res) => {
  console.log('file', req.files)
  console.log('body', req.body)
  res.status(200).json({
    message: 'success!',
    chemin: req.files[0].path
  })
})
module.exports = router;
