const db = require('../models');
const jwt = require('jsonwebtoken');
const api = require('../service/torre');

let controller = {

	me: async (req, res) => {
		try {
			let token = req.headers['authorization'].split(' ')[1];
			let user = jwt.decode(token);
			let torre_bio = await api.getBioInfo(user.torre_user);
			let profile = torre_bio.person;
			return res.status(200).json(profile);

		} catch (e) {
			return res.status(500).json({ error: `${e}` });
		}
	},

}
module.exports = controller;
