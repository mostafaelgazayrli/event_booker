const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = {
  loginPage: (req, res) => {
    res.render("pages/login");
  },

  login: passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),

  signupPage: (req, res) => {
    res.render("pages/signup");
  },

  signup: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      res.redirect("/login");
    } catch (error) {
      console.error(error);
      res.redirect("/signup");
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};
