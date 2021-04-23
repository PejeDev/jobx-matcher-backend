'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const api = require('../service/torre')

const db = require.main.require('./models');
const User = db.User;

module.exports = {
	register: async (req, res) => {
		try {
			let { email, password, torre_user } = req.body;
			let user = await User.findAll({ where: { email } });

			if (user.length) {
				throw "Email already exists!";
			}
			await api.getBioInfo(torre_user);
			let newUser = { email, password, torre_user };
			let salt = await bcrypt.genSalt(10);
			let hash = await bcrypt.hash(newUser.password, salt);
			newUser.password = hash;
			let response = await User.create(newUser);
			response.password = undefined;
			return res.status(200).json({ data: response });
		} catch (e) {
			console.error(e);
			return res.status(500).json({ error: `${e}` });
		}
	},

	login: async (req, res) => {
		try {
			let { email, password } = req.body;
			let user = await User.findAll({ where: { email } });
			if (!user.length) {
				throw "The user account doesn't exists!";
			}
			let torre_user = user[0].dataValues.torre_user;
			let originalPassword = user[0].dataValues.password;
			let isMatch = await bcrypt.compare(password, originalPassword);

			if (isMatch) {
				const { id } = user[0].dataValues;
				const payload = { id, email, torre_user };

				let token = jwt.sign(payload, __.JWT.SECRET_KEY, { expiresIn: 36000 });
				return res.json({
					success: true,
					token: token
				});
			}
			throw "Incorrect password!";
		} catch (e) {
			console.error(e);
			return res.status(401).json({ error: `${e}` });
		}
	},
};
