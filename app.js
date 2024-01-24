// app.js

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const { create } = require("express-handlebars");
const sequelize = require("./config/database");
const config = require("./config/database");
const routes = require("./routes");
const path = require("path");

// Import passport configuration
require("./config/passport");

const app = express();

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
const hbs = create({
  partialsDir: ["views/partials/"],
});
app.engine("handlebars", hbs.engine);

app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

// Configure routes
app.use("/", routes);

// Start the server
sequelize.sync().then(() => {
  const PORT = config.PORT || 3003;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
