const express = require("express");
const app = express();
const morgan = require("morgan");

const annonceRoutes = require("./routes/annonce");

app.use(morgan("dev"));

app.use("/Annonce", annonceRoutes);

app.use((req, res, next) => {
	const error = new Error("Mauvaise route");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
