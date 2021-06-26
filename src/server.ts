import express, { Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';

import { AuthJwt } from './auth/index';
import { DatabaseConfig as db, AppConfig as app } from './config/index';
import { ClientErrorHandler, ErrorLogger } from './middlewares/index';
import { AuthRoutes, UserRoutes, JobRoutes } from './routes/index';

const server = express();

server.use(cors());
server.use(express.json());
server.use(passport.initialize());
server.use(ErrorLogger);
server.use(ClientErrorHandler);

server.get('/', (req: Request, res: Response) => {
	res.status(301).redirect(app.selfUrl);
});

server.use('/api/v1/auth', AuthRoutes);

server.use('/api/v1/user', AuthJwt, UserRoutes);

server.use('/api/v1/job', AuthJwt, JobRoutes);

db.sync()
	.then(() => {
		server.listen(app.port, () => {
			if (app.debug) console.warn(app);
		});
	})
	.catch((error) => {
		console.error(error);
	});
