const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'projetGI'
});

// We're still in routes.js! Right below everything else.

// Starting our app.
const app = express();
var jsonParser = bodyParser.json()

// Creating a GET route that returns data from the 'users' table.
app.get('/markers', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM markers', function (error, results, fields) {
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


app.use(bodyParser.urlencoded({ extended: true }));

app.post('/markers', jsonParser, function(req, res){
    var data = {
      id:req.body.id,
      type:req.body.type,
      name:req.body.name,
      description:req.body.description,
      rating:req.body.rating,
      distance:req.body.distance,
      price:req.body.price,
      image: req.body.image,
      latitude:req.body.latitude,
      longitude:req.body.longitude
    };

    var sql = 'INSERT INTO markers SET ?';
    connection.query(sql, data, (err, result)=>{
    if(err) throw err;
    console.log(sql);
    console.log(result);

});
});

// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/users so you can see the data.');
});
