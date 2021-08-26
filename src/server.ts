import express, { Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';

import { AuthJwt } from './auth';
import { databaseConfig as db, appConfig as app } from './config';
import { clientErrorHandler } from './middlewares/clientErrorHandler';
import { errorLogger } from './middlewares/errorLogger';
import { AuthRoutes, UserRoutes, JobRoutes } from './routes/index';

const server = express();

server.use(cors());
server.use(express.json());
server.use(passport.initialize());
server.use(errorLogger);
server.use(clientErrorHandler);

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
