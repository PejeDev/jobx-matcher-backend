import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { TorreService as api } from '../services/index';
import { IJWT } from '../models/DTO/jwt';

class UserController {
	public async me(req: Request, res: Response) {
		try {
			const token = req.headers.authorization.split(' ')[1];
			const user = jwt.decode(token) as IJWT;
			const torreBio = await api.getBioInfo(user.torre_user);
			const profile = torreBio.person;
			return res.status(200).json(profile);
		} catch (e) {
			return res.status(500).json({ error: `${e}` });
		}
	}
}

export default new UserController();
