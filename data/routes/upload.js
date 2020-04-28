const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

const multer = require("multer");

const upload = multer({ dest: "images" });
const uploadDocument = multer({ dest: "document" });

router.get("/", (req, res) => {
	res.status(200).send("You can post to /image");
});

router.post("/image", upload.single("photo"), (req, res) => {
	console.log("Requete image");
	console.log(req.file);
	res.status(200).json({
		message: "success!",
		file: req.file,
	});
});

router.post("/document", uploadDocument.single("file"), (req, res) => {
	console.log("Requete document");
	console.log(req.file);
	res.status(200).json({
		message: "success!",
		file: req.file,
	});
});
module.exports = router;
