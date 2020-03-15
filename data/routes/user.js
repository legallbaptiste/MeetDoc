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

//Permet de gerer l'inscription
router.post("/", jsonParser, function(req, res) {
	// Connecting to the database.
	const erreurMessage = {
		erreur: "200",
		message: "Aucune erreur"
	};
	connection.getConnection(function(err, connection) {
		//Ajout d'une adresse
		const adresse = {
			voie: req.body.adresse.voie,
			numVoie: req.body.adresse.numVoie,
			ville: req.body.adresse.ville,
			codePostale: req.body.adresse.codePostale,
			pays: req.body.adresse.pays
		};
		var sqlAdresse = "INSERT INTO Adresse SET ?";
		connection.query(sqlAdresse, adresse, (error, result) => {
			if (error) throw error;

			//Ajout d'un user
			const idAdresse = result.insertId;
			const user = {
				nom: req.body.user.nom,
				prenom: req.body.user.prenom,
				email: req.body.user.email,
				motDePasse: req.body.user.motDePasse,
				numTel: req.body.user.numTel,
				idAdresse: idAdresse,
				cartePro: req.body.user.cartePro
			};

			//Verifie si l'email est déja utilisé :
			connection.query(
				"SELECT COUNT(*) FROM User WHERE ?",
				{ email: user.email },
				(err, result) => {
					if (err) throw err;
					if (result[0]["COUNT(*)"] != 0) {
						erreurMessage.message = "Email déja utilisé";
						erreurMessage.erreur = "500";
						res.status(500).json(erreurMessage);
					} else {
						var sqlUser = "INSERT INTO User SET ?";
						connection.query(sqlUser, user, (err, result) => {
							if (err) throw err;
							const idUser = result.insertId;

							//Insertion d'un recruteur
							if (req.body.recruteur) {
								const recruteur = {
									id: idUser,
									specialite: req.body.recruteur.specialite,
									descriptionLibre: req.body.recruteur.descriptionLibre,
									idEtablissement: req.body.recruteur.idEtablissement
								};

								var sqlRecruteur = "INSERT INTO Recruteur SET ?";
								connection.query(sqlRecruteur, recruteur, (err, result) => {
									if (err) {
										erreurMessage.message = "Etablissement non creer";
										erreurMessage.erreur = "404";
									}
									res.status(200).json({
										message: "User insert",
										idAdresse: idAdresse,
										idUser: idUser,
										erreurMessage
									});
								});
							} else if (req.body.remplacant) {
								//Insertion d'un remplacant
								const remplacant = {
									id: idUser,
									descriptionLibre: req.body.descriptionLibre,
									cv: req.body.cv,
									specialite: req.body.specialite
								};
								var sqlRemplacant = "INSERT INTO Remplacant SET ?";
								connection.query(sqlRemplacant, remplacant, (err, result) => {
									if (err) throw err;
									res.status(200).json({
										message: "User insert",
										idAdresse: idAdresse,
										idUser: idUser,
										erreurMessage
									});
								});
							} else {
								erreurMessage.message =
									"L'utilisateur doit être soit recruteur soit remplacant";
								erreurMessage.erreur = "404";
								res.status(200).json({
									message: "User insert",
									idAdresse: idAdresse,
									idUser: idUser,
									erreurMessage
								});
							}
						});
					}
				}
			);
		});
	});
});

router.get("/:email", function(req, res) {
	connection.getConnection(function(err, connection) {
		const email = req.params.email;

		var sqlAdresse = "SELECT id,motDePasse FROM User WHERE ?";

		connection.query(sqlAdresse, { email: email }, (err, result) => {
			if (err) throw err;
			res.status(200).json({
				message: "Get user work !",
				email: email,
				id: result[0]["id"],
				motDePasse: result[0]["motDePasse"]
			});
		});
	});
});

router.get("/info/:email", (req, res) => {
	connection.getConnection(function(err, connection) {
		const email = req.params.email;

		var sqlAdresse = "SELECT * FROM User WHERE ?";

		connection.query(sqlAdresse, { email: email }, (err, result) => {
			if (err) throw err;
			const user = result[0];
			delete user.motDePasse;

			res.status(200).json({
				message: "Get user work !",
				user: user
			});
		});
	});
});

connection.end((err) => {});
module.exports = router;
