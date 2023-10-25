module.exports = (sequelize, Sequelize) => {
	const Orientation = sequelize.define(
		"orientation",
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING,
			},
		},
		{
			paranoid: true,
		}
	);
	return Orientation;
};
