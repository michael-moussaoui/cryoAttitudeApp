const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const SessionPicture = sequelize.define(
		"sessionpictures",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},

			imagePath: {
				type: DataTypes.STRING,
			},
		},
		{
			paranoid: true,
		}
	);

	return SessionPicture;
};
