const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	const ObjectiveChoice = sequelize.define("objectivechoices", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
		},
	});

	return ObjectiveChoice;
};
