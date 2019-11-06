// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
//
// const connection = mysql.createPool({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'eisti001',
//   database : 'TP5'
// });
//
//
//
// // Starting our app.
// const app = express();
//
// // Creating a GET route that returns data from the 'users' table.
// app.get('/etudiant', function (req, res) {
//     // Connecting to the database.
//     connection.getConnection(function (err, connection) {
//
//     // Executing the MySQL query (select all data from the 'users' table).
//     connection.query('SELECT * FROM etudiant', function (error, results, fields) {
//       // If some error occurs, we throw an error.
//       if (error) throw error;
//
//       // Getting the 'response' from the database and sending it to our route. This is were the data is.
//       res.send(results)
//     });
//   });
// });
//
// // Starting our server.
// app.listen(3000, () => {
//  console.log('Go to http://localhost:8080/etudiant so you can see the data.');
// });
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'eisti0001',
    database : 'TP5'
});

db.connect();

app.get('/etudiant', function(req,res){
var sql = 'SELECT * FROM etudiant';
db.query(sql, (err, result)=>{
    if(err) throw err;
    console.log(result+"erreur");
    res.send(result);
});
});



app.listen(8000, ()=>{
    console.log('http://172.21.133.128:8000/etudiant')
});


// test(){
//     fetch('http://172.21.133.128:8000/etudiant')
//       .then(response => response.json())
//       .then(users => console.warn(users))
//   }


// app.post('/etudiant', function(req, res){
//
// 	console.log(req.body);
//     var data = {Nom:req.body.Nom, Prenom:req.body.Prenom,Id:req.body.Id,Age:req.body.Age};
//     var sql = 'INSERT INTO etudiant SET ?';
//     db.query(sql, data, (err, result)=>{
//     if(err) throw err;
//     console.log(result);
//     res.send({
//         status: 'Data sukses diinput!',
//         no: null,
// 		Nom: req.body.Nom,
// 		Prenom: req.body.Prenom,
//     Id:req.body.Id,
//     Age:req.body.Age
// 	});
// });
// });
