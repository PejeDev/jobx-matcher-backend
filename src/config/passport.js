'use strict';
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require.main.require('./models');
const User = db.User;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = __.JWT.SECRET_KEY;

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, async (jwt_payload, done) => {
			try {
				let user = await User.findAll({ where: { email: jwt_payload.email } });
				if (user.length) {
					return done(null, user);
				}
				return done(null, false);

			} catch (error) {
				console.error(error);
			}
		})
	);
};
