import { DataTypes } from 'sequelize';

import { DatabaseConfig as db } from '../../config/index';

const UserDB = db.define('User', {
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	torre_user: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

export default UserDB;
