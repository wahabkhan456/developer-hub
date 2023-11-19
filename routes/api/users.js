const express = require("express");
const router = express.Router();
const Users = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretOrKey = require("../../config/keys").secretOrKey;
const passport = require("passport");
const validateRegister = require("../../validation/register");
const validateLogin = require("../../validation/login");

console.log('Users',Users);

router.get("/test", (req, res) => {
  return res.json({ msg: "Users is Working" });
});

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }

  Users.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.user="User already exists";
      return res.status(400).json(errors);
    }

    const avatar = gravatar.url(req.body.email, { s: "200", r: "pg", d: "mm" });

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;

        newUser
          .save()
          .then(user => {
            return res.json(user);
          })
          .catch(err => console.log(err));
      });
    });
  });
});

router.post("/login", (req, res) => {

  const {errors, isValid}=validateLogin(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }

  Users.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      errors.email="No User found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (!isMatch) {
        errors.password="Wrong Password";
        return res
          .status(400)
          .json(errors);
      }

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      };

      jwt.sign(payload, secretOrKey, { expiresIn: 154000 }, (err, token) => {
        if (token) {
          return res.json({
            success: true,
            token: `Bearer ${token}`
          });
        }
      });
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar
    });
  }
);

module.exports = router;
