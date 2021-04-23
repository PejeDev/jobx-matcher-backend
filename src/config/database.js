'use strict';
const Sequelize = require('sequelize');

const config = {
	username: __.DB.USERNAME,
	password: __.DB.PASSWORD,
	database: __.DB.DATABASE,
	host: __.DB.HOST,
	port: __.DB.PORT,
	dialect: __.DB.DIALECT,
	logging: true,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};

const database = new Sequelize(
	config.database,
	config.username,
	config.password,
	config,
);

module.exports = database;
