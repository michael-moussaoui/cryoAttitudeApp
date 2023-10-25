module.exports = (sequelize, Sequelize) => {
	const Role = sequelize.define(
		"role",
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
	return Role;
};
