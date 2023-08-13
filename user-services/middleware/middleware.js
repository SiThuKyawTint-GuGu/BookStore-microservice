const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const dotenv = require('dotenv');

dotenv.config();

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
        try {
            const user = { id: payload.userId, email: payload.email };
            return done(null, user);
        } catch (error) {
            const errorMessage = 'Authentication error: ' + error.message;
            return done(null, false, { message: errorMessage });
        }
    })
);

const authMiddleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
        if (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        req.user = user;
        next();
    })(req, res, next);
};

module.exports = authMiddleware;
