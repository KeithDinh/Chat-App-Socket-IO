const passport = require("passport");

module.exports = function (_) {
  return {
    SetRouting: function (router) {
      router.get("/", this.indexPage);
      // router.route("/signup").get(this.getSignup).post(this.postSignup);
      router.get("/signup", this.getSignup);
      router.post("/signup", this.postSignup);
      router.get("/home", this.homePage);
    },
    indexPage: function (req, res) {
      return res.render("index");
    },
    getSignup: function (req, res) {
      return res.render("signup");
    },
    postSignup: passport.authenticate("local.signup", {
      successRedirect: "/home",
      failureRedirect: "/signup",
      failureFlash: true, // able to use flash message
    }),
    homePage: function (req, res) {
      return res.render("home");
    },
  };
};
