/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { TorreService as api } from '../services/index';
import { JobDB as db } from '../models/db/index';
import { IJWTDTO } from '../models/DTO/JWTDTO';

class JobController {
	public async getOffers(req: Request, res: Response) {
		try {
			const token = req.headers.authorization.split(' ')[1];
			const offset = parseInt(req.params.offset, 10) || 0;
			const user = jwt.decode(token) as IJWTDTO;
			const jobs = await api.jobSearch(offset, user.torre_user);
			const offers = jobs.results;
			return res.status(200).json(offers);
		} catch (e) {
			return res.status(500).json({ error: `${e}` });
		}
	}

	public async getAllOffers(req: Request, res: Response) {
		try {
			const token = req.headers.authorization.split(' ')[1];
			const user = jwt.decode(token) as IJWTDTO;
			console.log(user);
			const { email } = user;
			const jobs = await db.findAll({ where: { email } });
			console.log(jobs);
			return res.status(200).json(jobs);
		} catch (e) {
			return res.status(500).json({ error: `${e}` });
		}
	}

	public async saveOffers(req: Request, res: Response) {
		try {
			const token = req.headers.authorization.split(' ')[1];
			const user = jwt.decode(token) as IJWTDTO;
			const { email } = user;
			const { id, compensation, skills, objective } = req.body;

			const tx = await db.findAll({ where: { email, torreId: id } });
			if (tx.length) {
				return res.status(200).json();
			}
			const skill = JSON.stringify(skills);

			const job = {
				email,
				torreId: id,
				objective,
				skills: skill,
				organization: req.body.organizations[0].name || '',
				picture: req.body.organizations[0].picture || '',
				currency: compensation.data.currency || 'USD',
				compensation_min: parseInt(compensation.data.minAmount, 10) || 0,
				compensation_max: parseInt(compensation.data.maxAmount, 10) || 0
			};

			await db.create(job);

			return res.status(200).json();
		} catch (e) {
			return res.status(500).json({ error: `${e}` });
		}
	}
}

export default new JobController();
