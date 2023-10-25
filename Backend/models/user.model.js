const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const User = sequelize.define(
		"user",
		{
			ID: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			firstname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
					isStrongPassword(value) {
						if (
							!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
								value
							)
						) {
							throw new Error(
								"Le mot de passe doit contenir au moins 6 caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial (@$!%*?&)."
							);
						}
					},
				},
			},
			isAdmin: {
				type: DataTypes.BOOLEAN,
			},
		},

		{
			paranoid: true,
			freezeTableName: true,
		}
	);

	return User;
};
