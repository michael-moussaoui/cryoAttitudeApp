const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
	config.DB,
	config.USER,
	config.PASSWORD,
	{
		host: config.HOST,
		dialect: config.dialect,
		pool: {
			max: config.pool.max,
			min: config.pool.min,
			acquire: config.pool.acquire,
			idle: config.pool.idle,
		},
	}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.session = require("../models/session.model.js")(
	sequelize,
	Sequelize
);
db.objective = require("../models/objective.model.js")(
	sequelize,
	Sequelize
);
db.objectiveChoice = require("../models/objectiveChoice.model.js")(
	sequelize,
	Sequelize
);
db.category = require("../models/category.model.js")(
	sequelize,
	Sequelize
);
db.orientation = require("../models/orientation.model.js")(
	sequelize,
	Sequelize
);
db.sessionPicture = require("../models/sessionPicture.model.js")(
	sequelize,
	Sequelize
);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.user.hasMany(db.sessionPicture);
db.user.hasMany(db.session);
db.category.hasMany(db.session);
db.role.hasMany(db.user);

db.session.hasOne(db.sessionPicture, {
	foreignKey: "sessionId",
	onDelete: "CASCADE",
});
db.sessionPicture.belongsTo(db.user);
db.user.belongsTo(db.role);
db.objectiveChoice.belongsTo(db.objective, {
	foreignKey: "id_objective",
});
db.objectiveChoice.belongsTo(db.orientation, {
	foreignKey: "id_orientation",
});

module.exports = db;
