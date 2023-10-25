const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
	const Objective = sequelize.define("objective", {
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

	return Objective;
};
