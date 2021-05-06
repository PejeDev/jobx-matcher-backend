import { DataTypes } from 'sequelize';

import { db } from '../config/index';

const User = db.define('User', {
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

export default User;
