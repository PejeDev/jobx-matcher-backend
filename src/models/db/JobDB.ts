import { DataTypes } from 'sequelize';

import { DatabaseConfig as db } from '../../config/Index';

const JobDB = db.define('Job', {
	torreId: {
		type: DataTypes.STRING
	},
	organization: {
		type: DataTypes.STRING
	},
	picture: {
		type: DataTypes.STRING
	},
	skills: {
		type: DataTypes.TEXT
	},
	objective: {
		type: DataTypes.STRING
	},
	currency: {
		type: DataTypes.STRING
	},
	compensation_min: {
		type: DataTypes.DOUBLE
	},
	compensation_max: {
		type: DataTypes.DOUBLE
	},
	email: {
		type: DataTypes.STRING
	}
});

export default JobDB;