import { compareSync } from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { dbDAO } from "./connectToDb.js";
import User from "../model/users.js";
import { logger } from "./logs.js";

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  const user = await dbDAO.getUser(email);
  done(null, user);
});

passport.use(
  "login",
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        logger.error(
          `A ocurrido un error inesperado en el logeo. ${err.message}.`
        );
        return done(err);
      }
      if (!user) {
        logger.error(`A ocurrido un error en el logeo. Usuario no encontrado.`);
        return done(null, false, { message: "Unknown user " + email });
      }
      if (!compareSync(password, user.password)) {
        logger.error(`A ocurrido un error en el logeo. Datos inválidos.`);
        return done(null, false);
      }

      return done(null, user);
    });
  })
);
