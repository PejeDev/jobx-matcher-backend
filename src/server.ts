/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';

import { authRoutes, userRoutes, jobRoutes } from './routes/index';
import { db, app } from './config/index';
import { authJwt } from './auth/index';

const server = express();

server.use(cors());
server.use(express.json());

server.use(passport.initialize());

server.get('/', (req: Request, res: Response) => {
	res.status(301).redirect(app.selfUrl);
});

server.use('/api/v1/auth', authRoutes);

server.use('/api/v1/user', authJwt, userRoutes);

server.use('/api/v1/job', authJwt, jobRoutes);

db.sync()
	.then(() => {
		server.listen(app.port, () => {
			if (app.debug) console.log(app);
		});
	})
	.catch((error) => {
		console.error(error);
	});
