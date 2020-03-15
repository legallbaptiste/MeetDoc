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
