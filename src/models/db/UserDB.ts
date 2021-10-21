import { DataTypes } from 'sequelize';
import { DB as db } from '@/config/DatabaseConfig';

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

export { UserDB };
