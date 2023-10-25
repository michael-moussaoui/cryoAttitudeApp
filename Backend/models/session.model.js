const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Session = sequelize.define(
		"session",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			comment: {
				type: DataTypes.TEXT,
			},
			rate: {
				type: DataTypes.STRING,
			},
			isRating: {
				type: DataTypes.BOOLEAN,
			},
		},
		{
			paranoid: true,
		}
	);

	return Session;
};
