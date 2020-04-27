const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const annonceRoutes = require("./routes/annonce");
const userRoutes = require("./routes/user");
const etablissementRoutes = require("./routes/etablissement");
const uploadRoutes = require("./routes/upload");

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/Annonce", annonceRoutes);
app.use("/User", userRoutes);
app.use("/Etablissement", etablissementRoutes);
app.use("/Upload", uploadRoutes);

app.use((req, res, next) => {
	const error = new Error("Mauvaise route");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

module.exports = app;
