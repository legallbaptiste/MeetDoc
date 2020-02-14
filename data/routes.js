const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'projetGI2'
});

// We're still in routes.js! Right below everything else.

// Starting our app.
const app = express();
var jsonParser = bodyParser.json()

// Creating a GET route that returns data from the 'users' table.
app.get('/Annonce', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM Annonce', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          console.log(results[i].longitude);
          results[i].latlng = {latitude:results[i].latitude,longitude:results[i].longitude};
        }
        console.log(results);
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});


app.get('/Profil', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT id,nom FROM Profil WHERE id = 1', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;
        console.log(results);
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results[0])
    });
  });
});


app.use(bodyParser.urlencoded({ extended: true }));

app.post('/Annonce', jsonParser, function (req, res) {
    // Connecting to the database.
    console.log(req.body.nom);
    var data = {
      titre : req.body.name,
      description: req.body.description,
      rating: req.body.rating,
      distance: req.body.distance,
      price:req.body.price,
      image : req.body.image,
      latitude : req.body.latitude,
      longitude : req.body.longitude,
      type : req.body.type,
    };

    var sql = 'INSERT INTO Annonce SET ?';
    connection.query(sql, data, (err, result)=>{
    if(err) throw err;
      console.log(sql);
      console.log(result);

});

});


app.post('/Profil', jsonParser, function(req, res){
    console.log(req.body.nom);
    var data = {
      nom : req.body.nom,
      prenom: req.body.nom,
      email: req.body.email,
      adresse: req.body.adresse,
      tel: req.body.tel,
      typeProfil:1,
      mdp : req.body.mdp,
    };

    var sql = 'INSERT INTO Profil SET ?';
    connection.query(sql, data, (err, result)=>{
    if(err) throw err;
    console.log(sql);
    console.log(result);

});
});


app.get('/login', jsonParser, function (req, res) {
    // Connecting to the database.
    console.log(req.body.username);
    console.log(req.body.password);
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM Profil', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          console.log(results[i].longitude);
          results[i].latlng = {latitude:results[i].latitude,longitude:results[i].longitude};
        }
        console.log(results);
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});


// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/users so you can see the data.');
});
