'use strict';
require('dotenv').config();
const pjson = require.main.require('./../package.json');


global.__ = {
	NAME: pjson.name,
	PORT: parseInt(process.env.PORT),
	VERSION: pjson.version,
	DEBUG: process.env.DEBUG == "TRUE" ? true : false,

	PORT: parseInt(process.env.PORT),
	DB: {
		USERNAME: process.env.DB_USERNAME,
		PASSWORD: process.env.DB_PASSWORD,
		DATABASE: process.env.DB_NAME,
		HOST: process.env.DB_HOST,
		PORT: process.env.DB_PORT,
		DIALECT: process.env.DB_DIALECT,
	},
	JWT: {
		SECRET_KEY: process.env.SECRET_KEY,
	},
};
