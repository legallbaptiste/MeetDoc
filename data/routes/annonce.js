const express = require("express");

const router = express.Router();

const mysql = require("mysql");

const connection = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "root",
	database: "projetGI2"
});

router.get("/", function(req, res) {
	// Connecting to the database.
	connection.getConnection(function(err, connection) {
		// Executing the MySQL query (select all data from the 'users' table).
		connection.query("SELECT * FROM Annonce", function(error, results, fields) {
			// If some error occurs, we throw an error.
			if (error) throw error;
			console.log(results);
			for (var i = 0; i < results.length; i++) {
				console.log(results[i].longitude);
				results[i].latlng = {
					latitude: results[i].latitude,
					longitude: results[i].longitude
				};
			}
			console.log(results);
			// Getting the 'response' from the database and sending it to our route. This is were the data is.
			res.send(results);
		});
	});
});

module.exports = router;
