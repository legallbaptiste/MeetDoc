const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'eisti0001',
  database : 'ProjetGIING2'
});

// We're still in routes.js! Right below everything else.

// Starting our app.
const app = express();
var jsonParser = bodyParser.json()

// Creating a GET route that returns data from the 'users' table.
app.get('/userdata', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM userdata', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if(err) throw err;
    console.log(results+"erreur");
    res.send(results);
    });
  });
});



app.use(bodyParser.urlencoded({ extended: true }));

app.post('/userdata', jsonParser, function(req, res){
    console.log(req.body.nom);
    var data = {
      nom : req.body.nom,
      email: req.body.email,
      mdp : req.body.password ,
    };

    var sql = 'INSERT INTO userdata SET ?';
    connection.query(sql, data, (err, result)=>{
    if(err) throw err;
    console.log(sql);
    console.log(result);

});
});



// exports.login =
 app.post('/userdata',jsonParser,function(req,res){  
  var email= req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM userdata WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    if(results.length >0){
      if(results[0].mdps == password){
        res.send({
          "code":200,
          "success":"login reussi"
            });
      }
      else{
        res.send({
          "code":204,
          "success":"Email and password pas bon"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Email existe pas"
          });
    }
  }
  });
});







// app.get('/login', jsonParser, function (req, res) {
//     // Connecting to the database.
//     console.log(req.body.username);
//     console.log(req.body.password);
//     connection.getConnection(function (err, connection) {

//     // Executing the MySQL query (select all data from the 'users' table).
//     connection.query('SELECT * FROM Annonce', function (error, results, fields) {
//       // If some error occurs, we throw an error.
//       if (error) throw error;
//         console.log(results);
//         for (var i = 0; i < results.length; i++) {
//           console.log(results[i].longitude);
//           results[i].latlng = {latitude:results[i].latitude,longitude:results[i].longitude};
//         }
//         console.log(results);
//       // Getting the 'response' from the database and sending it to our route. This is were the data is.
//       res.send(results)
//     });
//   });
// });


// Starting our server.
app.listen(8000, () => {
 console.log('Go to http://192.168.43.210:8000/userdata so you can see the data.');
});
