const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
	res.status(200).json({
		message: "Get request sur /annonce"
	});
});

router.post("/", (req, res, next) => {
	res.status(200).json({
		message: "post request sur /annonce"
	});
});

router.get("/:annonceId", (req, res, next) => {
	const id = req.params.annonceId;
	res.status(200).json({
		message: "coucou voici le params",
		params: id
	});
});
module.exports = router;
