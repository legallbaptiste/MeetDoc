const express = require("express");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const router = express.Router();

const mysql = require("mysql");

const connection = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "eisti0001",
	database: "projetGI2Dev"
});

router.post("/", jsonParser, function(req, res) {
	// Connecting to the database.

	connection.getConnection(function(err, connection) {
		const user = {
			nom: req.body.nom,
			prenom: req.body.prenom,
			email: req.body.email,
			numTel: req.body.numTel
		};

		var sql = "INSERT INTO User SET ?";
		connection.query(sql, user, (err, result) => {
			if (err) throw err;
			res.status(200).json({
				message: "user insert work"
			});
		});
	});
});

router.get("/", function(req, res) {
	res.status(200).json({
		message: "Get user work !"
	});
});

module.exports = router;
