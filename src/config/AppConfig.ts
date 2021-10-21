import * as pjson from '../../package.json';

const AppConfig = {
	name: pjson.name,
	port: parseInt(process.env.PORT, 10),
	version: pjson.version,
	selfUrl: process.env.SELF_URL,
	debug: process.env.DEBUG === 'TRUE',
	secretKey: process.env.SECRET_KEY
};

export { AppConfig };
