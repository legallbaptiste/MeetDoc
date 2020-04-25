const express = require("express");

const router = express.Router();

const mysql = require("mysql");

const fetch = require("node-fetch");

const connection = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "eisti0001",
	database: "projetGi2Dev",
});

router.post("/", function (req, res) {
	// Connecting to the database.

	connection.getConnection(function (err, connection) {
		const annonceData = {
			titre: req.body.titre,
			typeOffre: req.body.typeOffre,
			retrocession: req.body.retrocession,
			idEtablissement: req.body.idEtablissement,
			idRecruteur: req.body.idRecruteur,
			image: req.body.image,
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
					idAnnonce: results.insertId,
				});
			}
		);
	});
});

router.get("/", function (req, res) {
	// Connecting to the database.
	connection.getConnection(function (err, connection) {
		// Executing the MySQL query (select all data from the 'users' table).
		var annonceSql =
			"SELECT * FROM Etablissement e, Adresse ad, Annonce a WHERE a.idEtablissement = e.id AND e.idAdresse = ad.id";
		connection.query(annonceSql, function (error, results, fields) {
			// If some error occurs, we throw an error.
			if (error) throw error;

			// Mets l'addresse au format voulu pour l'API de openstreetmap
			Promise.all(
				results.map((elem) => {
					var ad = elem.numVoie + "+" + elem.voie + "+" + elem.ville;

					// Recupere les coordonnée pour afficher sur la map
					return fetch(
						"https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
							ad
					)
						.then((response) => response.json())
						.then((json) => {
							elem.latlng = {
								lat: json[0].lat,
								lng: json[0].lon,
							};
						});
				})
			).then(() => {
				res.status(200).json({
					message: "Annonce get OK",
					annonce: results,
				});
			});
		});
	});
});

router.get("/:idAnnonce", function (req, res) {
	const idAnnonce = req.params.idAnnonce;
	// Connecting to the database.
	connection.getConnection(function (err, connection) {
		// Executing the MySQL query (select all data from the 'users' table).
		var annonceSql =
			"SELECT * FROM Etablissement e, Adresse ad, Annonce a WHERE a.idEtablissement = e.id AND e.idAdresse = ad.id AND a.id = " +
			idAnnonce;

		connection.query(annonceSql, function (error, results, fields) {
			// If some error occurs, we throw an error.
			if (error) throw error;

			// Getting the 'response' from the database and sending it to our route. This is were the data is.
			res.status(200).json({
				message: "Annonce get OK",
				annonce: results,
			});
		});
	});
});

module.exports = router;
