const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

// determine which user will be saved in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// retrieve the id that is saved in the session to get the user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, // all user data will be passed to callback
    },
    (req, email, password, done) => {
      User.find({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, req.flash("error", "Email already exists"));
        }
        const newUser = new User(req.body).save((err) => {
          done(null, newUser);
        });
      });
    }
  )
);
