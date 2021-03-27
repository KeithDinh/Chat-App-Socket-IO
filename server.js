const express = require("express");
const ejs = require("ejs");
const http = require("http");
const cookieParser = require("cookie-parser");
const validator = require("express-validator");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const flash = require("flash");
const passport = require("passport");

const container = require("./container");

container.resolve(function (userControllers) {
  const app = SetupExpress();

  function SetupExpress() {
    const app = express();

    const server = http.createServer(app);
    server.listen(3000, () => {
      console.log("App listening on port 3000");
    });
    ConfigureExpress(app);

    // Setup Router
    const router = require("express-promise-router")();
    userControllers.SetRouting(router);

    app.use(router);
  }

  function ConfigureExpress(app) {
    require("./passport/passport-local");

    app.use(express.static("public"));
    app.use(cookieParser());
    app.set("view engine", "ejs");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // app.use(validator());

    const clientP = mongoose
      .connect("mongodb://localhost/chat", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((m) => m.connection.getClient());

    app.use(
      session({
        secret: "This is secret",
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
          clientPromise: clientP,
        }),
      })
    );
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
  }
});
