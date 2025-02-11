const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { prismaClientSelector } = require("../helpers/prismaClientSelector");

const prisma = prismaClientSelector();
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: jwtPayload.sub },
      });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
