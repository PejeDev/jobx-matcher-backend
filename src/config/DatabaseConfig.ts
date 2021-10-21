import { Sequelize, Dialect } from 'sequelize';

const config = {
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
};

const DB = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);

export { DB };
