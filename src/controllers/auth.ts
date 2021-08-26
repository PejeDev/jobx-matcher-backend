import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { TorreService as api } from '../services/torre';
import { UserDB as db } from '../models/db/user';
import { UserDTO } from '../models/DTO/user';

export class AuthController {
	public async register(req: Request, res: Response) {
		try {
			const { email, password, torre_user } = req.body;
			const user = await db.findAll({ where: { email } });

			if (user.length) {
				throw new Error('Email already exists!');
			}
			await api.getBioInfo(torre_user);
			const newUser = { email, password, torre_user };
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(newUser.password, salt);
			newUser.password = hash;
			const response = ((await db.create(newUser)) as unknown) as UserDTO;
			response.password = undefined;
			return res.status(200).json({ data: response });
		} catch (e) {
			console.error(e);
			return res.status(500).json({ error: `${e}` });
		}
	}

	public async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;
			const user = (await db.findAll({
				where: { email }
			})) as unknown as [UserDTO];
			if (!user.length) {
				throw new Error("The user account doesn't exists!");
			}
			const { torre_user } = user[0];
			const originalPassword = user[0].password;
			const isMatch = await bcrypt.compare(password, originalPassword);

			if (isMatch) {
				const { id } = user[0];
				const payload = { id, email, torre_user };

				const token = jwt.sign(payload, process.env.SECRET_KEY, {
					expiresIn: 36000
				});
				return res.json({
					success: true,
					token
				});
			}
			throw new Error('Incorrect password!');
		} catch (e) {
			console.error(e);
			return res.status(401).json({ error: `${e}` });
		}
	}
}
