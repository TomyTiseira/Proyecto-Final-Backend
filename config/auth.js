import { hashSync, compareSync } from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { dbDAO } from "./connectToDb";

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  const user = await dbDAO.getUser(email);
  done(null, user);
});

passport.use(
  "login",
  new LocalStrategy(async (email, password, done) => {
    const user = await dbDAO.getUser(email);

    const validUser = compareSync(password, user.password);

    if (validUser) {
      done(null, user);
      return;
    }

    done(null, false);
  })
);

passport.use(
  "signup",
  new LocalStrategy(async (email, password, done) => {
    const existendUser = await dbDAO.getUser(email);

    if (existendUser) {
      return done(new Error("User alredy exists"));
    }

    dbDAO.AddUser({ username, password: hashSync(password, 10) });
  })
);

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);
