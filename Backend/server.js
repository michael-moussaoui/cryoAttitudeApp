if (typeof PhusionPassenger !== "undefined") {
	PhusionPassenger.configure({ autoInstall: false });
}

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
	origin: [
		process.env.LOCAL_CLIENT,
		process.env.REMOTE_CLIENT_APP,
		process.env.LOCAL_CLIENT_VITE_APP,
		process.env.REMOTE_SERVER_API,
		process.env.LOCAL_CLIENT_MOBILE,
		process.env.LOCAL_CLIENT_MOBILE2,
	],
	methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
	allowedHeaders:
		"Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization",
	credentials: true,
	exposedHeaders: ["Content-Range"],
	optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route for test
app.get("/", (req, res) => {
	res.json({ message: "Welcome to Attitude Cryo." });
});

const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const sessionRoutes = require("./routes/session.routes");
const objectiveRoutes = require("./routes/objective.routes");
const objectiveChoiceRoutes = require("./routes/objectiveChoice.routes");
const orientationRoutes = require("./routes/orientation.routes");

app.use(userRoutes);
app.use(categoryRoutes);
app.use(sessionRoutes);
app.use(objectiveRoutes);
app.use(objectiveChoiceRoutes);
app.use(orientationRoutes);

const db = require("./models");

db.sequelize.sync();

if (typeof PhusionPassenger !== "undefined") {
	app.listen("passenger");
} else {
	app.listen(process.env.SERVER_PORT, () => {
		console.log("server running to port 8087");
	});
}
