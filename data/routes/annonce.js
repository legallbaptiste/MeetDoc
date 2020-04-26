const express = require("express");

const router = express.Router();

const mysql = require("mysql");

const fetch = require("node-fetch");

const connection = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "root",
	database: "projetGI2Dev",
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

router.get("/getByRemplacant/:idRemplacant", function (req, res) {
	const idRemplacant = req.params.idRemplacant;

	// Connecting to the database.
	connection.getConnection(function (err, connection) {
		// Executing the MySQL query (select all data from the 'users' table).
		var sql =
			"SELECT a.id,a.titre,a.typeOffre,a.Retrocession,a.description,a.image,u.nom,u.prenom,u.email,u.numTel,adr.codePostale,adr.numVoie,adr.pays,adr.ville,adr.voie FROM AnnonceRemplacant ar, Annonce a, Recruteur re, Etablissement e,Adresse adr, User u  WHERE a.id = ar.idAnnonce AND re.id = a.idRecruteur AND u.id = re.id AND e.id = a.idEtablissement AND adr.id = e.idAdresse AND ar.idRemplacant = " +
			idRemplacant;
		console.log(sql);

		connection.query(sql, function (error, results, fields) {
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

//SELECT a.id,a.titre,a.typeOffre,a.Retrocession,a.description,a.image,r.id,u.nom,u.prenom,u.email,u.numTel,adr.codePostale,adr.numVoie,adr.pays,adr.ville,adr.voie FROM AnnonceRemplacant ar, Annonce a, Remplacant r, Recruteur re, Etablissement e,Adresse adr, User u  WHERE a.id = ar.idAnnonce AND r.id = ar.idRemplacant AND re.id = a.idRecruteur AND u.id = re.id AND e.id = a.idEtablissement AND adr.id = e.idAdresse

router.post("/postuler", function (req, res) {
	erreur = {
		message: "Pas d'erreur",
	};
	const data = {
		idAnnonce: req.body.idAnnonce,
		idRemplacant: req.body.idUser,
	};
	// Connecting to the database.
	connection.getConnection(function (err, connection) {
		// Executing the MySQL query (select all data from the 'users' table).
		var sql = "INSERT INTO  AnnonceRemplacant SET ?";
		connection.query(sql, data, function (error, results, fields) {
			// If some error occurs, we throw an error.
			if (error) {
				erreur.message = "Erreur dans la requete";
				erreur.code = error;
			}
			data.id = results.insertId;
			// Getting the 'response' from the database and sending it to our route. This is were the data is.
			res.status(200).json({
				message: "Ajout AnnonceRemplacant POST OK",
				data: data,
				error: erreur,
			});
		});
	});
});

module.exports = router;
