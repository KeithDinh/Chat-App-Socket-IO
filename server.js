const express = require("express");
const ejs = require("ejs");
const http = require("http");
const container = require("./container");

container.resolve(function (users) {
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
    users.SetRouting(router);

    app.use(router);
  }

  function ConfigureExpress(app) {
    app.use(express.static("public"));
    app.set("view engine", "ejs");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
});
