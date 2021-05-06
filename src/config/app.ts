import * as pjson from '../../package.json';

const app = {
	name: pjson.name,
	port: parseInt(process.env.PORT, 10),
	version: pjson.version,
	debug: process.env.DEBUG === 'TRUE',
	secretKey: process.env.SECRET_KEY,
	torreApi: process.env.TORRE_API_URL,
	torreSearchApi: process.env.TORRE_SEARCH_API_URL
};

export default app;
