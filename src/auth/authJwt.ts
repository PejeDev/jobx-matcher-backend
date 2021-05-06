import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';
import { app } from '../config/index';

const jwtOpts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: app.secretKey
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
	try {
		const user = await User.findAll({ where: { email: payload.email } });
		if (user.length) {
			return done(null, user);
		}
		return done(null, false);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error);
		return done(error, false);
	}
});

passport.use(jwtStrategy);

const authJwt = passport.authenticate('jwt', {
	session: false
});

export default authJwt;
