const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login", [
  body("email")
  .isEmail()
  .withMessage("Please enter valid email")
  .normalizeEmail(),
  body("password", "Password must be at least 6 characters long")
  .isLength({min: 6})
  .isAlphanumeric()
  .trim()
  ],
   authController.postLogin);

router.post(
  "/signup",
  [
  body("email")
    .isEmail()
    .withMessage("Please enter valid email")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("Email already exists");
        }
      });
    })
    .normalizeEmail(),
  body("password", "Password must be at least 6 characters long")
  .isLength({ min: 6 })
  .isAlphanumeric()
  .trim(),
  body("confirmPassword")
  .custom((value, { req }) => { 
    if (value !== req.body.password) {
      throw new Error("Passwords must match");
    }
    return true;
  })
  .trim()
],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
