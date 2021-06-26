import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import UserDB from '../models/db/UserDB';
import { AppConfig } from '../config/index';

const jwtOpts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: AppConfig.secretKey
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
	try {
		const user = await UserDB.findAll({ where: { email: payload.email } });
		if (user.length) {
			return done(null, user);
		}
		return done(null, false);
	} catch (error) {
		console.error(error);
		return done(error, false);
	}
});

passport.use(jwtStrategy);

const AuthJwt = passport.authenticate('jwt', {
	session: false
});

export default AuthJwt;
