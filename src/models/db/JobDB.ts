import { DataTypes } from 'sequelize';

import { DB as db } from '@/config/index';

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

export { JobDB };
