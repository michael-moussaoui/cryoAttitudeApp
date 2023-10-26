module.exports = (sequelize, Sequelize) => {
	const Category = sequelize.define(
		"categories",
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
	return Category;
};
