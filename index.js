const express = require("express");
const app = express();
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const initializePassport = require("./passport-config");

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
initializePassport();

const isLoggedIn = (req, res, next) => {
  if (req.user) return next();
  return res.redirect("/login");
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.user) return next();
  return res.redirect("/");
};

app.get("/", isLoggedIn, (req, res) => {
  res.send(`<h1>Hello, ${req.user.displayName}!</h1>`);
});

app.get("/login", isNotLoggedIn, (req, res) => {
  return res.send(
    "<a href='/auth/login-google'>Google</a><br/><a href='/auth/login-facebook'>Facebook</a>"
  );
});

app.get(
  "/auth/login-google",
  isNotLoggedIn,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/login-facebook",
  isNotLoggedIn,
  passport.authenticate("facebook", { scope: ["public_profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

app.listen(3001, () => {
  console.log("Server at port 3001");
});
