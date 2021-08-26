import { Sequelize, Dialect } from 'sequelize';
import * as pjson from '../../package.json';

export const apiConfig = {
	torreApi: process.env.TORRE_API_URL,
	torreSearchApi: process.env.TORRE_SEARCH_API_URL
} as const;

export const appConfig = {
	name: pjson.name,
	port: parseInt(process.env.PORT, 10),
	version: pjson.version,
	selfUrl: process.env.SELF_URL,
	debug: process.env.DEBUG === 'TRUE'
} as const;

const db = {
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT, 10),
	dialect: process.env.DB_DIALECT as Dialect,
	logging: process.env.DEBUG === 'TRUE',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
} as const;

export const databaseConfig = new Sequelize(
	db.database,
	db.username,
	db.password,
	db
);
