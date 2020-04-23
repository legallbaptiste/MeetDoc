const express = require("express");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const router = express.Router();

const mysql = require("mysql");

const connection = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "root",
	database: "projetGI2Dev"
});

router.get("/all", (req, res) => {
	connection.getConnection(function(err, connection) {
		connection.query(
			"SELECT Etablissement.id AS id, secretariatBool,typePatientele,specialite,visiteDomicile,activite,descriptionLibre,idAdresse,voie,numVoie,ville,codePostale,pays FROM Etablissement,Adresse WHERE Etablissement.idAdresse = Adresse.id",
			(error, result) => {
				if (error) throw error;
				connection.release();
				res.status(200).json({
					etablissement: result
				});
			}
		);
	});
});

router.get("/:idEtablissement", (req, res) => {
	connection.getConnection(function(err, connection) {
		var query = connection.query(
			"SELECT Etablissement.id AS id, secretariatBool,typePatientele,specialite,visiteDomicile,activite,descriptionLibre,idAdresse,voie,numVoie,ville,codePostale,pays FROM Etablissement,Adresse WHERE Etablissement.idAdresse = Adresse.id AND Etablissement.id = ?",
			[req.params.idEtablissement],
			(error, result) => {
				if (error) throw error;
				res.status(200).json({
					etablissement: result
				});
			}
		);
	});
});

router.post("/", jsonParser, (req, res) => {
	connection.getConnection(function(err, connection) {
		//Ajout d'une adresse
		const adresseData = {
			voie: req.body.adresse.voie,
			numVoie: req.body.adresse.numVoie,
			ville: req.body.adresse.ville,
			codePostale: req.body.adresse.codePostale,
			pays: req.body.adresse.pays
		};
		var sqlAdresse = "INSERT INTO Adresse SET ?";
		connection.query(sqlAdresse, adresseData, (error, result) => {
			if (error) throw error;
			connection.release();
			const idAdresse = result.insertId;

			//Ajout d'un etablissement
			const etablissementData = {
				secretariatBool: req.body.etablissement.secretariatBool,
				typePatientele: req.body.etablissement.typePatientele,
				specialite: req.body.etablissement.specialite,
				visiteDomicile: req.body.etablissement.visiteDomicile,
				activite: req.body.etablissement.activite,
				descriptionLibre: req.body.etablissement.descriptionLibre,
				idAdresse: idAdresse
			};

			const sqlEtablissement = "INSERT INTO Etablissement SET ?";
			connection.query(sqlEtablissement, etablissementData, (err, result) => {
				if (err) throw err;
				connection.release();

				res.status(200).json({
					message: "Insert new etablissement",
					idEtablissement: result.insertId
				});
			});
		});
	});
});

module.exports = router;
