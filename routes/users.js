const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../helpers/catchAsync");
const User = require("../models/user");
const users = require("../controllers/users");
//User register
//.route - to chain routes
router
  .route("/register")
  .get(users.renderRegister)
  .post(catchAsync(users.register));
//User login
router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );
//User logout
router.get("/logout", users.logout);
module.exports = router;
