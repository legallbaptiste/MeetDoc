const express = require("express");

const router = express.Router();

const mysql = require("mysql");

const connection = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "root",
	database: "projetGI2Dev"
});

router.post("/", function(req, res) {
	// Connecting to the database.

	connection.getConnection(function(err, connection) {
		const annonceData = {
			typeOffre: req.body.typeOffre,
			retrocession: req.body.retrocession,
			idEtablissement: req.body.idEtablissement,
			idRecruteur: req.body.idRecruteur,
			image: req.body.image
		};
		// Executing the MySQL query (select all data from the 'users' table).
		connection.query(
			"INSERT INTO Annonce SET ?",
			annonceData,
			(error, results) => {
				// If some error occurs, we throw an error.
				if (error) throw error;

				// Getting the 'response' from the database and sending it to our route. This is were the data is.
				res.status(200).json({
					message: "POST annonce work !",
					idAnnonce: results.insertId
				});
			}
		);
	});
});

router.get("/", function(req, res) {
	// Connecting to the database.
	connection.getConnection(function(err, connection) {
		// Executing the MySQL query (select all data from the 'users' table).
		var annonceSql =
			"SELECT * FROM Annonce a, Recruteur r WHERE a.idRecruteur = r.id";
		connection.query(annonceSql, function(error, results, fields) {
			// If some error occurs, we throw an error.
			if (error) throw error;

			// Getting the 'response' from the database and sending it to our route. This is were the data is.
			res.status(200).json({
				message: "Ok",
				res: results
			});
		});
	});
});

module.exports = router;
