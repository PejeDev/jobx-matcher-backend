import cors from 'cors';
import express, { Request, Response } from 'express';
import passport from 'passport';

import { AppConfig as app, DB as db } from '@/config';
import { AuthRoutes, JobRoutes, UserRoutes } from '@/routes';
import { ClientErrorHandler, ErrorLogger } from '@/middlewares';
import { AuthJwt } from '@/auth/Auth';

const server = express();

server.use(cors());
server.use(express.json());
server.use(passport.initialize());
server.use(ErrorLogger);
server.use(ClientErrorHandler);

server.get('/', (req: Request, res: Response) => {
	res.status(301).redirect(app.selfUrl);
});

server.get('/api/health', (req: Request, res: Response) => {
	res.send('OK');
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
